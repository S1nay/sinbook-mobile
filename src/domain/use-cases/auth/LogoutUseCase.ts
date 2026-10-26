import { inject, injectable } from 'inversify';

import { IAuthRepository, IUserRepository } from '@domain/repositories';

@injectable()
class LogoutUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  // Чистит только persistent-данные (токены, сохранённый юзер). Очистку реактивных
  // сторов сессии и навигацию делает presentation (SettingsViewModel.logout / App.clearSession).
  async execute(): Promise<boolean> {
    this.authRepository.removeTokensFromStorage();
    this.userRepository.clearPersistedUser();

    return true;
  }
}

export default LogoutUseCase;
