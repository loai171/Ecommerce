import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import type { UserDocument } from "../modules/user/schema/user.schema.js";
import type { UserResponseDTO } from "../modules/user/dto/user-response.dto.js";

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

export function sanitizePassword(
  user: UserDocument | null,
): UserResponseDTO | null {
  if (!user) {
    return null;
  }

  const { password, __v, _id, ...safeUser } = user.toObject();

  return {
    _id: _id.toString(),
    ...safeUser,
  };
}

