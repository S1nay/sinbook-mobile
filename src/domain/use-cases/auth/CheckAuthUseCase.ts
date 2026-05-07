import { inject, injectable } from 'inversify';

import { IAuthRepository } from '@domain/repositories';

@injectable()
class CheckAuthUseCase {
  constructor(@inject(IAuthRepository.$) private authRepository: IAuthRepository) {}

  execute(): boolean {
    return this.authRepository.isAuthenticated();
  }
}

export default CheckAuthUseCase;
