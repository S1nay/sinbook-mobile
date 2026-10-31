import { ServiceIdentifier } from 'inversify';

import { PostFormData } from '@components/forms/post-form';
import { IPost } from '@domain/models';

export interface IEditPostViewModel {
  isLoading: boolean;
  getPost: (postId: number) => IPost | undefined;
  updatePost: (postId: number, data: PostFormData) => Promise<void>;
}

export namespace IEditPostViewModel {
  export const $: ServiceIdentifier<IEditPostViewModel> = Symbol('IEditPostViewModel');
}
