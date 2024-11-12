import { User } from "./User";
import { Role } from "./Role";
import { UserRole } from "./UserRole";
import { Restaurant } from "./Restaurant";
import { Category } from "./Category";
import { MenuItem } from "./MenuItem";
import { Tag } from "./Tag";

Restaurant.hasMany(Category, { foreignKey: "restaurantId", as: "categories" });
Category.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId", as: "menuItems" });
MenuItem.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

Category.hasMany(MenuItem, { foreignKey: "categoryId", as: "menuItems" });
MenuItem.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  as: "roles",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  as: "users",
});

MenuItem.belongsToMany(Tag, {
  through: "cpd_menu_item_tags",
  foreignKey: "menu_item_id",
  otherKey: "tag_id",
  as: "tags",
});

Tag.belongsToMany(MenuItem, {
  through: "cpd_menu_item_tags",
  foreignKey: "tag_id",
  otherKey: "menu_item_id",
  as: "menuItems",
});

Restaurant.belongsToMany(Tag, {
  through: "cpd_restaurant_tags",
  foreignKey: "restaurant_id",
  otherKey: "tag_id",
  as: "tags",
});

Tag.belongsToMany(Restaurant, {
  through: "cpd_restaurant_tags",
  foreignKey: "tag_id",
  otherKey: "restaurant_id",
  as: "restaurants",
});

export { User, Role, UserRole, Restaurant, Category, MenuItem, Tag };
