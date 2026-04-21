import { createStore } from '@react-store/core';
import * as models from '../models';

export const store = createStore(models, {
  name: 'UrlStateExample',
});

export const { useModel } = store;