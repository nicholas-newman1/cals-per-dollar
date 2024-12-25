import { useCurrentRefinements } from "react-instantsearch";
import { Box, Chip, Divider } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const formatToTitleCase = (input: string) =>
  input
    .split(".")
    .map((segment) =>
      segment
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^.|\s./g, (char) => char.toUpperCase())
    )
    .join(" ");

const ActiveFilters = () => {
  const { items, refine } = useCurrentRefinements();

  const handleClearAll = () => {
    items.forEach((item) => {
      item.refinements.forEach((refinement) => {
        refine(refinement);
      });
    });
  };

  return (
    <>
      {items.length > 0 && <Divider sx={{ mb: 2 }} />}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {items.map((item) =>
          item.refinements.map((refinement) => (
            <Chip
              key={`${item.attribute}-${refinement.label || refinement.value}`}
              label={
                <>
                  <b>{formatToTitleCase(item.attribute)}: </b>
                  {refinement.label || refinement.value}
                </>
              }
              onClick={() => refine(refinement)}
              onDelete={() => refine(refinement)}
              deleteIcon={<ClearIcon />}
              sx={{ borderRadius: 20 }}
            />
          ))
        )}

        {items.length > 0 && (
          <Chip
            label="Clear"
            onClick={handleClearAll}
            sx={{ borderRadius: 20 }}
          />
        )}
      </Box>
    </>
  );
};

export default ActiveFilters;
