import { type Product as PrismaProduct } from "../generated/prisma/client.js";

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  createdBy: number;
}
