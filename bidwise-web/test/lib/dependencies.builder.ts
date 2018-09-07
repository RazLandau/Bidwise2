import { Dependencies } from '../../src/providers';
import configureStore from '../../src/store/configureStore';

export const getDefaultDependencies = (): Dependencies => {
  return {
    store: configureStore({}),
  };
};
