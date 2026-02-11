import { Sequelize } from "sequelize";
import "dotenv/config";
export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DIALECT,
});
export const connectToDatabase = async () => {
    try {
        sequelize.authenticate().then(() => {
            console.log(`Connected to DB`);
        });
        // sync all models to db
        sequelize.sync();
    }
    catch (error) {
        console.log(`Failed to Connect to DB, ${error}`);
    }
};
//# sourceMappingURL=db.connection.js.map