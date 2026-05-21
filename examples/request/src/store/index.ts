import { createRequestInstance, setRequestInstance } from 'kazama';

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

// Since we only need the request functionality for this example,
// we export a mock store that only exposes `useRequest`.
import { createStore } from 'kazama';
export const store = createStore({});
export const { useRequest } = store;
