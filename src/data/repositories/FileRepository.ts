import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse } from '@core/helpers';
import { IFileApi } from '@data/api';
import { IFile } from '@domain/models';
import { IFileRepository } from '@domain/repositories';

@injectable()
class FileRepository implements IFileRepository {
  constructor(@inject(IFileApi.$) private fileApi: IFileApi) {}

  async postAvatar(dto: FormData): Promise<IFile> {
    return this.fileApi.uploadAvatar(dto).then(getDataFromHttpResponse);
  }
  async postPostImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>> {
    return this.fileApi.uploadPostImages(dto, params).then(getDataFromHttpResponse);
  }
  async postDialogImages(dto: FormData, params: Record<string, string>): Promise<Array<IFile>> {
    return this.fileApi.uploadDialogImages(dto, params).then(getDataFromHttpResponse);
  }
}

export default FileRepository;
