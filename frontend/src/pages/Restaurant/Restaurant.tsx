import { useParams } from "react-router-dom";
import {
  GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse,
  Restaurant,
} from "./types";
import Loader from "../../components/Loader";
import { useRequest } from "../../hooks/useRequest";
import {
  Container,
  Grid,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import Search from "../../components/Search";
import theme from "../../theme";
import CategoryTable from "./CategoryTable";

const HeroGrid = styled(Grid)`
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 35rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 0;
  }
`;

const ReadableTypography = styled(Typography)`
  color: white;
  z-index: 20 !important;
  position: relative;
  margin: 0 auto;
`;

const RestaurantPage = () => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams<{ id: string }>();
  const { data: restaurant, loading } = useRequest<Restaurant>(
    `/restaurants/v1/get-by-id`,
    { id }
  );

  const { data: categories, loading: menuItemsLoading } = useRequest<
    GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse[]
  >(
    "/menu-items/v1/get-top-calories-per-dollar-for-each-category-by-restaurant",
    { restaurantId: id }
  );

  return loading ? (
    <Loader />
  ) : (
    <div>
      <HeroGrid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundImage: `url(/assets/restaurants/${id}.jpg)` }}
      >
        <Container maxWidth="lg">
          <Grid item container xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <ReadableTypography
                variant={isMdDown ? (isSmDown ? "h3" : "h2") : "h1"}
                color="white"
              >
                {restaurant?.name}
              </ReadableTypography>
            </Grid>

            {/* <Grid item xs={12}>
              <Container maxWidth="xs">
                <Search
                  placeholder={`Search ${restaurant?.name} Menu`}
                  endpoint="/menu-items/v1/search"
                  params={{ restaurant: id }}
                />
              </Container>
            </Grid> */}
          </Grid>
        </Container>
      </HeroGrid>
      {menuItemsLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="md">
          <Grid container>
            {categories
              ?.filter((category) => category.items.length)
              .map((category) => (
                <CategoryTable key={category.categoryId} category={category} />
              ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default RestaurantPage;
