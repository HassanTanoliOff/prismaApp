import express from "express";
import prisma from "../lib/prisma.js";
import { getAll } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
