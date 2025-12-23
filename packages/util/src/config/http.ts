import axios, { AxiosError, type AxiosInstance } from 'axios';
import {
  API_CONFIG,
  DEV_PORT_MAP,
  EApiService,
  ETokenName,
  type CustomAxiosRequestConfig,
} from './config';

import type { IResponseObject } from '@/type';

export const createBaseURL = (service: EApiService = EApiService.MAIN) => {
  const path = API_CONFIG.NODE_ENV === 'development' ? API_CONFIG.API_PATH : API_CONFIG.API_PATH;

  if (API_CONFIG.NODE_ENV === 'development') {
    return new URL(path, `http://localhost:${DEV_PORT_MAP[service]}`).toString();
  }

  return new URL(path, API_CONFIG.BASE_API_URL).toString();
};

export class HttpProtocol {
  tokenKey: Record<ETokenName, string>;
  baseUrl: string;
  constructor() {
    this.tokenKey = {
      [ETokenName.ACCESS_TOKEN]: 'access_token',
      [ETokenName.REFRESH_TOKEN]: 'refresh_token',
    };
    this.baseUrl = createBaseURL();
  }
  getAccessToken(): string | null {
    return sessionStorage.getItem(ETokenName.ACCESS_TOKEN);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(ETokenName.REFRESH_TOKEN);
  }
  saveAccessToken(token: string): void {
    sessionStorage.setItem(ETokenName.ACCESS_TOKEN, token);
  }
  saveRefreshToken(token: string): void {
    localStorage.setItem(ETokenName.REFRESH_TOKEN, token);
  }

  getApi(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      maxRedirects: 5,
    });

    const refreshToken = this.getRefreshToken();

    if (refreshToken) {
      instance.defaults.withCredentials = true;
    }

    let isRefreshing = false;
    let refreshSubscribers: ((token: string) => void)[] = [];

    const subscribeTokenRefresh = (cb: (token: string) => void) => {
      refreshSubscribers.push(cb);
    };

    const onRefreshed = (token: string) => {
      refreshSubscribers.forEach((cb) => cb(token));
      refreshSubscribers = [];
    };

    if (typeof window !== 'undefined') {
      instance.interceptors.request.use(
        async (config) => {
          const accessToken = localStorage.getItem(ETokenName.ACCESS_TOKEN);

          if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }

          return config;
        },
        (error) => Promise.reject(error),
      );

      instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as CustomAxiosRequestConfig;

          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
              isRefreshing = true;
              try {
                const response = await axios.post(createBaseURL() + '/auth/refresh-token', null, {
                  withCredentials: true,
                });

                const { tokens } = (response.data as IResponseObject<any>).content;

                localStorage.setItem(ETokenName.ACCESS_TOKEN, tokens.ACCESS_TOKEN);

                onRefreshed(tokens.ACCESS_TOKEN);
                isRefreshing = false;
              } catch (err) {
                isRefreshing = false;

                return Promise.reject(err);
              }
            }

            return new Promise((resolve) => {
              subscribeTokenRefresh((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                }
                resolve(instance(originalRequest));
              });
            });
          }

          return Promise.reject(error);
        },
      );
    }

    return instance;
  }
}
