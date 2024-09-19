import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  List,
  ListItem,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import makeRequest from "../utils/makeRequest";
import CustomSearchInput from "./CustomSearchInput";

const useDebounce = (value: string, delay: number) => {
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
};

interface Props {
  endpoint: string;
  placeholder?: string;
  params?: Record<string, any>;
}

const Search: React.FC<Props> = ({
  endpoint,
  placeholder = "Search",
  params = {},
}) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 200);

  const fetchSearchResults = useCallback(
    async (query: string) => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await makeRequest<any[]>({
          endpoint,
          params: { query, ...params },
        });
        setResults(data);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, params]
  );

  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchResults(debouncedQuery);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debouncedQuery, fetchSearchResults]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <CustomSearchInput
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(!!results.length)}
        onBlur={handleClose}
      />

      {open && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            marginTop: 0,
            maxHeight: 300,
            overflowY: "auto",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <List>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => alert(`Selected: ${result.name}`)}
                  >
                    {result.name}
                  </ListItemButton>
                ))
              ) : (
                <ListItem>No results found</ListItem>
              )}
            </List>
          )}
        </Paper>
      )}
    </div>
  );
};

export default Search;
