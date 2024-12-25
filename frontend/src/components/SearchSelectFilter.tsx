import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";

interface SearchSelectFilterProps {
  attribute: string;
  label?: string;
  placeholder?: string;
}

function SearchSelectFilter({
  attribute,
  label,
  placeholder,
}: SearchSelectFilterProps) {
  const { items, refine, searchForItems } = useRefinementList({
    attribute,
    operator: "or",
    searchable: true,
  } as UseRefinementListProps);

  const [inputValue, setInputValue] = useState("");

  return (
    <Box sx={{ mb: 2, minWidth: 250 }}>
      {label && (
        <Typography fontSize={16} variant="h6" gutterBottom>
          {label}
        </Typography>
      )}

      <Autocomplete
        multiple
        options={items}
        value={items.filter((item) => item.isRefined)}
        getOptionLabel={(option) => `${option.label} (${option.count})`}
        onChange={(_, __, reason, details) => {
          if (reason === "selectOption" && details?.option) {
            refine(details.option.value);
            setInputValue("");
          } else if (reason === "removeOption" && details?.option) {
            refine(details.option.value);
          } else if (reason === "clear") {
            items.forEach((item) => item.isRefined && refine(item.value));
          }
        }}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder || "Search..."}
            variant="outlined"
            onChange={(event) => {
              setInputValue(event.target.value);
              searchForItems(event.target.value);
            }}
            value={inputValue}
          />
        )}
      />
    </Box>
  );
}

export default SearchSelectFilter;
