import type { RequestHandler } from "express";
import usersActions from "./usersActions";

// 🔹 Inscription
const signupController: RequestHandler = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const response = await usersActions.signupUser(email, username, password);

    // Set cookie
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({
      message: response.message,
      token: response.token,
      user: response.user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Connexion
const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await usersActions.loginUser(email, password);

    // Set cookie
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ user: response.user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "An unknown error occurred" });
    }
  }
};

// 🔹 Voir tous les utilisateurs (Admin seulement)
const browseUsersController: RequestHandler = async (req, res) => {
  try {
    const users = await usersActions.browseUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Voir son profil
const getUserProfileController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const user = await usersActions.getUserProfile(req.user.id);
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
const editUserProfileController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const { username, email, bio, profile_picture, website } = req.body;
    const response = await usersActions.editUserProfile(
      req.user.id,
      username,
      email,
      bio,
      profile_picture,
      website,
    );
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
const removeUserController: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const response = await usersActions.removeUser(req.user.id);
    res.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const logoutController: RequestHandler = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

export default {
  signupController,
  loginController,
  browseUsersController,
  getUserProfileController,
  editUserProfileController,
  removeUserController,
  logoutController,
};
