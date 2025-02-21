import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersRepository from "./usersRepository";

// 🔹 Inscription (Signup)
const signupUser = async (
  email: string,
  username: string,
  password: string,
) => {
  const existingUser = await usersRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email déjà utilisé.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await usersRepository.createUser(
    email,
    username,
    hashedPassword,
  );

  const token = jwt.sign(
    { id: userId, username },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" },
  );

  return {
    message: "Inscription réussie",
    token,
    user: { id: userId, username },
  };
};

// 🔹 Connexion (Login)
const loginUser = async (email: string, password: string) => {
  const user = await usersRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Email ou mot de passe invalide.");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return { message: "Connexion réussie", token, user };
};

// 🔹 Voir les utilisateurs (Browse - Admin uniquement)
const browseUsers = async () => {
  return await usersRepository.getAllUsers();
};

// 🔹 Voir son profil (Read)
const getUserProfile = async (userId: number) => {
  const user = await usersRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};

// 🔹 Modifier son profil (Edit)
const editUserProfile = async (
  userId: number,
  username?: string,
  email?: string,
  bio?: string,
  profile_picture?: string,
  website?: string,
) => {
  await usersRepository.updateUser(
    userId,
    username,
    email,
    bio,
    profile_picture,
    website,
  );
  return { message: "Profile mis à jour avec succès !" };
};
// 🔹 Supprimer son compte (Delete)
const removeUser = async (userId: number) => {
  await usersRepository.deleteUser(userId);
  return { message: "Compte supprimé avec succès." };
};

export default {
  signupUser,
  loginUser,
  browseUsers,
  getUserProfile,
  editUserProfile,
  removeUser,
};
