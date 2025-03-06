import express from "express";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// 🔹 Auth routes
import usersController from "./modules/users/usersController";
import validateLoginForm from "./modules/Middleware/loginForm";
import validateSignupForm from "./modules/Middleware/signupForm";
import authMiddleware from "./modules/auth/authMiddleware";

router.post(
  "/api/auth/signup",
  validateSignupForm,
  usersController.signupController,
);
router.post(
  "/api/auth/login",
  validateLoginForm,
  usersController.loginController,
);
router.post("/api/auth/logout", usersController.logoutController);

// 🔹 User routes

router.get("/api/users", usersController.browseUsersController);
router.get(
  "/api/users/me",
  authMiddleware.authenticateToken,
  usersController.getUserProfileController,
);
router.put(
  "/api/users/me",
  authMiddleware.authenticateToken,
  usersController.editUserProfileController,
);
router.delete(
  "/api/users/me",
  authMiddleware.authenticateToken,
  usersController.removeUserController,
);

// 🔹 Post routes
import postController from "./modules/posts/postController";

router.get("/api/posts", postController.browsePostsController);
router.get("/api/posts/:id", postController.readPostController);
router.post(
  "/api/posts",
  authMiddleware.authenticateToken,
  postController.addPostController,
);
router.put(
  "/api/posts/:id",
  authMiddleware.authenticateToken,
  postController.editPostController,
);
router.delete("/api/posts/:id", postController.removePostController);

// 🔹 Item routes
// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
