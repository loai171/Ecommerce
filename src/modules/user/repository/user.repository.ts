import type { CreateUserDTO } from "../dto/create-user.dto.js";
import type { UpdateUserDTO } from "../dto/update-user.dto.js";
import User, { type UserDocument } from "../schema/user.schema.js";

export class UserRepository {
  create = async (data: CreateUserDTO): Promise<UserDocument> => {
    const user: UserDocument = await User.create(data);
    return user;
  };

  findByEmail = async (email: string): Promise<UserDocument | null> => {
    const user: UserDocument | null = await User.findOne({ email });
    return user;
  };

  findById = async (_id: string): Promise<UserDocument | null> => {
    const user: UserDocument | null =
      await User.findById(_id).populate("addresses");
    return user;
  };

  remove = async (_id: string): Promise<UserDocument | null> => {
    const user: UserDocument | null =
      await User.findByIdAndDelete(_id).populate("addresses");
    return user;
  };

  update = async (
    _id: string,
    input: UpdateUserDTO,
  ): Promise<UserDocument | null> => {
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
  };

  list = async (): Promise<UserDocument[]> => {
    const users: UserDocument[] = await User.find({}).populate("addresses");
    return users;
  };
}
