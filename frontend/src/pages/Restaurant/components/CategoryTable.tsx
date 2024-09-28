import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import { GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse } from "../types";
import theme from "../../../theme";

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
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ marginTop: "4rem" }}>
        {category.categoryName}
      </Typography>
      <TableContainer
        component={Paper}
        elevation={12}
        sx={{
          margin: "1rem 0",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "100%" }}>
                <Typography>Item</Typography>
              </TableCell>
              <TableCell
                sx={{ backgroundColor: theme.palette.background.default }}
              >
                <Typography variant="h6">CPD</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">Price</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">Cals</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell>
                  <Typography variant="body2">{item.name}</Typography>
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: theme.palette.background.default }}
                >
                  <Typography fontWeight="bold">
                    {(item.calories / item.price).toFixed(0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">${item.price}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{item.calories}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {category.items.length > visibleCount && (
        <Button
          variant="contained"
          sx={{ margin: "0 auto", display: "block" }}
          onClick={handleShowMore}
        >
          See More
        </Button>
      )}
    </Container>
  );
};

export default CategoryTable;
