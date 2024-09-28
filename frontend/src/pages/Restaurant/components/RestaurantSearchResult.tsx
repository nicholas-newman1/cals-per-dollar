import { ListItem, Typography } from "@mui/material";

interface Props {
  id: string;
  name: string;
  calories: number;
  price: number;
}

const RestaurantSearchResult: React.FC<Props> = ({ name, calories, price }) => {
  const cpd = (calories / price).toFixed(0);
  return (
    <ListItem>
      <Typography variant="body2">
        {name}: <strong>{cpd} CPD</strong>
      </Typography>
    </ListItem>
  );
};

export default RestaurantSearchResult;
