declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare type PureFunction = () => void;
declare type ValuesOf<T> = T[keyof T];

declare interface Binding {
  identifier: ServiceIdentifier<unknown>;
  implementation: Newable<unknown>;
  scope?: 'singleton';
}

declare interface UseCase<T, K> {
  execute(...args: T[]): Promise<K>;
}
