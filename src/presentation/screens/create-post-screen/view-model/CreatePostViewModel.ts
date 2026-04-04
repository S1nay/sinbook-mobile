import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { CreatePostFormData } from '@components/forms/create-post-form';
import { Identifiers } from '@core/di/identifiers';
import { IHttpError } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { CreatePostUseCase, PostUseCases } from '@domain/use-cases/post';
import {
  ProfileRouteNames,
  BottomTabStackParamList,
  BottomTabRouteNames,
} from '@navigation/configuration';
import { Toasts } from '@ui/toast';

import { ICreatePostViewModel } from './ICreatePostViewModel';

@injectable()
class CreatePostViewModel implements ICreatePostViewModel {
  private _isLoading = false;
  private _error = '';

  constructor(
    @inject(PostUseCases.$CreatePost) private createPostUseCase: CreatePostUseCase,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<BottomTabStackParamList>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string {
    return this._error;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set error(value: string) {
    this._error = value;
  }

  private reset(): void {
    this._isLoading = false;
    this._error = '';
  }

  createPost(data: CreatePostFormData, resetForm: PureFunction): void {
    this.isLoading = true;
    this.error = '';

    this.createPostUseCase
      .execute(data.content, data.images)
      .then(() => {
        Toast.show({ text1: 'Post created successfully!', type: Toasts.Success });

        this.reset();

        resetForm();

        this.navigationService.navigate(BottomTabRouteNames.Profile, {
          screen: ProfileRouteNames.ProfileDetails,
          params: { newPostIsCreated: Date.now() },
        });
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({
          text1: typeof message === 'string' ? message : 'Something went wrong',
          type: Toasts.Error,
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default CreatePostViewModel;
