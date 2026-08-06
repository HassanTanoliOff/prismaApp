import express from "express";
import {
  createUser,
  deleteUser,
  getAll,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
