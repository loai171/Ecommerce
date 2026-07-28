import type { CreateUserDTO } from "../dto/create-user.dto.js";
import type { UpdateUserDTO } from "../dto/update-user.dto.js";
import User, { type UserDocument } from "../schema/user.schema.js";

export const userRepository = {
  async create(data: CreateUserDTO): Promise<UserDocument> {
    const user: UserDocument = await User.create(data);
    return user;
  },

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user: UserDocument | null = await User.findOne({ email });
    return user;
  },

  async findById(_id: string): Promise<UserDocument | null> {
    const user: UserDocument | null =
      await User.findById(_id).populate("addresses");
    return user;
  },

  async remove(_id: string): Promise<UserDocument | null> {
    const user: UserDocument | null =
      await User.findByIdAndDelete(_id).populate("addresses");
    return user;
  },

  async update(
    _id: string,
    input: UpdateUserDTO,
  ): Promise<UserDocument | null> {
    const user: UserDocument | null = await this.findById(_id);
    if (!user) {
      return null;
    }

    const { oldPassword, newPassword, confirmPassword, ...rest } = input;

    Object.assign(user, rest);

    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    return this.findById(_id);
  },

  async list(): Promise<UserDocument[]> {
    const users: UserDocument[] = await User.find({}).populate("addresses");
    return users;
  },
};
