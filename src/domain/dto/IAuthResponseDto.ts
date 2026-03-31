import { AuthUser } from '../models/IUser';

export interface IAuthResponseDTO {
  user: AuthUser;
  access: string;
  refresh: string;
}
