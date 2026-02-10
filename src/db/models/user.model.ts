import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";
import { Plans, providers } from "../../constants.js";

const User = sequelize.define(
  "user",
  {
    user_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 50],
          msg: "Minimum length for name is 3 characters & Max is 50 chars.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.ENUM(...Object.values(providers)),
      defaultValue: providers.local,
    },
    plan: {
      type: DataTypes.ENUM(...Object.values(Plans)),
      defaultValue: Plans.free,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    changeCreds: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    validate: {
      passwordOrGoogleId() {
        if (!this.password && !this.googleId) {
          throw new Error("password is not allowed to be null");
        }
        if (this.password != null) {
          if (typeof this.password !== "string") {
            throw new Error("Password must be a string");
          }

          if (this.password.trim().length === 0) {
            throw new Error("Password cannot be empty");
          }
        }
      },
    },
  },
);

export default User;
