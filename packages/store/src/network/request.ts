import type { AxiosRequestConfig, CancelTokenStatic, CancelStatic } from 'axios';
import axios from 'axios';

const DEFAULT_CONFIG = {};

const axiosInstances: Record<string, any> = {
  default: axios.create(DEFAULT_CONFIG),
};

export function createAxiosInstance(instanceName?: string) {
  if (instanceName) {
    if (axiosInstances[instanceName]) {
      return axiosInstances;
    }
    axiosInstances[instanceName] = axios.create(DEFAULT_CONFIG);
  }
  return axiosInstances;
}

export function setAxiosInstance(requestConfig: any, axiosInstance: any) {
  const { interceptors = {}, ...requestOptions } = requestConfig;
  Object.keys(requestOptions).forEach((key) => {
    axiosInstance.defaults[key] = requestOptions[key];
  });

  function isExist(handlers: any[], [fulfilled, rejected]: any[]) {
    return handlers.some((item) => item.fulfilled === fulfilled && item.rejected === rejected);
  }

  if (interceptors.request) {
    const [fulfilled, rejected] = [
      interceptors.request.onConfig || function (config: any) { return config; },
      interceptors.request.onError || function (error: any) { return Promise.reject(error); },
    ];
    if (isExist(axiosInstance.interceptors.request.handlers, [fulfilled, rejected])) return;
    axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  if (interceptors.response) {
    const [fulfilled, rejected] = [
      interceptors.response.onConfig || function (response: any) { return response; },
      interceptors.response.onError || function (error: any) { return Promise.reject(error); },
    ];
    if (isExist(axiosInstance.interceptors.response.handlers, [fulfilled, rejected])) return;
    axiosInstance.interceptors.response.use(fulfilled, rejected);
  }
}

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  instanceName?: string;
  withFullResponse?: boolean;
}

export interface RequestProps {
  get: <T = any, D = any>(url: string, config?: RequestConfig<D>) => Promise<T>;
  delete: <T = any, D = any>(url: string, config?: RequestConfig<D>) => Promise<T>;
  head: <T = any, D = any>(url: string, config?: RequestConfig<D>) => Promise<T>;
  options: <T = any, D = any>(url: string, config?: RequestConfig<D>) => Promise<T>;
  post: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
  put: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
  patch: <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
}

interface Request extends RequestProps {
  <T = any, D = any>(options: RequestConfig<D>): Promise<T>;
  <T = any, D = any>(url: string, config?: RequestConfig<D>): Promise<T>;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel: (value: any) => boolean;
}

const request = async function <T = any, D = any>(options: any): Promise<T> {
  try {
    let finalOptions = options;
    if (typeof options === 'string') {
      finalOptions = { url: options, ...arguments[1] };
    }
    const instanceName = finalOptions.instanceName ? finalOptions.instanceName : 'default';
    const axiosInstance = createAxiosInstance()[instanceName];
    if (typeof axiosInstance !== 'function') {
      throw new Error(`unknown ${instanceName} in request method`);
    }
    const response = await axiosInstance(finalOptions);
    if (axiosInstance.defaults.withFullResponse || finalOptions.withFullResponse) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
} as Request;

['delete', 'get', 'head', 'options'].forEach((method) => {
  (request as any)[method] = function <T = any, D = any>(url: string, config?: RequestConfig<D>) {
    return request<T, D>(Object.assign(config || {}, {
      method,
      url,
    }));
  };
});

['post', 'put', 'patch'].forEach((method) => {
  (request as any)[method] = function <T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return request<T, D>(Object.assign(config || {}, {
      method,
      url,
      data,
    }));
  };
});

request.CancelToken = axios.CancelToken;
request.isCancel = axios.isCancel;

export { request };
