import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { PostFormData } from '@components/forms/post-form';
import { Identifiers } from '@core/di/identifiers';
import { IHttpError } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { IPost } from '@domain/models';
import { PostUseCases, UpdatePostUseCase } from '@domain/use-cases/post';
import { MaintenanceStackParamList } from '@navigation/configuration';
import { IPostsStore } from '@presentation/store';
import { Toasts } from '@ui/toast';

import { IEditPostViewModel } from './IEditPostViewModel';

@injectable()
class EditPostViewModel implements IEditPostViewModel {
  private _isLoading = false;

  constructor(
    @inject(PostUseCases.$UpdatePost) private updatePostUseCase: UpdatePostUseCase,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<MaintenanceStackParamList>,
    @inject(IPostsStore.$) private postsStore: IPostsStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  getPost(postId: number): IPost | undefined {
    return this.postsStore.get(postId);
  }

  async updatePost(postId: number, data: PostFormData): Promise<void> {
    const post = this.postsStore.get(postId);
    if (!post) return;

    // уже загруженные картинки передаём url-ом, новые — как Asset
    const images = data.images.map(image =>
      image.uri && post.images.includes(image.uri) ? image.uri : image,
    );

    this.isLoading = true;

    try {
      const updated = await this.updatePostUseCase.execute(postId, data.content, images);

      this.postsStore.upsert(updated);

      Toast.show({ text1: 'Post updated successfully!', type: Toasts.Success });

      this.navigationService.goBack();
    } catch (error) {
      Toast.show({ text1: (error as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isLoading = false;
    }
  }
}

export default EditPostViewModel;
