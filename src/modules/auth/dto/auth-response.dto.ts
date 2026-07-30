import type { AccessTokenResponse, RefreshTokenResponse } from "../../../types/jwt.types.js";
import type { UserResponseDTO } from "../../user/dto/user-response.dto.js";

export interface AuthResponseDTO {
  user: UserResponseDTO;
  accessToken: AccessTokenResponse;
  refreshToken: RefreshTokenResponse;
}
