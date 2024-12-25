import { useEffect, useState } from "react";
import { Box, Select, MenuItem, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const sortOptions = [
  {
    label: "Cals Per Dollar",
    field: "cpd",
    ascIndex: "cpd_menu_items_cpd_asc",
    descIndex: "cpd_menu_items_cpd_desc",
  },
  {
    label: "Protein Per Dollar",
    field: "ppd",
    ascIndex: "cpd_menu_items_ppd_asc",
    descIndex: "cpd_menu_items_ppd_desc",
  },
  {
    label: "Fat Per Dollar",
    field: "fpd",
    ascIndex: "cpd_menu_items_fpd_asc",
    descIndex: "cpd_menu_items_fpd_desc",
  },
  {
    label: "Carbs Per Dollar",
    field: "carbspd",
    ascIndex: "cpd_menu_items_carbspd_asc",
    descIndex: "cpd_menu_items_carbspd_desc",
  },
];

interface SortSelectorProps {
  currentIndex: string;
  onIndexChange: (newIndex: string) => void;
}

export default function SortSelector({
  currentIndex,
  onIndexChange,
}: SortSelectorProps) {
  const [selectedField, setSelectedField] = useState<string>("cpd");
  const [isAsc, setIsAsc] = useState<boolean>(false);

  useEffect(() => {
    const match = sortOptions.find(
      (opt) => opt.ascIndex === currentIndex || opt.descIndex === currentIndex
    );
    if (match) {
      setSelectedField(match.field);
      setIsAsc(match.ascIndex === currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    const option = sortOptions.find((opt) => opt.field === selectedField);
    if (!option) return;

    const newIndex = isAsc ? option.ascIndex : option.descIndex;
    onIndexChange(newIndex);
  }, [selectedField, isAsc, onIndexChange]);

  const toggleOrder = () => {
    setIsAsc((prev) => !prev);
  };

  return (
    <Box display="flex" alignItems="center">
      <Select
        value={selectedField}
        onChange={(event) => setSelectedField(event.target.value)}
        size="small"
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.field} value={option.field}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <IconButton onClick={toggleOrder} size="small">
        {isAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Box>
  );
}
