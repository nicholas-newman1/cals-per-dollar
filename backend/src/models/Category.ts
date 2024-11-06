import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface CategoryAttributes {
  id: number;
  restaurantId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id" | "createdAt" | "updatedAt"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public restaurantId!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public imageUrl?: string;
}

Category.init(
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
    name: {
      type: DataTypes.STRING(255),
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
    tableName: "cpd_categories",
    timestamps: true,
  }
);

export { Category };
