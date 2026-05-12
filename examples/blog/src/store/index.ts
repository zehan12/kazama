import { createStore, createRequestInstance, setRequestInstance } from '@musubi/core';
import * as models from '../models';

const requestClient = createRequestInstance()['default'];
setRequestInstance({
  baseURL: 'https://jsonplaceholder.typicode.com',
}, requestClient);

export const store = createStore(models, {
  name: 'BlogStore',
  request: requestClient,
});

export const { useModel, useModelState, useModelDispatchers, useModelEffectsLoading, useRequest } = store;
