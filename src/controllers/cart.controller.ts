import type { Request, Response } from "express";
import { sendResponse } from "../helpers/reqandresponse.helpers.js";
import { addToCartRepo, getCartRepo } from "../repos/cart.repo.js";

export async function addToCart(req: Request, res: Response) {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  const cart = await addToCartRepo(String(id), productId, Number(quantity));

  if (!cart) {
    return sendResponse(res, 400, false, "Failed to add to card.");
  }

  return sendResponse(res, 200, true, "Item(s) added to cart.", null, cart);
}

export async function getCart(req: Request, res: Response) {
  const userId = String(req.params.id);
  const cart = await getCartRepo(userId);
  if (!cart) {
    return sendResponse(res, 404, false, "No items in Cart.");
  }
  return sendResponse(res, 200, true, "Cart get success.", null, cart);
}
