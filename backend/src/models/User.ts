import { DataTypes, Model, Optional, Association } from "sequelize";
import sequelize from "../config/db";
import { Role } from "./Role";

interface UserAttributes {
  id: number;
  email: string;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
  roles?: Role[];
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public googleId!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public roles?: Role[];
  public static associations: {
    roles: Association<User, Role>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "cpd_users",
  }
);

export { User };
