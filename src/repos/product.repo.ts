import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";
import type { ProductInput } from "../types/product.type.js";

export const getAllProductsRepo = async () => {
  const result = await prisma.product.findMany();
  return result;
};

export const addProductRepo = async (product: ProductInput) => {
  const result = await prisma.product.create({
    data: {
      product_name: product.name,
      product_description: product.description,
      price: product.price,
      category_id: product.category,
      quantity: product.quantity,
      created_by_id: product.createdBy,
    },
    omit: { id: true },
  });
  return result;
};
