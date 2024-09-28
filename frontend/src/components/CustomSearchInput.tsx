import React from "react";
import { Box, InputAdornment, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface CustomSearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  placeholder = "Search",
  value,
  onChange,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "0 10px",
        width: "100%",
        minHeight: "45px",
      }}
    >
      <InputAdornment position="start">
        <IconButton edge="start" disabled>
          <SearchIcon />
        </IconButton>
      </InputAdornment>

      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          fontFamily: theme.typography.fontFamily,
          border: "none",
          outline: "none",
          flex: 1,
          padding: "10px",
          fontSize: "0.95rem",
          borderRadius: "25px",
          backgroundColor: theme.palette.background.paper,
        }}
      />
    </Box>
  );
};

export default CustomSearchInput;
