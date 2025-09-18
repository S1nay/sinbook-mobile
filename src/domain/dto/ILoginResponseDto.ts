import { IUser } from '../models/IUser';

export interface ILoginResponseDTO {
  user: IUser;
  access: string;
  refresh: string;
}
