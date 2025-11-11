import { ServiceIdentifier } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { EditProfileFormData } from '@components/forms/edit-profile-form';
import { IFile } from '@domain/models';

export interface IProfileEditViewModel {
  isLoading: boolean;
  error: string;

  updateUser(data: EditProfileFormData, avatarUrl?: string): void;
  uploadAvatar(image: Asset): Promise<IFile | void>;
}

export namespace IProfileEditViewModel {
  export const $: ServiceIdentifier<IProfileEditViewModel> = Symbol('IProfileEditViewModel');
}
