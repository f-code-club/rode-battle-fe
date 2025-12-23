import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type { HttpProtocol } from '@/config';
import type { IResponseObject } from '@/type';

export interface IApiService {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<IResponseObject<T>>>;
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<IResponseObject<T>>>;
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<IResponseObject<T>>>;
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<IResponseObject<T>>>;
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<IResponseObject<T>>>;
}

export class BaseApiService implements IApiService {
  protected apiService: HttpProtocol;

  constructor(apiService: HttpProtocol) {
    this.apiService = apiService;
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const api = this.apiService.getApi();

    return await api.get<IResponseObject<T>>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const api = this.apiService.getApi();

    return await api.post<IResponseObject<T>>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const api = this.apiService.getApi();

    return await api.put<IResponseObject<T>>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const api = this.apiService.getApi();

    return await api.patch<IResponseObject<T>>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const api = this.apiService.getApi();

    return await api.delete<IResponseObject<T>>(url, config);
  }
}

export const useBaseQuery = <T>(
  queryKey: (string | number)[],
  url: string,
  httpConfig: HttpProtocol,
  options?: UseQueryOptions<AxiosResponse<IResponseObject<T>>, Error, IResponseObject<T>>,
  config?: AxiosRequestConfig,
) => {
  const apiService = new BaseApiService(httpConfig);

  return useQuery<AxiosResponse<IResponseObject<T>>, Error, IResponseObject<T>>({
    queryKey,
    queryFn: () => apiService.get<T>(url, config),
    select: (response) => response.data,
    ...options,
  });
};

export const useBaseMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<IResponseObject<TData>>>,
  options?: any,
) => {
  return useMutation<AxiosResponse<IResponseObject<TData>>, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (data?.data?.success) {
      }

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

export const useBaseInfiniteQuery = <T>(
  queryKey: (string | number)[],
  url: string,
  httpConfig: HttpProtocol,
  options?: any,
  config?: AxiosRequestConfig,
) => {
  const apiService = new BaseApiService(httpConfig);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const params = { ...config?.params, page: pageParam };

      return apiService.get<T>(`${url}?page=${pageParam}`, { ...config, params });
    },
    getNextPageParam: (lastPage: AxiosResponse<IResponseObject<T>>) => {
      const { pagination } = lastPage.data;

      if (pagination && lastPage.data.success) {
        return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
      }

      return undefined;
    },
    ...options,
  });
};
