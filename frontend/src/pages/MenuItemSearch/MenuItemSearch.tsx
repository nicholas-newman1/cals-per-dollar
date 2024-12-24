import React from "react";
import {
  InstantSearch,
  Configure,
  useSearchBox,
  useInfiniteHits,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { Box, Grid, Typography } from "@mui/material";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import MenuItemCard from "./components/MenuItemCard";
import CustomSearchInput from "../../components/CustomSearchInput";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY!
);

function SearchBox() {
  const { query, refine } = useSearchBox();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refine(event.target.value);
  };

  return (
    <CustomSearchInput
      placeholder="Search food..."
      value={query}
      onChange={handleChange}
    />
  );
}

function CustomInfiniteHits() {
  const { items, showMore, isLastPage } = useInfiniteHits();

  const loadMoreRef = useInfiniteScroll({
    onIntersect: () => !isLastPage && showMore(),
  });

  if (items.length === 0) {
    return (
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        sx={{ mt: 4 }}
      >
        No results found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {items.map((hit: any) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          key={hit.objectID}
          sx={{ display: "flex" }}
        >
          <MenuItemCard {...hit} />
        </Grid>
      ))}

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </Grid>
  );
}

function MenuItemSearch() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={`${process.env.REACT_APP_ALGOLIA_INDEX_PREFIX}cpd_menu_items`}
    >
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SearchBox />
        </Box>
        <CustomInfiniteHits />
        <Configure hitsPerPage={12} />
      </Box>
    </InstantSearch>
  );
}

export default MenuItemSearch;
