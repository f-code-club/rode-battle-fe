import type { AxiosRequestConfig } from 'axios';

export enum ETokenName {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

export enum EApiService {
  MAIN = 'main',
}

export const DEV_PORT_MAP: Record<EApiService, number> = {
  [EApiService.MAIN]: 4000,
};

export const API_CONFIG = {
  BASE_API_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000',
  NODE_ENV: import.meta.env.MODE ?? 'development',
  API_PATH: '/api/v1',
} as const;

export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};
