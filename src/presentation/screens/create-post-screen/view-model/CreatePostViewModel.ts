import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { CreatePostFormData } from '@components/forms/create-post-form';
import { IHttpError } from '@core/interfaces/http';
import { IFileRepository, IPostRepository } from '@domain/repositories';

import { ICreatePostViewModel } from './ICreatePostViewModel';

@injectable()
class CreatePostViewModel implements ICreatePostViewModel {
  private _isLoading = false;
  private _error = '';
  private _isSuccess = false;

  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IFileRepository.$) private fileRepository: IFileRepository,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string {
    return this._error;
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set error(value: string) {
    this._error = value;
  }

  private set isSuccess(value: boolean) {
    this._isSuccess = value;
  }

  reset(): void {
    this._isLoading = false;
    this._error = '';
    this._isSuccess = false;
  }

  createPost(data: CreatePostFormData): void {
    this.isLoading = true;
    this.error = '';

    const uploadImages = async (): Promise<string[]> => {
      if (data.images.length === 0) return [];

      const formData = new FormData();

      data.images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      const files = await this.fileRepository.postPostImages(formData, {});

      return files.map(f => f.url);
    };

    uploadImages()
      .then(imageUrls =>
        this.postRepository.createPost({ content: data.content, images: imageUrls }),
      )
      .then(() => {
        this.isSuccess = true;
      })
      .catch(({ message }: IHttpError) => {
        this.error = typeof message === 'string' ? message : 'Something went wrong';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default CreatePostViewModel;
