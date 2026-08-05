import { type Response } from "express";
export interface ApiResponseFormat<T = unknown> {
  success: boolean;
  message: string;
  error: unknown;
  data: T;
}

export const sendResponse = <T>(
  res: Response<ApiResponseFormat<T>>,
  status: number,
  success: boolean,
  message: string,
  error: unknown = null,
  data: T = null as T,
) => {
  const payload: ApiResponseFormat<T> = {
    success,
    message,
    error,
    data,
  };

  return res.status(status).json(payload);
};
