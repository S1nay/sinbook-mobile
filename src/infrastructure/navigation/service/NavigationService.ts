import {
  NavigationState,
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent,
  ParamListRoute,
} from '@react-navigation/native';
import type {
  NavigationAction,
  ParamListBase,
  PartialState,
  Route,
} from '@react-navigation/routers';
import { injectable } from 'inversify';

import { INavigationService } from '@infrastructure/navigation/entities';

@injectable()
class NavigationService<RootStackParamList extends ParamListBase>
  implements INavigationService<RootStackParamList>
{
  private _navigationRef: NavigationContainerRefWithCurrent<RootStackParamList> =
    createNavigationContainerRef<RootStackParamList>();

  get navigationRef(): NavigationContainerRefWithCurrent<RootStackParamList> {
    return this._navigationRef;
  }

  navigate<RouteName extends keyof RootStackParamList>(
    ...args: RouteName extends unknown
      ? undefined extends RootStackParamList[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]]
        : [screen: RouteName, params: RootStackParamList[RouteName]]
      : never
  ): void {
    if (this.navigationRef.isReady()) {
      //@ts-expect-error no-error
      this.navigationRef.navigate(...args);
    }
  }

  dispatch(action: NavigationAction): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(action);
    }
  }

  getCurrentRoute(): ParamListRoute<RootStackParamList> | Route<string> | undefined {
    if (this.navigationRef.isReady()) {
      return this.navigationRef.getCurrentRoute();
    }
  }

  goBack(): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.goBack();
    }
  }

  reset(
    state: PartialState<NavigationState<RootStackParamList>> | NavigationState<RootStackParamList>,
  ): void {
    this.navigationRef.reset(state);
  }
}

export default NavigationService;
