import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);

export default router;
