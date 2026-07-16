import { createStore } from 'kazama-core';
import * as models from '../models';

export const store = createStore(models, {
  name: 'StoreExample',
  persist: { key: 'store_example_state', storage: 'localStorage' },
});

export const { useModel, useModelState, useModelDispatchers } = store;
