import prisma from "../lib/prisma.js";
import {
  type UserInput,
  type UserUpdate,
} from "../types/user.type.js";

export const getAllUserRepo = async () => {
  const result = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { id: "asc" },
  });
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
export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email, role: "USER" } });
};
export const findById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id, role: "USER" } });
};
export const createUserRepo = async (data: UserInput) => {
  const result = await prisma.user.create({
    data: {
      user_name: data.name,
      email: data.email,
    },
    select: { id: true, user_name: true, email: true, role: true },
  });
  return result;
};

export const updateUserRepo = async (user: UserUpdate) => {
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      user_name: user.name,
      email: user.email,
      role: user.role,
    },
    select: { user_name: true, email: true ,role:true},
  });

  return result;
};

export const deleteUserRepo = async (userId: number) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
      role: "USER",
    },
  });
  return result;
};
