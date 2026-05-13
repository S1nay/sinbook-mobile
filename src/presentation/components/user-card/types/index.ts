import { IUser } from '@domain/models';

export interface UserCardProps extends IUser {
  onPressUserName: (userId: number) => void;
}
