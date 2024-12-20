export interface Restaurant {
  id: string;
  name: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  calories: number;
  restaurantId: string;
  categoryId: string;
}

export interface GetTopCaloriesPerDollarForEachCategoryByRestaurantResponse {
  categoryId: string;
  categoryName: string;
  items: MenuItem[];
}
