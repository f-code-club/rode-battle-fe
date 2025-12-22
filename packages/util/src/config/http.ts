import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

import type { IResponseObject } from "@/type";

const BASE_API_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const NODE_ENV: string = process.env.NEXT_PUBLIC_NODE_ENV ?? "development";

export enum ETokenName {
  ACCESS_TOKEN = "access-token",
  REFRESH_TOKEN = "refresh-token",
}

export enum EApiService {
  MAIN = "main",
}

const DEV_PORT_MAP: Record<EApiService, number> = {
  [EApiService.MAIN]: 4000,
};

export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export const createBaseURL = (service: EApiService = EApiService.MAIN) => {
  const path = NODE_ENV === "development" ? "/api/v1" : `/api/v1`;

  if (NODE_ENV === "development") {
    return new URL(
      path,
      `http://localhost:${DEV_PORT_MAP[service]}`,
    ).toString();
  }

  return new URL(path, BASE_API_URL).toString();
};

export const createUnAuthApi = (
  service: EApiService = EApiService.MAIN,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: createBaseURL(service),
    headers: {
      "Content-Type": "application/json",
    },
    maxRedirects: 5,
  });

  if (typeof window !== "undefined") {
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  return instance;
};

export const createAuthApi = (
  service: EApiService = EApiService.MAIN,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: createBaseURL(service),
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    maxRedirects: 5,
  });

  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  if (typeof window !== "undefined") {
    instance.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem(ETokenName.ACCESS_TOKEN);

        if (accessToken && config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
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
              const response = await axios.post(
                createBaseURL() + "/auth/refresh-token",
                null,
                {
                  withCredentials: true,
                },
              );

              const { tokens } = (response.data as IResponseObject<any>)
                .content;

              localStorage.setItem(
                ETokenName.ACCESS_TOKEN,
                tokens.ACCESS_TOKEN,
              );

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
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
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
};