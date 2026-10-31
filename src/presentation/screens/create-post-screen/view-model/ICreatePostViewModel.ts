import { ServiceIdentifier } from 'inversify';

import { PostFormData } from '@components/forms/post-form';

export interface ICreatePostViewModel {
  isLoading: boolean;
  error: string;
  createPost: (data: PostFormData, resetForm: PureFunction) => void;
}

export namespace ICreatePostViewModel {
  export const $: ServiceIdentifier<ICreatePostViewModel> = Symbol('ICreatePostViewModel');
}
