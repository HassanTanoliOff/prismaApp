import prisma from "../lib/prisma.js";
import { type UserInput, type UserUpdate } from "../types/user.type.js";

export const getAllUserRepo = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const getUserByIdRepo = async (id: number) => {
  const result = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

export const addUserRepo = async (user: UserInput) => {
  const result = await prisma.user.create({
    data: {
      user_name: user.user_name,
      email: user.email,
    },
  });
  return result;
};

export const updateUserRepo = async (user: UserUpdate) => {
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      user_name: user.user_name,
      email: user.email,
      role: user.role,
    },
  });

  return result;
};

export const deleteUserRepo = async (userId: number) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return result;
};
