import type { RowDataPacket } from "mysql2";
import db from "../../../database/client";

interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

class PostRepository {
  // 🔹 Récupérer tous les posts
  async getAllPosts(): Promise<Post[]> {
    const [rows] = await db.query<RowDataPacket[]>(`
    SELECT posts.*, users.username 
    FROM posts 
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `);
    return rows as Post[];
  }

  // 🔹 Récupérer un post par ID
  async getPostById(id: number): Promise<Post | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?",
      [id],
    );
    return rows.length ? (rows[0] as Post) : null;
  }

  // 🔹 Ajouter un post
  async createPost(userId: number, content: string): Promise<number> {
    const [result] = await db.query(
      "INSERT INTO posts (user_id, content) VALUES (?, ?)",
      [userId, content],
    );
    return (result as { insertId: number }).insertId;
  }

  // 🔹 Mettre à jour un post
  async updatePost(id: number, content: string): Promise<void> {
    await db.query("UPDATE posts SET content = ? WHERE id = ?", [content, id]);
  }

  // 🔹 Supprimer un post
  async deletePost(id: number): Promise<void> {
    await db.query("DELETE FROM posts WHERE id = ?", [id]);
  }
}

export default new PostRepository();
