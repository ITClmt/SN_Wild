import type { RequestHandler } from "express";
import postActions from "./postActions";

// 🔹 Récupérer tous les posts
const browsePostsController: RequestHandler = async (_req, res) => {
  try {
    const posts = await postActions.browsePosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Récupérer un post spécifique
const readPostController: RequestHandler = async (req, res) => {
  try {
    const post = await postActions.readPost(Number(req.params.id));
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
const addPostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await postActions.addPost(req.user.id, req.body.content);
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
const editPostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await postActions.editPost(
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
const removePostController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await postActions.removePost(
      Number(req.params.id),
      req.user.id,
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

export default {
  browsePostsController,
  readPostController,
  addPostController,
  editPostController,
  removePostController,
};
