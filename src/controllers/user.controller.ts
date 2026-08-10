import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";
import { sendResponse } from "../helpers/reqandresponse.helpers.js";
import type { CreateUserRequest } from "../types/user.type.js";
import {
  createUserRepo,
  deleteUserRepo,
  findByEmail,
  findById,
  getAllUserRepo,
  updateUserRepo,
} from "../repos/user.repo.js";
import { isTypedArray } from "node:util/types";

export const getAll = async (req: Request, res: Response) => {
  const users = await getAllUserRepo();
  if (users.length == 0) {
    return sendResponse(res, 404, false, "No users found.");
  }
  return sendResponse(res, 200, true, "All users found", null, users);
};

export const createUser = async (req: CreateUserRequest, res: Response) => {
  try {
    const { name, email } = req.body;
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return sendResponse(res, 400, false, "Failed to create user.");
    }
    const newUser = await createUserRepo({ name, email });
    if (!newUser) {
      return sendResponse(res, 400, false, "Failed to create user.");
    }
    return sendResponse(res, 201, true, "User created.", null, newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("something went wrong:Create-user:error", err.message);
    } else {
      console.error("An Unexpected error occurred:", String(err));
    }
    return sendResponse(
      res,
      500,
      false,
      "Something went wrong",
      err instanceof Error ? err.message : "Unexpected Error",
      null,
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const { id } = req.params;

    const existingUser = await findById(String(id));
    if (!existingUser) {
      return sendResponse(res, 404, false, "user not found");
    }

    const updatedUser = await updateUserRepo({
      id: String(id),
      name,
      email,
      role,
    });
    if (!updatedUser) {
      return sendResponse(res, 400, false, "Failed to Update.");
    }
    return sendResponse(res, 200, true, "Updated user", null, updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      console.error("something went wrong.", err.message);
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong",
        err.message,
        null,
      );
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingUser = await findById(String(id));
    if (!existingUser)
      return sendResponse(res, 404, false, "User does not exists");

    const deletedUser = await deleteUserRepo(String(id));
    if (!deletedUser) {
      return sendResponse(res, 400, false, "Failed to delete user.");
    }
    return sendResponse(res, 200, true, "User deleted.");
  } catch (err) {
    if (err instanceof Error) {
      console.error("something went wrong", err.message);
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong",
        err.message,
        null,
      );
    }
  }
};
