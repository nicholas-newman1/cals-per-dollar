import {
  Grid,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse } from "./types";

interface Props {
  category: GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse;
}

const CategoryTable: React.FC<Props> = ({ category }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 20, category.items.length)
    );
  };

  const visibleItems = category.items.slice(0, visibleCount);

  return (
    <Grid
      container
      item
      xs={12}
      key={category.categoryId}
      justifyContent="center"
    >
      <Typography variant="h4" textAlign="center" sx={{ marginTop: "6rem" }}>
        {category.categoryName}
      </Typography>
      <TableContainer
        component={Paper}
        elevation={12}
        sx={{ margin: "1rem 0" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "100%" }}>
                <Typography variant="h6">Item</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">CPD</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Price</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Calories</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell>
                  <Typography variant="body1">{item.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {(item.calories / item.price).toFixed(0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">${item.price}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{item.calories}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {category.items.length > visibleCount && (
        <Button variant="contained" onClick={handleShowMore}>
          See More
        </Button>
      )}
    </Grid>
  );
};

export default CategoryTable;
