import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



interface JwtPayload {
  id?: string;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Authorization token required." });

  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : null;
  if (!token) return res.status(401).json({ error: "Authorization token required." });

  try {
    const payload = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    const id = payload.id

    if (!id) return res.status(401).json({ error: "Request is not authorized." });

    const user = await User.findById(id).select("_id").lean();
    if (!user) return res.status(401).json({ error: "User not found." });

    req.user = { _id: user._id.toString() };
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;
