import express from "express";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/:id", addToCart);
router.get("/:id", getCart);

export default router;
