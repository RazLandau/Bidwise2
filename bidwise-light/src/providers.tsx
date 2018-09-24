import * as React from 'react';
import { Provider } from 'react-redux';

export interface Dependencies {
  store: any;
}

export const withProviders = (dependencies: Dependencies) => (
  wrappedComponent: React.ReactElement<any>,
) => <Provider store={dependencies.store}>{wrappedComponent}</Provider>;
