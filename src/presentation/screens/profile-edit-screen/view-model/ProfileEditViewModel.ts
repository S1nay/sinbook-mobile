import { AxiosError } from 'axios';
import { inject } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import { EditProfileFormData } from '@components/forms/edit-profile-form';
import { Identifiers } from '@core/di/identifiers';
import { IPatchUserRequestDto } from '@domain/dto';
import { IFile } from '@domain/models';
import { FileUseCases, UserUseCases } from '@domain/use-cases';
import { IHttpError } from '@infrastructure/http/entities';
import { INavigationService } from '@infrastructure/navigation/entities';
import { ProfileRouteNames, ProfileStackParamList } from '@navigation/configuration';
import { Toasts } from '@ui/toast';

import { IProfileEditViewModel } from './IProfileEditViewModel';

class ProfileEditViewModel implements IProfileEditViewModel {
  private _isLoading = false;
  private _error = '';

  constructor(
    @inject(FileUseCases.$PostAvatar) private postAvatarUseCase: UseCase<Asset, IFile>,
    @inject(UserUseCases.$PatchUser)
    private patchUserUseCase: UseCase<IPatchUserRequestDto, boolean>,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<ProfileStackParamList>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  set error(value: string) {
    this._error = value;
  }

  async uploadAvatar(image: Asset) {
    this.isLoading = true;

    return this.postAvatarUseCase
      .execute(image)
      .then()
      .catch(({ response }: AxiosError<IHttpError>) => {
        if (response) {
          const { data } = response;
          const errorMessage = data.message as string;

          Toast.show({
            text1: errorMessage,
            type: Toasts.Error,
          });
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async updateUser(data: EditProfileFormData, avatarUrl?: string) {
    this.isLoading = true;

    this.patchUserUseCase
      .execute({
        name: data.name,
        nickName: data.nickname,
        biography: data.biography,
        avatarPath: avatarUrl || data.avatarPath,
      })
      .then(() => {
        this.navigationService.reset({
          index: 0,
          routes: [{ name: ProfileRouteNames.ProfileDetails }],
        });

        Toast.show({
          text1: 'Данные были успешно обновлены',
          type: Toasts.Success,
          position: 'bottom',
          visibilityTime: 4000,
        });
      })
      .catch(({ response }: AxiosError<IHttpError>) => {
        if (response) {
          const { data } = response;
          const errorMessage = data.message as string;

          Toast.show({
            text1: errorMessage,
            type: Toasts.Error,
          });
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default ProfileEditViewModel;
