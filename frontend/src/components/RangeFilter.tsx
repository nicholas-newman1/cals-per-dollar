import React, { useState, useEffect } from "react";
import { useRange } from "react-instantsearch";
import { Slider, Box, Typography } from "@mui/material";

interface RangeFilterProps {
  attribute: string;
  label?: string;
  step?: number;
  formatValue?: (value: number) => string;
}

function RangeFilter({
  attribute,
  label,
  step = 1,
  formatValue,
}: RangeFilterProps) {
  const { range, refine, start } = useRange({ attribute });
  const [value, setValue] = useState<number[]>([
    range.min || 0,
    range.max || 0,
  ]);

  useEffect(() => {
    if (start && start.length === 2) {
      setValue([start[0]!, start[1]!]);
    } else if (range.min !== undefined && range.max !== undefined) {
      setValue([range.min, range.max]);
    }
  }, [range.min, range.max, start]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const handleChangeCommitted = (
    _: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      refine([newValue[0], newValue[1]]);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {label && (
        <Typography fontSize={16} variant="h6" gutterBottom>
          {label}
        </Typography>
      )}
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        min={range.min}
        max={range.max}
        step={step}
        valueLabelFormat={(val) => (formatValue ? formatValue(val) : val)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption">
          {formatValue ? formatValue(range.min || 0) : `${range.min}`}
        </Typography>
        <Typography variant="caption">
          {formatValue ? formatValue(range.max || 0) : `${range.max}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default RangeFilter;
