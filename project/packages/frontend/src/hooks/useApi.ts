import { useCallback, useEffect, useRef, useState } from "react";

import type {
  CustomError,
  Data,
  UseApiCall,
  UseApiOptions,
  UseApiResult,
} from "@/models/useApiCall";

import { loadingSignal } from "@/services/loadingSignal";

export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>
): UseApiResult<T, P> => {
  const [autoFetched, setAutoFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  const currentControllerRef = useRef<AbortController | null>(null);

  const fetch = useCallback(
    (param: P) => {
      if (currentControllerRef.current) {
        currentControllerRef.current.abort();
      }

      const { call, controller } = apiCall(param);

      currentControllerRef.current = controller;

      setLoading(true);

      loadingSignal.show();

      call
        .then((response) => {
          setData(response);
          setError(null);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err);
          }
        })
        .finally(() => {
          setLoading(false);
          loadingSignal.hide();
        });

      // return () => controller.abort();
    },
    [apiCall]
  );

  useEffect(() => {
    if (options?.autoFetch && !autoFetched) {
      if (currentControllerRef.current) currentControllerRef.current.abort();

      setAutoFetched(true);

      return fetch(options.params);
    }

    return () => {
      if (currentControllerRef.current) {
        // currentControllerRef.current.abort();
      }
    };
  }, [fetch, options?.autoFetch, options?.params, autoFetched]);

  return {
    loading,
    data,
    error,
    fetch,
    controller: currentControllerRef.current,
  };
};
