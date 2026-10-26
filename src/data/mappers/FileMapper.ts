import { IFileResponseDto } from '@data/dto/response';
import { FileEntity } from '@domain/entities';

const FileMapper = {
  toEntity(dto: IFileResponseDto): FileEntity {
    return new FileEntity({ fileName: dto.fileName, url: dto.url });
  },

  toEntities(dtos: Array<IFileResponseDto>): Array<FileEntity> {
    return dtos.map(FileMapper.toEntity);
  },
};

export default FileMapper;
