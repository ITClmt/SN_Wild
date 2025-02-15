import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "./usersRepository";

// 🔹 Inscription (Signup)
export const signupUser = async (
  email: string,
  username: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUser(email, username, hashedPassword);
  const token = jwt.sign(
    { id: userId, username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return { message: "User registered successfully!", token };
};

// 🔹 Connexion (Login)
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return { message: "Login successful", token };
};

// 🔹 Voir les utilisateurs (Browse - Admin uniquement)
export const browseUsers = async () => {
  return await getAllUsers();
};

// 🔹 Voir son profil (Read)
export const getUserProfile = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};

// 🔹 Modifier son profil (Edit)
export const editUserProfile = async (userId: number, username: string) => {
  await updateUser(userId, username);
  return { message: "Profile updated successfully!" };
};

// 🔹 Supprimer son compte (Delete)
export const removeUser = async (userId: number) => {
  await deleteUser(userId);
  return { message: "Account deleted successfully." };
};
