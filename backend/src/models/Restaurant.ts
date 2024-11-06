import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface RestaurantAttributes {
  id: number;
  name: string;
  location: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

interface RestaurantCreationAttributes
  extends Optional<RestaurantAttributes, "id" | "createdAt" | "updatedAt"> {}

class Restaurant
  extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes
{
  public id!: number;
  public name!: string;
  public location!: string | null;
  public website!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public imageUrl?: string;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    tableName: "cpd_restaurants",
    timestamps: true,
  }
);

export { Restaurant };
