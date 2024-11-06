import { User } from "./User";
import { Role } from "./Role";
import { UserRole } from "./UserRole";
import { Restaurant } from "./Restaurant";
import { Category } from "./Category";
import { MenuItem } from "./MenuItem";

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

export { User, Role, UserRole, Restaurant, Category, MenuItem };
