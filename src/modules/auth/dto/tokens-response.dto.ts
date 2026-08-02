import type { AccessTokenResponse, RefreshTokenResponse } from "../../../types/jwt.types.js";

export interface TokensResponseDTO {
  accessToken: AccessTokenResponse;
  refreshToken: RefreshTokenResponse;
}
