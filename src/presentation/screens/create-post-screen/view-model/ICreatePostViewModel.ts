import { ServiceIdentifier } from 'inversify';

import { CreatePostFormData } from '@components/forms/create-post-form';

export interface ICreatePostViewModel {
  isLoading: boolean;
  error: string;
  isSuccess: boolean;
  createPost: (data: CreatePostFormData) => void;
  reset: () => void;
}

export namespace ICreatePostViewModel {
  export const $: ServiceIdentifier<ICreatePostViewModel> = Symbol('ICreatePostViewModel');
}
