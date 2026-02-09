import express from "express";
import { connectToDatabase } from "./db/db.connection.js";
import authRouter from './modules/auth/auth.controller.js';
import { initRedis } from "./redis/redis.client.js";
export const bootstrap = async (app) => {
    app.use(express.json());
    initRedis();
    await connectToDatabase();
    app.use('/auth', authRouter);
};
//# sourceMappingURL=app.controller.js.map