import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface TagAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TagCreationAttributes
  extends Optional<TagAttributes, "id" | "createdAt" | "updatedAt"> {}

class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  public id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cpd_tags",
    timestamps: false,
  }
);

export { Tag };
