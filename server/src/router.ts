import express from "express";
import {
  signupController,
  loginController,
  browseUsersController,
  getUserProfileController,
  editUserProfileController,
  removeUserController,
} from "./modules/item/users/usersController";
import { authenticateToken } from "./modules/item/auth/authMiddleware";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
router.post("/api/auth/signup", signupController);
router.post("/api/auth/login", loginController);

router.get("/api/users", authenticateToken, browseUsersController);
router.get("/api/users/me", authenticateToken, getUserProfileController);
router.put("/api/users/me", authenticateToken, editUserProfileController);
router.delete("/api/users/me", authenticateToken, removeUserController);

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
