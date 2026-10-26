import { inject, injectable } from 'inversify';

import {
  IAuthRepository,
  ILikeRepository,
  IPostRepository,
  IUserRepository,
} from '@domain/repositories';

@injectable()
class LogoutUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(ILikeRepository.$) private likeRepository: ILikeRepository,
  ) {}

  async execute(): Promise<boolean> {
    this.authRepository.removeTokensFromStorage();
    this.userRepository.clearPersistedUser();
    this.userRepository.clearUserSession();
    this.postRepository.clearPosts();
    this.likeRepository.clearLikes();

    return true;
  }
}

export default LogoutUseCase;
