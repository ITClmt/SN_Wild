import type { RequestHandler } from "express";
import {
  browsePosts,
  readPost,
  addPost,
  editPost,
  removePost,
} from "./postActions";

// 🔹 Récupérer tous les posts
export const browsePostsController: RequestHandler = async (_req, res) => {
  try {
    const posts = await browsePosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Récupérer un post spécifique
export const readPostController: RequestHandler = async (req, res) => {
  try {
    const post = await readPost(Number(req.params.id));
    res.json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  }
};

// 🔹 Ajouter un post
export const addPostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await addPost(req.user.id, req.body.content);
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Modifier un post
export const editPostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await editPost(
      Number(req.params.id),
      req.user.id,
      req.body.content,
    );
    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Supprimer un post
export const removePostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await removePost(Number(req.params.id), req.user.id);
    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
