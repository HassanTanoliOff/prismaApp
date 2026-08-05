import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";
import { sendResponse } from "../helpers/reqandresponse.helpers.js";

export const getAll = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (users.length == 0)
    return sendResponse(res, 404, false, "No users found.", null, null);
  return sendResponse(res, 200, true, "All users found", null, users);
};
