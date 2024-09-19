import React from "react";
import { Box, InputAdornment, IconButton } from "@mui/material";
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
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
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
          border: "none",
          outline: "none",
          flex: 1,
          padding: "10px",
          fontSize: "16px",
          borderRadius: "25px",
        }}
      />
    </Box>
  );
};

export default CustomSearchInput;
