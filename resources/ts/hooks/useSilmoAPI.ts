/**
 * SilmoAPIを使用するためのカスタムフック
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import {
  incrementApiLoadingCounter,
  decrementApiLoadingCounter,
} from "../store/slices/apiLoadingSlices";
import { selectApiLoadingCounter } from "../store/selectors/apiLoadingSelectors";

/**
 * useSilmoApiフックの戻り値の型
 */
interface UseSilmoApi {
  isLoading: boolean;
  loadingCounter: number;
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
}

/**
 * SilmoAPIを使用するためのカスタムフック
 * @returns API呼び出しとローディング状態を管理するオブジェクト
 */
export const useSilmoAPI = (): UseSilmoApi => {
  const dispatch = useDispatch();
  const loadingCounter = useSelector(selectApiLoadingCounter);

  /**
   * APIリクエストを実行する関数
   */
  const executeRequest = useCallback(
    async <T>(
      method: "get" | "post",
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      dispatch(incrementApiLoadingCounter());
      try {
        let response;
        if (method === "get") {
          response = await axios.get<T>(url, config);
        } else if (method === "post") {
          response = await axios.post<T>(url, data, config);
        }
        if (response && response.data) {
          return response.data;
        }
        throw new Error("No data received from API");
      } finally {
        dispatch(decrementApiLoadingCounter());
      }
    },
    [dispatch]
  );

  const get = useCallback(
    <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      return executeRequest<T>("get", url, undefined, config);
    },
    [executeRequest]
  );

  const post = useCallback(
    <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
      return executeRequest<T>("post", url, data, config);
    },
    [executeRequest]
  );

  return {
    isLoading: loadingCounter > 0,
    loadingCounter,
    get,
    post,
  };
};
