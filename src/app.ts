import express, { type Request, type Response } from "express";
import prisma from "./lib/prisma.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
const app = express();

app.use(express.json());

app.get("/api/health", async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - startTime;

    return res.status(200).json({
      status: "UP",
      timestamp: new Date().toISOString(),
      database: "CONNECTED",
      latency: `${responseTime}ms`,
      uptime: `${process.uptime().toFixed(2)}s`,
    });
  } catch (err) {
    console.error("Health check database failure:", err);

    return res.status(503).json({
      status: "DOWN",
      timestamp: new Date().toISOString(),
      database: "DISCONNECTED",
      error: "Database connection failed",
    });
  }
});
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
export default app;
