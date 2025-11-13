import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IFileApi } from '@data/api';
import { IFile } from '@domain/models';
import { IFileRepository } from '@domain/repositories';

@injectable()
class FileRepository implements IFileRepository {
  constructor(@inject(IFileApi.$) private fileApi: IFileApi) {}

  async postAvatar(dto: FormData): Promise<IFile> {
    return this.fileApi
      .uploadAvatar(dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
  async postPostImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>> {
    return this.fileApi
      .uploadPostImages(dto, params)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
  async postDialogImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>> {
    return this.fileApi
      .uploadDialogImages(dto, params)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}

export default FileRepository;
