import { createContext, useContext } from 'react';

import { SegmentedControlContextValue } from './SegmentedControlContextValue';

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export const useSegmentedControl = () => {
  const context = useContext(SegmentedControlContext);

  if (!context) {
    throw new Error('SegmentedControl compound components must be used within SegmentedControl');
  }

  return context;
};
