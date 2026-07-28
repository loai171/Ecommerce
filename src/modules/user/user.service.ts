import { CreateUserDTO } from "./dto/create-user.dto.js";
import { UpdateUserDTO } from "./dto/update-user.dto.js";
import { userRepository } from "./user.repository.js";

export const userService = {
  async create(input: CreateUserDTO) {
    const user = await userRepository.create({
      ...input,
    });

    return user;
  },
  async getAll() {
    const users = await userRepository.list();
    return users;
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    return user;
  },
  async remove(id: string) {
    const user = await userRepository.remove(id);
    return user;
  },

  async update(id: string, input: UpdateUserDTO) {
    const user = await userRepository.update(id, input);
    return user;
  },
};
