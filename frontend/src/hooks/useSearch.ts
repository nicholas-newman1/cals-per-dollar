import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  query: string;
  setQuery: (query: string) => void;
  setSort: (sort: string) => void;
  setFilters: (filters: Record<string, any>) => void;
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
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize initial values based on URL parameters
  const { initialQuery, initialSort, initialFilters, initialPage } =
    useMemo(() => {
      const urlParams = new URLSearchParams(location.search);
      const initialQuery = urlParams.get("query") || options.query || "";
      const initialSort = urlParams.get("sort") || options.sort || "";
      const initialPage = parseInt(urlParams.get("page") || "1", 10);

      const initialFilters: Record<string, any> = { ...options.filters };
      urlParams.forEach((value, key) => {
        if (!["query", "sort", "page"].includes(key)) {
          initialFilters[key] = value;
        }
      });

      return { initialQuery, initialSort, initialFilters, initialPage };
    }, [location.search, options.query, options.sort, options.filters]);

  // Set up state for query, sort, filters, and page with URL-based defaults
  const [query, setQuery] = useState<string>(initialQuery);
  const [sort, setSort] = useState<string>(initialSort);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [page, setPage] = useState<number>(initialPage);

  const [hits, setHits] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debouncedQuery = useDebounce(query, debounce);
  const debouncedFilters = useDebounce(filters, debounce);
  const debouncedSort = useDebounce(sort, debounce);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (debouncedSort) params.set("sort", debouncedSort);
    if (page > 1) params.set("page", page.toString());
    Object.entries(debouncedFilters || {}).forEach(([key, value]: any) => {
      params.set(key, value);
    });
    const newURL = `${window.location.pathname}?${params.toString()}`;
    navigate(newURL, { replace: true });
  }, [debouncedQuery, debouncedSort, debouncedFilters, page, navigate]);

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
          ...(enablePagination ? { page, itemsPerPage } : {}),
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
        updateURL(); // Update URL after data is fetched
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
      updateURL,
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
    query,
    setQuery,
    setSort,
    setFilters,
  };
}

export default useSearch;
