import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DIALECT as any,
});

export const connectToDatabase = async () => {
  try {
    sequelize.authenticate().then(() => {
      console.log(`Connected to DB`);
    });
    // sync all models to db
    sequelize.sync({ alter: true });
  } catch (error) {
    console.log(`Failed to Connect to DB, ${error}`);
  }
};
