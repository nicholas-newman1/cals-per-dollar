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
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  calories: number;
  fat?: number;
  protein?: number;
  carbs?: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

export interface MenuItemSearchResult extends MenuItem {
  restaurant: Restaurant;
}
