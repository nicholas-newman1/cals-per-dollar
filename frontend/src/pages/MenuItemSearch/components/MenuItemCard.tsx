import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import theme from "../../../theme";
import { MenuItemSearchResult } from "../types";
import AdditionalInfoRow from "./AdditionalInfoRow";

const MenuItemCard: React.FC<MenuItemSearchResult> = ({
  imageUrl,
  name,
  calories,
  price,
  fat,
  carbs,
  protein,
  restaurant,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        ) : (
          <FastfoodIcon
            sx={{ fontSize: 100, color: theme.palette.grey[400] }}
          />
        )}
      </Box>
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="textSecondary">{restaurant.name}</Typography>
        <Divider
          sx={{
            mt: 1,
            mb: 2,
            width: "40%",
            mx: "auto",
            bgcolor: theme.palette.primary.main,
            height: 2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {calories}
            </Typography>
            <Typography variant="caption">Cals</Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: theme.palette.divider, mx: 1 }}
          />
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {(calories / price).toFixed(0)}
            </Typography>
            <Typography variant="caption">CPD</Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: theme.palette.divider, mx: 1 }}
          />
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              ${price.toFixed(2)}
            </Typography>
            <Typography variant="caption">Price</Typography>
          </Box>
        </Box>

        {!expanded ? (
          <Button
            variant="outlined"
            fullWidth
            onClick={toggleExpand}
            sx={{ mt: 2, borderRadius: 5 }}
          >
            + More Information
          </Button>
        ) : (
          <Box
            sx={{
              mt: 2,
              p: 1,
              bgcolor: theme.palette.grey[200],
              borderRadius: 2,
            }}
          >
            <AdditionalInfoRow label="Fat (g)" value={fat} divider />
            <AdditionalInfoRow label="Carbs (g)" value={carbs} divider />
            <AdditionalInfoRow label="Protein (g)" value={protein} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
