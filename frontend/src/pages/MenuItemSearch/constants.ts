import { FilterDefinition } from "../../components/FilterButton";
import RangeFilter from "../../components/RangeFilter";
import SearchSelectFilter from "../../components/SearchSelectFilter";

const basicsFilters = [
  {
    attribute: "price",
    label: "Price ($)",
    component: RangeFilter,
  },
  {
    attribute: "calories",
    label: "Cals",
    component: RangeFilter,
  },
];

const valueFilters = [
  { attribute: "caloriesPerDollar", label: "CPD", component: RangeFilter },
  {
    attribute: "proteinPerDollar",
    label: "Protein Per Dollar",
    component: RangeFilter,
  },
  {
    attribute: "fatPerDollar",
    label: "Fat Per Dollar",
    component: RangeFilter,
  },
  {
    attribute: "carbsPerDollar",
    label: "Carbs Per Dollar",
    component: RangeFilter,
  },
];

const restaurantFilter = [
  {
    attribute: "restaurant.name",
    label: "Restaurant",
    component: SearchSelectFilter,
  },
];

const macrosFilters = [
  { attribute: "fat", label: "Fat (g)", component: RangeFilter },
  { attribute: "carbs", label: "Carbs (g)", component: RangeFilter },
  { attribute: "protein", label: "Protein (g)", component: RangeFilter },
];

const categoryFilters = [
  { attribute: "cuisine", label: "Cuisine", component: SearchSelectFilter },
  {
    attribute: "restaurantType",
    label: "Restaurant Type",
    component: SearchSelectFilter,
  },
  {
    attribute: "mealType",
    label: "Meal Type",
    component: SearchSelectFilter,
  },
  {
    attribute: "foodType",
    label: "Food Type",
    component: SearchSelectFilter,
  },
];

export const filterButtons: {
  filters: FilterDefinition[];
  label: string;
}[] = [
  { filters: basicsFilters, label: "Basics" },
  { filters: valueFilters, label: "Value" },
  { filters: restaurantFilter, label: "Restaurant" },
  { filters: macrosFilters, label: "Macros" },
  { filters: categoryFilters, label: "Category & Cuisine" },
];
