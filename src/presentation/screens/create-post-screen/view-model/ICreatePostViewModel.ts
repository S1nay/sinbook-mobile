import { ServiceIdentifier } from 'inversify';

import { CreatePostFormData } from '@components/forms/create-post-form';

export interface ICreatePostViewModel {
  isLoading: boolean;
  error: string;
  createPost: (data: CreatePostFormData, resetForm: PureFunction) => void;
}

export namespace ICreatePostViewModel {
  export const $: ServiceIdentifier<ICreatePostViewModel> = Symbol('ICreatePostViewModel');
}
