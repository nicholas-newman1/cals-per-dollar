import React, { useState } from "react";
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
import ActiveFilters from "../../components/ActiveFilters";
import { filterButtons } from "./constants";
import FilterButton from "../../components/FilterButton";
import SortSelector from "./components/SortSelector";
import { Theme, useMediaQuery } from "@mui/material";

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
    <Grid container spacing={2}>
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

interface MenuItemSearchContentProps {
  currentIndex: string;
  handleIndexChange: (newIndex: string) => void;
}

const MenuItemSearchContent: React.FC<MenuItemSearchContentProps> = ({
  currentIndex,
  handleIndexChange,
}) => {
  const isSmDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: isSmDown ? "wrap" : "nowrap",
            mb: 2,
            gap: 2,
          }}
        >
          <SearchBox />
          <SortSelector
            currentIndex={currentIndex}
            onIndexChange={handleIndexChange}
          />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {filterButtons.map((button) => (
            <FilterButton key={button.label} {...button} />
          ))}
        </Box>

        <Box sx={{ mb: 2 }}>
          <ActiveFilters />
        </Box>

        <CustomInfiniteHits />
        <Configure hitsPerPage={12} />
      </Box>
    </>
  );
};

export default function MenuItemSearch() {
  const [currentIndex, setCurrentIndex] = useState(
    `${process.env.REACT_APP_ALGOLIA_INDEX_PREFIX}cpd_menu_items_cpd_desc`
  );

  const handleIndexChange = (newIndex: string) => {
    setCurrentIndex(`${process.env.REACT_APP_ALGOLIA_INDEX_PREFIX}${newIndex}`);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName={currentIndex}>
      <MenuItemSearchContent
        currentIndex={currentIndex}
        handleIndexChange={handleIndexChange}
      />
    </InstantSearch>
  );
}
