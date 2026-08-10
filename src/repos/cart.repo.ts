import prisma from "../lib/prisma.js";
import type { CartItem } from "../generated/prisma/index.js";
export const getCartRepo = async (userId: string) => {
  const result = await prisma.cart.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              product_name: true,
              price: true,
              quantity: true,
              category: {
                select: { category_name: true },
              },
            },
          },
        },
      },
    },
  });
  return result;
};

export const addToCartRepo = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const cart = await prisma.cart.upsert({
    where: {
      user_id: userId,
    },
    update: {},
    create: {
      user_id: userId,
    },
  });

  const cartItem = prisma.cartItem.upsert({
    where: {
      cart_id_product_id: {
        cart_id: cart.id,
        product_id: productId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      cart_id: cart.id,
      product_id: productId,
      quantity: quantity,
    },
    include: {
      product: true,
    },
  });

  return cartItem;
};
