import { NavigationState, ParamListRoute } from '@react-navigation/native';
import type {
  NavigationAction,
  ParamListBase,
  PartialState,
  Route,
} from '@react-navigation/routers';

export interface INavigationService<RootStackParamList extends ParamListBase> {
  navigate<RouteName extends keyof RootStackParamList>(
    ...args: RouteName extends unknown
      ? undefined extends RootStackParamList[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]]
        : [screen: RouteName, params: RootStackParamList[RouteName]]
      : never
  ): void;

  reset(
    state: PartialState<NavigationState<RootStackParamList>> | NavigationState<RootStackParamList>,
  ): void;

  goBack(): void;

  getCurrentRoute(): ParamListRoute<RootStackParamList> | Route<string> | undefined;

  dispatch(action: NavigationAction): void;
}
