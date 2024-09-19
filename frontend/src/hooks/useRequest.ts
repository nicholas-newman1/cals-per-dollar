import { useState, useEffect, useCallback } from "react";
import makeRequest, {
  ValidationErrorException,
  ApiException,
} from "../utils/makeRequest";

interface UseRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
  refetch: () => void;
}

export const useRequest = <T>(
  endpoint: string,
  params: Record<string, any> = {},
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: Record<string, any> = {}
): UseRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[] | null>(
    null
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setValidationErrors(null);

    try {
      const result = await makeRequest<T>({ endpoint, method, params, body });
      setData(result);
    } catch (err: any) {
      if (err instanceof ValidationErrorException) {
        setValidationErrors(err.errors.map((e) => `${e.field}: ${e.message}`));
      } else if (err instanceof ApiException) {
        setError(err.message);
      } else {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [endpoint, method, JSON.stringify(params), JSON.stringify(body)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, validationErrors, refetch: fetchData };
};
