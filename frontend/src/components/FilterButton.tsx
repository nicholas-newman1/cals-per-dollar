import React, { useState } from "react";
import { Button, Box, ClickAwayListener } from "@mui/material";
import { useCurrentRefinements } from "react-instantsearch";

export interface FilterDefinition {
  attribute: string;
  label: string;
  step?: number;
  component: React.ComponentType<any>;
}

interface FilterButtonProps {
  filters: FilterDefinition[];
  label: string;
  icon?: React.ReactNode;
}

function FilterButton({ filters, label, icon }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { items } = useCurrentRefinements();
  const active = items.some((item) =>
    filters.map((f) => f.attribute).includes(item.attribute)
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={handleToggle}
          variant={active ? "contained" : "outlined"}
          startIcon={icon}
          sx={{ borderRadius: 20, px: 3, py: 0.5, boxShadow: "none" }}
        >
          {label}
        </Button>

        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            mt: 1,
            width: 300,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 4,
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            display: isOpen ? "block" : "none",
          }}
        >
          {filters.map(
            ({ attribute, label, step, component: FilterComponent }) => (
              <FilterComponent
                key={attribute}
                attribute={attribute}
                label={label}
                step={step}
              />
            )
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
}

export default FilterButton;
