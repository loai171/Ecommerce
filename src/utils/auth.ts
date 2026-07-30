import type { Request } from "express";
import { USER_KEY } from "../constants/auth.constants.js";

export function getUserId(req: Request): string {
  return req[USER_KEY]!.id;
}
