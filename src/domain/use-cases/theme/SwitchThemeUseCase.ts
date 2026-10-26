import { inject, injectable } from 'inversify';

import { TTheme } from '@domain/models';
import { IThemeRepository } from '@domain/repositories';

@injectable()
class SwitchThemeUseCase {
  constructor(@inject(IThemeRepository.$) private themeRepository: IThemeRepository) {}

  execute(theme: TTheme): void {
    this.themeRepository.saveTheme(theme);
  }
}

export default SwitchThemeUseCase;
