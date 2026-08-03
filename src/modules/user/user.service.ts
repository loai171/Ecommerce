import { sanitizePassword } from "../../utils/helpers.js";
import type { CreateAddressDto } from "./dto/create-assress.dto.js";
import type { CreateUserDTO } from "./dto/create-user.dto.js";
import type { UpdateUserDTO } from "./dto/update-user.dto.js";
import type { UserResponseDTO } from "./dto/user-response.dto.js";
import type { UserDocument } from "./schema/user.schema.js";
import { UserRepository } from "./repository/user.repository.js";
import { AddressRepository } from "./repository/address.repository.js";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  create = async (input: CreateUserDTO): Promise<UserResponseDTO | null> => {
    const user: UserDocument = await this.userRepository.create(input);

    return sanitizePassword(user);
  };

  getAll = async (): Promise<UserResponseDTO[]> => {
    const users: UserDocument[] = await this.userRepository.list();

    return users
      .map((user) => sanitizePassword(user))
      .filter((user): user is UserResponseDTO => user !== null);
  };

  getById = async (id: string): Promise<UserResponseDTO | null> => {
    const user = await this.userRepository.findById(id);

    return sanitizePassword(user);
  };

  remove = async (id: string): Promise<UserResponseDTO | null> => {
    const user = await this.userRepository.remove(id);

    return sanitizePassword(user);
  };

  update = async (
    id: string,
    input: UpdateUserDTO,
  ): Promise<UserResponseDTO | null> => {
    const user = await this.userRepository.update(id, input);

    return sanitizePassword(user);
  };

  //  Address Service

  createAddress = async (
    userId: string,
    input: CreateAddressDto,
  ): Promise<UserResponseDTO | null> => {
    await this.addressRepository.create(userId, input);

    const user = await this.userRepository.findById(userId);
    return sanitizePassword(user);
  };
}
