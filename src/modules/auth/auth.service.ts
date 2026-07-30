import { sanitizePassword } from "../../utils/helpers.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { userRepository } from "../user/repository/user.repository.js";
import { LoginDTO } from "./dto/login.dto.js";
import { UserDocument } from "../user/schema/user.schema.js";
import { AccessTokenResponse } from "../../types/jwt.types.js";
import { AuthResponseDTO } from "./dto/auth-response.dto.js";

export const authService = {
  async login(input: LoginDTO): Promise<AuthResponseDTO> {
    const user: UserDocument = await userRepository.findByEmail(input.email);
    const accessToken: AccessTokenResponse = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      user: sanitizePassword(user)!,
      accessToken,
    };
  },
};
