import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface MenuItemAttributes {
  id: number;
  restaurantId: number;
  categoryId: number;
  name: string;
  price: number;
  calories: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

interface MenuItemCreationAttributes
  extends Optional<MenuItemAttributes, "id" | "createdAt" | "updatedAt"> {}

class MenuItem
  extends Model<MenuItemAttributes, MenuItemCreationAttributes>
  implements MenuItemAttributes
{
  public id!: number;
  public restaurantId!: number;
  public categoryId!: number;
  public name!: string;
  public price!: number;
  public calories!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public imageUrl?: string;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "cpd_restaurants",
        key: "id",
      },
      field: "restaurant_id",
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "cpd_categories",
        key: "id",
      },
      field: "category_id",
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "image_url",
    },
  },
  {
    sequelize,
    tableName: "cpd_menu_items",
    timestamps: true,
  }
);

export { MenuItem };