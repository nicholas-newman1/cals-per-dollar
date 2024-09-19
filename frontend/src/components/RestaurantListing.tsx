import { Card, Typography, Box, ListItemButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
}

const RestaurantListing: React.FC<Props> = ({ id, name }) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <ListItemButton disableGutters sx={{ padding: 0, borderRadius: "1rem" }}>
        <Card
          sx={{
            position: "relative",
            height: "300px",
            width: "100%",
            overflow: "hidden",
            "&:hover .image": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Box
            className="image"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(/assets/restaurants/${id}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.5s ease",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              zIndex: 1,
              color: "white",
            }}
          >
            {name}
          </Typography>
        </Card>
      </ListItemButton>
    </Link>
  );
};

export default RestaurantListing;
