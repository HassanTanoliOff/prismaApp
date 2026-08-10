import prisma from "../lib/prisma.js";

export const addCategoryRepo = async (categoryName: string) => {
  return await prisma.category.upsert({
    where: {
      category_name: categoryName,
    },
    update: {},
    create: {
      category_name: categoryName,
    },
  });
};

export const getCategoryRepo = async () => {
  return await prisma.category.findMany({});
};
