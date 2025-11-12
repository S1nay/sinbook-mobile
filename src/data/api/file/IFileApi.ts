import { ServiceIdentifier } from 'inversify';

import { IFile } from '@domain/models';
import { IHttpResponse } from '@infrastructure/http/entities';

export interface IFileApi {
  uploadAvatar(dto: FormData): Promise<IHttpResponse<IFile>>;
  uploadPostImages(
    dto: FormData,
    params: Record<string, string>,
  ): Promise<IHttpResponse<Array<IFile>>>;
  uploadDialogImages(
    dto: FormData,
    params: Record<string, string>,
  ): Promise<IHttpResponse<Array<IFile>>>;
}

export namespace IFileApi {
  export const $: ServiceIdentifier<IFileApi> = Symbol('IFileApi');
}
