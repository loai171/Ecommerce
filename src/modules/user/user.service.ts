import { sanitizePassword } from "../../utils/helpers.js";
import type { CreateUserDTO } from "./dto/create-user.dto.js";
import type { UpdateUserDTO } from "./dto/update-user.dto.js";
import type { UserResponseDTO } from "./dto/user-respones.dto.js";
import { userRepository } from "./user.repository.js";
import type { UserDocument } from "./user.schema.js";

export const userService = {
  async create(input: CreateUserDTO): Promise<UserResponseDTO> {
    const user: UserDocument = await userRepository.create(input);

    return sanitizePassword(user);
  },

  async getAll(): Promise<UserResponseDTO[]> {
    const users: UserDocument[] = await userRepository.list();

    return users.map(sanitizePassword);
  },

  async getById(id: string): Promise<UserResponseDTO | null> {
    const user = await userRepository.findById(id);

    return sanitizePassword(user);
  },

  async remove(id: string): Promise<UserResponseDTO | null> {
    const user = await userRepository.remove(id);

    return sanitizePassword(user);
  },

  async update(
    id: string,
    input: UpdateUserDTO,
  ): Promise<UserResponseDTO | null> {
    const user = await userRepository.update(id, input);

    return sanitizePassword(user);
  },
};
