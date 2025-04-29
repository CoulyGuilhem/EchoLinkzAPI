import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest"; // 👈 import ton type

interface JwtPayload {
  userId: string;
}

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.userId = decoded.userId; // ✅ plus d'erreur ici
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
