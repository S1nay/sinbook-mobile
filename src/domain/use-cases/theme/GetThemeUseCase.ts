import { inject, injectable } from 'inversify';

import { TTheme } from '@domain/models';
import { IThemeRepository } from '@domain/repositories';

@injectable()
class GetThemeUseCase {
  constructor(@inject(IThemeRepository.$) private themeRepository: IThemeRepository) {}

  execute(): TTheme | null {
    return this.themeRepository.getSavedTheme();
  }
}

export default GetThemeUseCase;
