import { sanitizePassword } from "../../utils/helpers.js";
import { CreateUserDTO } from "./dto/create-user.dto.js";
import { UpdateUserDTO } from "./dto/update-user.dto.js";
import User from "./user.schema.js";

export const userRepository = {
  async create(data: CreateUserDTO) {
    const user = await User.create(data);
    return sanitizePassword(user);
  },
  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  },
  async findByEmailWithPassword(email: string) {
    const user = await User.findOne({ email }).select("+password");
    return user;
  },
  async findById(_id: string) {
    const user = await User.findOne({ _id });
    return user;
  },
  async findByIdWithPassword(_id: string) {
    const user = await User.findOne({ _id }).select("+password");
    return user;
  },
  async remove(_id: string) {
    const user = await User.deleteOne({ _id });
    return user;
  },
  async update(_id: string, input: UpdateUserDTO) {
    const user = await this.findByIdWithPassword(_id);
    const { oldPassword, newPassword, confirmPassword, ...rest } = input;
    rest["password"] = newPassword || user.password;

    Object.assign(user, rest);

    await user.save();

    return sanitizePassword(user);
  },
  async list() {
    const users = await User.find({});
    return users;
  },
};
