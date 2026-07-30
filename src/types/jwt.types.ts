export interface JwtUserPayload {
  id: string;
  email: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}
