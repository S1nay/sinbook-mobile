import { Fragment, PropsWithChildren } from 'react';

import { TabsContentProps } from './types';

const TopTabsContent = (props: PropsWithChildren<TabsContentProps>) => {
  const { children } = props;

  return <Fragment>{children}</Fragment>;
};

export default TopTabsContent;
