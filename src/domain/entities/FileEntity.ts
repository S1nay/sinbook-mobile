import { IFile } from '@domain/models';

class FileEntity implements IFile {
  fileName: string;
  url: string;

  constructor(data: IFile) {
    this.fileName = data.fileName;
    this.url = data.url;
  }
}

export default FileEntity;
