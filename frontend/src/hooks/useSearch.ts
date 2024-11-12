import { useState, useEffect, useCallback } from "react";
import makeRequest, {
  ApiException,
  ValidationErrorException,
} from "../utils/makeRequest";

type SearchOptions = {
  query?: string;
  filters?: Record<string, any>;
  sort?: string;
  debounce?: number;
  itemsPerPage?: number;
  enablePagination?: boolean;
};

interface UseSearchResult<T> {
  hits: T[];
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  refetch: () => void;
}

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useSearch<T>(
  endpoint: string,
  options: SearchOptions = {}
): UseSearchResult<T> {
  const {
    debounce = 300,
    itemsPerPage = 20,
    enablePagination = false,
  } = options;
  const [hits, setHits] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debouncedQuery = useDebounce(options.query, debounce);
  const debouncedFilters = useDebounce(options.filters, debounce);
  const debouncedSort = useDebounce(options.sort, debounce);

  const fetchData = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      if (reset) setInitialLoading(true);
      setError(null);

      try {
        const params = {
          ...(debouncedQuery ? { query: debouncedQuery } : {}),
          ...(debouncedFilters ? debouncedFilters : {}),
          ...(debouncedSort ? { sort: debouncedSort } : {}),
          ...(enablePagination ? { page, itemsPerPage } : {}), // Apply pagination only if enabled
        };

        const data = await makeRequest<{
          hits: T[];
          pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
          };
        }>({
          endpoint,
          method: "GET",
          params,
        });

        if (reset) {
          setHits(data.hits);
        } else {
          setHits((prevHits) => [...prevHits, ...data.hits]);
        }

        if (enablePagination) {
          setHasMore(data.pagination.currentPage < data.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        if (err instanceof ValidationErrorException) {
          setError(
            err.errors.map((e) => `${e.field}: ${e.message}`).join(", ")
          );
        } else if (err instanceof ApiException) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [
      debouncedQuery,
      debouncedFilters,
      debouncedSort,
      page,
      itemsPerPage,
      loading,
      enablePagination,
    ]
  );

  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [endpoint, debouncedQuery, debouncedFilters, debouncedSort]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && enablePagination) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore, enablePagination]);

  useEffect(() => {
    if (page > 1 && enablePagination) {
      fetchData();
    }
  }, [page, enablePagination]);

  return {
    hits,
    loading,
    initialLoading,
    error,
    loadMore,
    hasMore,
    refetch: () => fetchData(true),
  };
}

export default useSearch;
