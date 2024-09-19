export interface CategoryEntity {
  id: number;
  name: string;
  restaurantId: string;
}

export interface CategoryDto {
  name: string;
  restaurantId: string;
}
