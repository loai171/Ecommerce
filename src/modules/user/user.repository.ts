import { CreateUserDTO } from "./dto/create-user.dto.js";
import User from "./user.schema.js";

export const userRepository = {
  async create(data: CreateUserDTO) {
    const user = await User.create(data);
    return user;
  },
  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  },
};
