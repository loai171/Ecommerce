export interface JwtUserPayload {
  id: string;
  email: string;
}

export type AccessTokenResponse = string;

export interface RefreshTokenPayload {
  id: string;
}

export type RefreshTokenResponse = string;
