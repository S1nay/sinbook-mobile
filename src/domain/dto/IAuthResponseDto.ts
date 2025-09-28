import { IUser } from '../models/IUser';

export interface IAuthResponseDTO {
  user: IUser;
  access: string;
  refresh: string;
}
