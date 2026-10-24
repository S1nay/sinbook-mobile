import { inject, injectable } from 'inversify';

import { IPost } from '@domain/models';
import { ILikeRepository, IPostRepository, IUserRepository } from '@domain/repositories';

// Защита от бесконечного цикла, если бэкенд перестанет вести себя как toggle
const MAX_SYNC_REQUESTS = 10;

@injectable()
class LikePostUseCase {
  constructor(
    @inject(ILikeRepository.$) private likeRepository: ILikeRepository,
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(postId: number): Promise<void> {
    const [post] = this.postRepository.getPostsByIds([postId]);
    const userId = this.getCurrentUserId();

    if (!post || !userId) return;

    const isLikedNow = this.likeRepository.getPendingLike(postId) ?? post.likes.includes(userId);

    // UI реагирует на каждый тап сразу, независимо от сети.
    // Желаемое состояние хранится отдельно от стора постов, чтобы рефетч его не перетёр
    this.likeRepository.setPendingLike(postId, !isLikedNow);
    this.applyLikeLocally(postId, userId, !isLikedNow);

    // синхронизация уже идёт — она сама доведёт сервер до желаемого состояния
    if (this.likeRepository.isLikeSyncing(postId)) return;

    this.likeRepository.setLikeSyncing(postId, true);
    try {
      await this.syncWithServer(postId, userId, isLikedNow);
    } finally {
      // после logout стор уже очищен — не трогаем состояние новой сессии
      if (this.isSameSession(userId)) this.likeRepository.setLikeSyncing(postId, false);
    }
  }

  // Бэкенд — toggle: шлём запросы, пока подтверждённое состояние не совпадёт с желаемым.
  // Серию быстрых тапов с чётным числом нажатий это схлопывает без лишних запросов.
  private async syncWithServer(
    postId: number,
    userId: number,
    initialServerLiked: boolean,
  ): Promise<void> {
    let isServerLiked = initialServerLiked;
    let lastResponse: IPost | null = null;
    let requestsCount = 0;

    try {
      while (this.isSameSession(userId)) {
        const desired = this.likeRepository.getPendingLike(postId);
        if (desired === undefined || desired === isServerLiked) break;

        if (++requestsCount > MAX_SYNC_REQUESTS) throw new Error('Не удалось сохранить лайк');

        const response = await this.likeRepository.likePost({ postId });
        const wasServerLiked = isServerLiked;

        if (response?.id === postId) {
          lastResponse = response;
          isServerLiked = response.likes.includes(userId);
          // сервер не переключил лайк — дальше крутить цикл бессмысленно
          if (isServerLiked === wasServerLiked) throw new Error('Не удалось сохранить лайк');
        } else {
          isServerLiked = !isServerLiked;
        }
      }

      if (!this.isSameSession(userId)) return;

      // состояния совпали — подтягиваем актуальные данные сервера (чужие лайки и т.п.)
      // и поверх них — подтверждённое состояние своего лайка
      if (lastResponse) this.postRepository.upsertPost(lastResponse);
      this.applyLikeLocally(postId, userId, isServerLiked);
      this.likeRepository.removePendingLike(postId);
    } catch (error) {
      if (this.isSameSession(userId)) {
        // откатываем только свой лайк, не затирая чужие, пришедшие за это время
        this.applyLikeLocally(postId, userId, isServerLiked);
        this.likeRepository.removePendingLike(postId);
      }
      throw error;
    }
  }

  private applyLikeLocally(postId: number, userId: number, isLiked: boolean): void {
    const [post] = this.postRepository.getPostsByIds([postId]);
    if (!post || post.likes.includes(userId) === isLiked) return;

    this.postRepository.patchPost(postId, {
      likes: isLiked ? [...post.likes, userId] : post.likes.filter(id => id !== userId),
    });
  }

  private getCurrentUserId(): number | undefined {
    return (
      this.userRepository.getUserSession()?.id ?? this.userRepository.loadUserFromStorage()?.id
    );
  }

  private isSameSession(userId: number): boolean {
    return this.getCurrentUserId() === userId;
  }
}

export default LikePostUseCase;
