import express from "express";
import { authenticateToken } from "./modules/auth/authMiddleware";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// 🔹 Auth routes
import usersController from "./modules/users/usersController";

router.post("/api/auth/signup", usersController.signupController);
router.post("/api/auth/login", usersController.loginController);

// 🔹 User routes

router.get("/api/users", usersController.browseUsersController);
router.get(
  "/api/users/me",
  authenticateToken,
  usersController.getUserProfileController,
);
router.put(
  "/api/users/me",
  authenticateToken,
  usersController.editUserProfileController,
);
router.delete(
  "/api/users/me",
  authenticateToken,
  usersController.removeUserController,
);

// 🔹 Post routes
import postController from "./modules/posts/postController";
router.get("/api/posts", postController.browsePostsController);
router.get("/api/posts/:id", postController.readPostController);
router.post("/api/posts", authenticateToken, postController.addPostController);
router.put(
  "/api/posts/:id",
  authenticateToken,
  postController.editPostController,
);
router.delete(
  "/api/posts/:id",
  authenticateToken,
  postController.removePostController,
);

// 🔹 Item routes
// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
