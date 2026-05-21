import { createStore, createRequestInstance, setRequestInstance } from '@zehankhan/kazama';
import * as models from '../models';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 0. Setup Mock APIs
const mock = new MockAdapter(axios, { delayResponse: 500 });

let attempt = 0;
mock.onGet('/api/background-job').reply(() => {
  attempt++;
  if (attempt % 3 !== 0) return [500, { error: 'Internal Server Error' }];
  return [200, { status: 'Job Completed!' }];
});

mock.onGet('/api/dashboard-stats').reply(200, {
  activeUsers: 1420,
  totalSales: 9450,
});
// -------------------------------------------

// 1. Initialize global request instance
const clientInstance = createRequestInstance()['default'];

// 2. Configure default instance (no need to explicitly pass it!)
setRequestInstance({
  baseURL: 'http://localhost:3000',
  interceptors: {
    request: {
      onConfig: (config: any) => {
        config.headers = { ...config.headers, 'X-Example-Header': 'ReactStoreCore' };
        return config;
      }
    }
  }
}, clientInstance);

// 3. Create Store instance
export const store = createStore(models, {
  name: 'ShowcaseStore',
  persist: {
    key: 'showcase_state',
    storage: 'localStorage',
    allowlist: ['auth'] // Only persist the auth model!
  },
});

export const {
  useModel,
  useModelState,
  useModelDispatchers,
  useModelEffectsLoading,
  useRequest
} = store;
