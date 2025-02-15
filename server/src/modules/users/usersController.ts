import type { RequestHandler } from "express";
import {
  signupUser,
  loginUser,
  browseUsers,
  getUserProfile,
  editUserProfile,
  removeUser,
} from "./usersActions";

// 🔹 Inscription
export const signupController: RequestHandler = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const response = await signupUser(email, username, password);
    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Connexion
export const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    res.status(200).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Voir tous les utilisateurs (Admin seulement)
export const browseUsersController: RequestHandler = async (req, res) => {
  try {
    const users = await browseUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Voir son profil
export const getUserProfileController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const user = await getUserProfile(req.user.id);
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Modifier son profil
export const editUserProfileController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const { username } = req.body;
    const response = await editUserProfile(req.user.id, username);
    res.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Supprimer son compte
export const removeUserController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const response = await removeUser(req.user.id);
    res.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
