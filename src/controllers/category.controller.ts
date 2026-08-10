import { addCategoryRepo, getCategoryRepo } from "../repos/category.repo.js";
import type { Request, Response } from "express";
import { sendResponse } from "../helpers/reqandresponse.helpers.js";

export const getCategory = async (req: Request, res: Response) => {
  const cat = await getCategoryRepo();
  if (!cat) return sendResponse(res, 400, false, "User Input might be wrong.");

  return sendResponse(res, 200, true, "Categories get.", null, cat);
};

export const addCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  const cat = await addCategoryRepo(categoryName);
  if (!cat) return sendResponse(res, 400, false, "Failed to add category");
  return sendResponse(res, 200, true, "Category added.", null, cat);
};
