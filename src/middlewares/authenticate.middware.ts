import { type Request, type NextFunction, type Response } from "express";
import { decoding } from "../lib/encoding.js";
import User from "../db/models/user.model.js";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ");
  if (token?.[0] !== "Bearer" || !token?.[1]) {
    return next(new Error("invalid token", { cause: 400 }));
  }
  const payload = decoding(token?.[1]);
  if (typeof payload !== "string") {
    const user = await User.findByPk(payload.id);
    if (!user) return next(new Error("user doesnot exist", { cause: 404 }));
    if (
      !user.getDataValue("isActivated") ||
      user.getDataValue("deletedAt") !== null
    )
      return next(new Error("User is inactive or deleted", { cause: 404 }));
    const initToken = payload.iat! * 1000;
    const changeCredstime = new Date(
      user.getDataValue("changeCreds"),
    ).getTime();
    if (initToken < changeCredstime) {
      return next(
        new Error("session is expired, please login.", { cause: 400 }),
      );
    }
    req.user = user.get();
  }
  next();
};
