import { Box, Container, List } from "@mui/material";
import RestaurantListing from "../../components/RestaurantListing";
import Loader from "../../components/Loader";
import { useRequest } from "../../hooks/useRequest";
import { Restaurant } from "../Restaurant/types";

const Home = () => {
  const { data: restaurants, loading } = useRequest<Restaurant[]>(
    "/restaurants/v1/get-all"
  );

  return (
    <Container maxWidth="md">
      {loading ? (
        <Loader />
      ) : (
        <List sx={{ marginTop: "1rem" }}>
          {restaurants?.map((restaurant: any) => (
            <Box sx={{ marginBottom: "1rem" }} key={restaurant.id}>
              <RestaurantListing
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
              />
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;
