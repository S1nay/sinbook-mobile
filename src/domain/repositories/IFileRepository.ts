import { ServiceIdentifier } from 'inversify';

import { IFile } from '@domain/models';

export interface IFileRepository {
  postAvatar(dto: FormData): Promise<IFile>;
  postPostImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>>;
  postDialogImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>>;
}

export namespace IFileRepository {
  export const $: ServiceIdentifier<IFileRepository> = Symbol('IFileRepository');
}
