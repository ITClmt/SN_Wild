import type { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usersRepository from "../users/usersRepository";

interface AuthResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

const createAuthResponse = (
  res: Response,
  userId: number,
  username: string,
): AuthResponse => {
  const token = jwt.sign(
    { id: userId, username },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" },
  );

  // Set HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return {
    message: "Authentication successful",
    user: { id: userId, username },
  };
};

const loginUser = async (email: string, password: string, res: Response) => {
  const user = await usersRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid credentials");
  }

  return createAuthResponse(res, user.id, user.username);
};

const signupUser = async (
  email: string,
  username: string,
  password: string,
  res: Response,
) => {
  const existingUser = await usersRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await usersRepository.createUser(
    email,
    username,
    hashedPassword,
  );

  return createAuthResponse(res, userId, username);
};

const logoutUser = (res: Response) => {
  res.clearCookie("token");
  return { message: "Logged out successfully" };
};
