export interface IUser {
  id: number;
  nickName: string;
  biography: string;
  avatarPath: string | null;
  name: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
