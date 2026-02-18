import { createStore, createAxiosInstance, setAxiosInstance } from '@react-store/core';
import * as models from './models';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// -- Mocking API responses for the example --
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost('/api/login').reply(200, { name: 'Zehan', role: 'admin' });

// We simulate a flaky background job endpoint
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

// 1. Setup global request interceptors
const axiosClient = createAxiosInstance()['default'];
setAxiosInstance({
  baseURL: 'http://localhost:3000',
  interceptors: {
    request: {
      onConfig: (config: any) => {
        config.headers = { ...config.headers, 'X-Example-Header': 'ReactStoreCore' };
        return config;
      }
    }
  }
}, axiosClient);

// 2. Create and export the store
const store = createStore(models, {
  name: 'ExampleStore',
  request: axiosClient, // Inject global client!
});

export default store;
export const { 
  useModel, 
  useModelDispatchers, 
  useModelState,
  useModelEffectsLoading,
  useRequest 
} = store;
