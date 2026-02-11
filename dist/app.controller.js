import express from "express";
import { connectToDatabase } from "./db/db.connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import { initRedis } from "./redis/redis.client.js";
import path from "node:path";
import cors from "cors";
export const bootstrap = async (app) => {
    app.use(express.json());
    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
    app.use(cors({
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // your frontend origin
        credentials: true,
    }));
    initRedis();
    await connectToDatabase();
    app.use("/auth", authRouter);
};
//# sourceMappingURL=app.controller.js.map