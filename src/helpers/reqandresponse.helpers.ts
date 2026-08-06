import { type Response } from "express";
import { type ApiResponse } from "../types/user.type.js";

export function sendResponse<T>(
  res: Response,
  status: number,
  success: boolean,
  message: string,
  error?: String | null,
  data?: T | null,
): Response<ApiResponse<T>> {
  return res.status(status).json({
    success,
    message,
    error: error ?? null,
    data: data ?? null,
  });
}



// export interface ApiResponseFormat<T = unknown> {
//   success: boolean;
//   message: string;
//   error?: string | null;
//   data?: T | null;
// }

// export const sendResponse = <T>(
//   res: Response<ApiResponseFormat<T>>,
//   status: number,
//   success: boolean,
//   message: string,
//   error?: string | null,
//   data?: T | null,
// ) => {
//   const payload: ApiResponseFormat<T> = {
//     success,
//     message,
//     error,
//     data,
//   };

//   return res.status(status).json(payload);
// };
