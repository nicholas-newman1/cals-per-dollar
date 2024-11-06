import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserRoleAttributes {
  userId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "createdAt" | "updatedAt"> {}

class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  public userId!: number;
  public roleId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "cpd_users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "cpd_roles",
        key: "id",
      },
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
    tableName: "cpd_user_roles",
  }
);

export { UserRole };
