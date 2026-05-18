import { createStore } from 'musubi';
import * as models from '../models';

export const store = createStore(models, {
  name: 'UrlStateExample',
});

export const { useModel } = store;