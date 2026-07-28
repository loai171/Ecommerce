import bcrypt from "bcrypt";
import { env } from "../config/env.js";

export async function hashingPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);

  return hashedPassword;
}

export async function matchPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function sanitizePassword(data: any) {
  if (!data) {
    return null;
  }

  const obj = typeof data.toObject === "function" ? data.toObject() : { ...data };

  delete obj.password;

  return obj;
}

