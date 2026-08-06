import type { Role } from "../generated/prisma/enums.js";
import { type User as PrismaUser } from "../generated/prisma/client.js";
import { type Request } from "express";

export type UserInput = {
  name: string;
  email: string;
};
export type UserUpdate = {
  id: number;
  name?: string;
  email?: string;
  role?: Role;
};

export interface ApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  error?: string | null;
  data?: T | null;
}

export type User = PrismaUser;
// in case we don't want to show password
export type SafeUser = Omit<PrismaUser, "password">;

export interface CreateUserBody {
  name: string;
  email: string;
}

export interface UserParams {
  id: number;
}

export type CreateUserRequest = Request<{}, {}, CreateUserBody>;

export type GetUserRequest = Request<UserParams>;
