import type { Role } from "../generated/prisma/enums.js";

export type UserInput = {
  user_name: string;
  email: string;
};
export type UserUpdate = {
  id: number;
  user_name?: string;
  email?: string;
  role?: Role;
};

// export type User<T>={
//       id: number
//       user_name :string
//       email : string

// }