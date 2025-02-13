import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Définition du type pour l'utilisateur
interface JwtPayload {
  id: number;
  username: string;
}

// Étend l'objet `Request` d'Express pour inclure `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format attendu : "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.user = decoded; // Injecte les infos utilisateur dans `req.user`
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

export default authenticateToken;
