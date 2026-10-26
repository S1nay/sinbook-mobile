// Сырая форма пользователя, как её отдаёт сервер. Развязана от доменных типов:
// при расхождении со схемой бэка меняем только DTO + маппер.
export interface IUserResponseDto {
  id: number;
  nickName: string;
  biography: string;
  avatarPath: string | null;
  name: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  mutualFollow?: boolean;
}
