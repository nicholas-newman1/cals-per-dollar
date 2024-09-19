import RestaurantEnum from "./restaurantEnum";

export interface MenuItemEntity {
  id: number;
  name: string;
  price: number;
  calories: number;
  restaurantId: number;
  categoryId: string;
}

export interface MenuItemDto {
  name: string;
  price: number;
  calories: number;
  restaurantId: RestaurantEnum;
  categoryId: string;
}
