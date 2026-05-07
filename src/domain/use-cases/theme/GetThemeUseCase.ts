import { inject, injectable } from 'inversify';

import { TTheme } from '@domain/models';
import { IThemeRepository } from '@domain/repositories';

@injectable()
class GetThemeUseCase {
  constructor(@inject(IThemeRepository.$) private themeRepository: IThemeRepository) {}

  execute(): TTheme | null {
    const active = this.themeRepository.getActiveTheme();
    if (active) return active;

    const saved = this.themeRepository.getSavedTheme();
    if (saved) {
      this.themeRepository.setActiveTheme(saved);
    }
    return saved;
  }
}

export default GetThemeUseCase;
