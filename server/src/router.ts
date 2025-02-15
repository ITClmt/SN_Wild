import express from "express";
import {
  signupController,
  loginController,
  browseUsersController,
  getUserProfileController,
  editUserProfileController,
  removeUserController,
} from "./modules/users/usersController";
import { authenticateToken } from "./modules/auth/authMiddleware";
import {
  browsePostsController,
  readPostController,
  editPostController,
  addPostController,
  removePostController,
} from "./modules/posts/postController";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// 🔹 Auth routes
router.post("/api/auth/signup", signupController);
router.post("/api/auth/login", loginController);

// 🔹 User routes
router.get("/api/users", authenticateToken, browseUsersController);
router.get("/api/users/me", authenticateToken, getUserProfileController);
router.put("/api/users/me", authenticateToken, editUserProfileController);
router.delete("/api/users/me", authenticateToken, removeUserController);

// 🔹 Post routes
router.get("/api/posts", browsePostsController);
router.get("/api/posts/:id", readPostController);
router.post("/api/posts", authenticateToken, addPostController);
router.put("/api/posts/:id", authenticateToken, editPostController);
router.delete("/api/posts/:id", authenticateToken, removePostController);

// 🔹 Item routes
// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
