import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { IFile } from '@domain/models';

import { IFileApi } from './IFileApi';

@injectable()
class FileApi implements IFileApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}

  uploadAvatar(dto: FormData): Promise<IHttpResponse<IFile>> {
    return this.httpClient.post<IFile, FormData>('/file/upload/avatar', dto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  uploadPostImages(
    dto: FormData,
    params: Record<string, string>,
  ): Promise<IHttpResponse<Array<IFile>>> {
    return this.httpClient.post<Array<IFile>, FormData>('/file/upload/post', dto, { params });
  }
  uploadDialogImages(
    dto: FormData,
    params: Record<string, string>,
  ): Promise<IHttpResponse<Array<IFile>>> {
    return this.httpClient.post<Array<IFile>, FormData>('/file/upload/dialog', dto, { params });
  }
}

export default FileApi;
