import { createRequestInstance, setRequestInstance } from '@zehankhan/kazama';

createRequestInstance();

setRequestInstance({
  baseURL: 'https://jsonplaceholder.typicode.com',
  interceptors: {
    request: {
      onConfig: (config: any) => {
        config.headers = { ...config.headers, 'X-Example-Header': 'RequestExample' };
        return config;
      }
    }
  }
});

import { createStore, useLoader, useAction } from '@zehankhan/kazama';
export const store = createStore({});
export const { useRequest } = store;
export { useLoader, useAction };