import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { MenuItemSearchResult } from "./types";
import MenuItemCard from "./components/MenuItemCard";
import CustomSearchInput from "../../components/CustomSearchInput";

const MenuItemSearch = () => {
  const { initialLoading, hits, loading, loadMore, query, setQuery } =
    useSearch<MenuItemSearchResult>("/menu-items/v1/search", {
      enablePagination: true,
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const loadMoreRef = useInfiniteScroll({
    onIntersect: loadMore,
    isLoading: loading,
  });

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <CustomSearchInput
          placeholder="Search food..."
          value={query}
          onChange={handleInputChange}
        />
      </Box>

      {initialLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={50} />
        </Box>
      ) : hits?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          sx={{ mt: 4 }}
        >
          No results found for "{query}".
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {hits?.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={index}
              sx={{ display: "flex" }}
            >
              <MenuItemCard {...item} />
            </Grid>
          ))}
          {loading && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            >
              <CircularProgress size={50} />
            </Grid>
          )}
          <div ref={loadMoreRef} style={{ height: 1 }} />
        </Grid>
      )}
    </Box>
  );
};

export default MenuItemSearch;
