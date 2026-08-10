import { sendResponse } from "../helpers/reqandresponse.helpers.js";
import { addProductRepo, getAllProductsRepo } from "../repos/product.repo.js";
import type { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsRepo();
    if (products.length == 0) {
      return sendResponse(res, 404, false, "No products found");
    }
    return sendResponse(res, 200, true, "Products Found.", null, products);
  } catch (err) {
    if (err instanceof Error) {
      console.error("something went wrong :getAllPro", err.message);
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong.",
        err.message,
      );
    }
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity,category, createdBy } = req.body;
    const product = await addProductRepo({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category: Number(category),
      createdBy: String(createdBy),
    });
    if (!product) {
      return sendResponse(res, 400, false, "Failed to add Product", null, {
        name,
        description,
        price,
        quantity,
        createdBy,
      });
    }
    return sendResponse(res, 201, true, "Product added", null, product);
  } catch (err) {
    if (err instanceof Error) {
      console.error("something went wrong :addPro", err.message);
      return sendResponse(
        res,
        500,
        false,
        "Something went wrong.",
        err.message,
      );
    }
  }
};
