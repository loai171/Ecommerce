import { sanitizePassword } from "../../utils/helpers.js";
import type { CreateAddressDto } from "./dto/create-assress.dto.js";
import type { CreateUserDTO } from "./dto/create-user.dto.js";
import type { UpdateUserDTO } from "./dto/update-user.dto.js";
import type { UserResponseDTO } from "./dto/user-response.dto.js";
import { addressRepository } from "./repository/address.repository.js";
import { userRepository } from "./repository/user.repository.js";
import type { UserDocument } from "./schema/user.schema.js";

export const userService = {
  async create(input: CreateUserDTO): Promise<UserResponseDTO | null> {
    const user: UserDocument = await userRepository.create(input);

    return sanitizePassword(user);
  },

  async getAll(): Promise<UserResponseDTO[]> {
    const users: UserDocument[] = await userRepository.list();

    return users
      .map((user) => sanitizePassword(user))
      .filter((user): user is UserResponseDTO => user !== null);
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

  //  Address Service 

  async createAddress(
    userId: string,
    input: CreateAddressDto,
  ): Promise<UserResponseDTO | null> {
    await addressRepository.create(userId, input);

    const user = await userRepository.findById(userId);
    return sanitizePassword(user);
  },
};
