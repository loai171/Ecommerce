import { env } from "../../config/env.js";
import { AppError } from "../../utils/AppError.js";
import { CreateUserDTO } from "./dto/create-user.dto.js";
import { userRepository } from "./user.repository.js";
import bcrypt from "bcrypt";

export const userService = {
  async create(input: CreateUserDTO) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw AppError.conflict(`User with email ${input.email} already exists`);
    }

    const hashedPassword = await this.hashingPassword(input.password);
    const user = await userRepository.create({ ...input, password: hashedPassword });
    
    return user;
  },

  async hashingPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);
    return hashedPassword;
  },
};
