import React from "react";
import { Typography, Box, Divider } from "@mui/material";

interface Props {
  label: string;
  value?: string | number;
  divider?: boolean;
}

const AdditionalInfoRow: React.FC<Props> = ({ label, value, divider }) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: divider ? 1 : 0 }}
      >
        <Typography variant="body2" color="textSecondary">
          {label}:
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {value ?? "N/A"}
        </Typography>
      </Box>
      {divider && <Divider sx={{ my: 1 }} />}
    </Box>
  );
};

export default AdditionalInfoRow;
