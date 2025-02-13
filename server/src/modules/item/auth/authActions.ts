import type { RequestHandler } from "express";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../../database/client";
import usersRepository from "../users/usersRepository";

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
}

// POST /api/auth/register
export const registerUser: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    // Vérifie si l'email existe déjà
    const [existingUser] = await db.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    if (existingUser.length > 0) {
      res.status(409).json({ message: "L'email existe déjà" });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ message: "L'email est invalide" });
      return;
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion de l'utilisateur
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
      [email, username, hashedPassword],
    );

    // Génère un token JWT pour le nouvel utilisateur
    const token = jwt.sign(
      {
        id: result.insertId,
        username,
        email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    res.status(201).json({ message: "Utilisateur créé avec succès", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/auth/login
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  console.info("Login attempt for email:", email);

  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  try {
    // Vérifie si l'utilisateur existe
    const user = await usersRepository.readByEmail(email);
    console.info("Database response:", {
      ...user,
      password_hash: user?.password_hash ? "[PRESENT]" : "[MISSING]",
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!user.password_hash) {
      console.error("No password_hash found for user:", user.id);
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Génère un token JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { registerUser, loginUser };
