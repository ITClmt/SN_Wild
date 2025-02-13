import db from "../../../../database/client";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface User extends RowDataPacket {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date;
}

// 🔹 Récupérer un utilisateur par son email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.query<User[]>("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length ? rows[0] : null;
};

// 🔹 Récupérer un utilisateur par son ID
export const findUserById = async (id: number): Promise<User | null> => {
  const [rows] = await db.query<User[]>(
    "SELECT id, email, username FROM users WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

// 🔹 Ajouter un utilisateur
export const createUser = async (
  email: string,
  username: string,
  passwordHash: string,
): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
    [email, username, passwordHash],
  );
  return result.insertId;
};

// 🔹 Mettre à jour un utilisateur
export const updateUser = async (
  id: number,
  username: string,
): Promise<void> => {
  await db.query("UPDATE users SET username = ? WHERE id = ?", [username, id]);
};

// 🔹 Supprimer un utilisateur
export const deleteUser = async (id: number): Promise<void> => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};

// 🔹 Récupérer tous les utilisateurs (BREAD - Browse)
export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await db.query<User[]>(
    "SELECT id, email, username, created_at FROM users",
  );
  return rows;
};
