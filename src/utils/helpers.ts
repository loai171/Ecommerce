import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import { UserDocument } from "../modules/user/user.schema.js";
import { UserResponseDTO } from "../modules/user/dto/user-response.dto.js";

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

export function sanitizePassword(user: UserDocument): UserResponseDTO;
export function sanitizePassword(user: null): null;
export function sanitizePassword(
  user: UserDocument | null,
): UserResponseDTO | null;
export function sanitizePassword(
  user: UserDocument | null,
): UserResponseDTO | null {
  if (!user) {
    return null;
  }

  const obj = user.toObject();
  const { password, _id, ...safeUser } = obj;

  return {
    _id: _id.toString(),
    ...safeUser,
  };
}
