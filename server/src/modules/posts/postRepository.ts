import type { RowDataPacket } from "mysql2";
import db from "../../../database/client";

interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

// 🔹 Récupérer tous les posts
export const getAllPosts = async (): Promise<Post[]> => {
  const [rows] = await db.query<RowDataPacket[]>(`
    SELECT posts.*, users.username 
    FROM posts 
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `);
  return rows as Post[];
};

// 🔹 Récupérer un post par ID
export const getPostById = async (id: number): Promise<Post | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM posts WHERE id = ?",
    [id],
  );
  return rows.length ? (rows[0] as Post) : null;
};

// 🔹 Ajouter un post
export const createPost = async (
  userId: number,
  content: string,
): Promise<number> => {
  const [result] = await db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [userId, content],
  );
  return (result as { insertId: number }).insertId;
};

// 🔹 Mettre à jour un post
export const updatePost = async (
  id: number,
  content: string,
): Promise<void> => {
  await db.query("UPDATE posts SET content = ? WHERE id = ?", [content, id]);
};

// 🔹 Supprimer un post
export const deletePost = async (id: number): Promise<void> => {
  await db.query("DELETE FROM posts WHERE id = ?", [id]);
};
