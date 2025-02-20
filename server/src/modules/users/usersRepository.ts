import db from "../../../database/client";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface User extends RowDataPacket {
  id: number;
  email: string;
  username: string;
  bio: string;
  profile_picture: string;
  website: string;
  password_hash: string;
  created_at: Date;
}

class UsersRepository {
  // 🔹 Récupérer un utilisateur par son email
  async findUserByEmail(email: string) {
    const [rows] = await db.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    return rows.length ? rows[0] : null;
  }

  // 🔹 Récupérer un utilisateur par son ID
  async findUserById(id: number) {
    const [rows] = await db.query<User[]>(
      "SELECT id, email, username, bio, profile_picture, website FROM users WHERE id = ?",
      [id],
    );
    return rows.length ? rows[0] : null;
  }

  // 🔹 Ajouter un utilisateur
  async createUser(email: string, username: string, passwordHash: string) {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
      [email, username, passwordHash],
    );
    return result.insertId;
  }

  // 🔹 Mettre à jour un utilisateur
  async updateUser(
    id: number,
    username?: string,
    email?: string,
    bio?: string,
    profile_picture?: string,
    website?: string,
  ) {
    await db.query(
      "UPDATE users SET username = ?, email = ?, bio = ?, profile_picture = ?, website = ? WHERE id = ?",
      [username, email, bio, profile_picture, website, id],
    );
  }

  // 🔹 Supprimer un utilisateur
  async deleteUser(id: number): Promise<void> {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  }

  // 🔹 Récupérer tous les utilisateurs (BREAD - Browse)
  async getAllUsers() {
    const [rows] = await db.query<User[]>(
      "SELECT id, email, username, bio, profile_picture, website, created_at FROM users",
    );
    return rows;
  }
}

export default new UsersRepository();
