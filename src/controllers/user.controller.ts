import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";

export const getAll = async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  if (!result)
    return res.status(404).json({
      success: false,
      message: "No users found",
      data: null,
    });

  return res.status(200).json({
    success: true,
    message: "User found.",
    data: result,
  });
};
