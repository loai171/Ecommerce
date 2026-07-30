import RefreshToken from "../schema/refresh-token.schema.js";

export const refreshTokenRepository = {
  async create(data: { user: string; tokenHash: string; expiresAt: Date }) {
    return RefreshToken.create(data);
  },

  async findByTokenHash(tokenHash: string) {
    return RefreshToken.findOne({
      tokenHash,
      revokedAt: null,
      expiresAt: {
        $gt: new Date(),
      },
    });
  },
  async revoke(id: string) {
    return RefreshToken.findByIdAndUpdate(id, {
      revokedAt: new Date(),
    });
  },

  async revokeAllByUser(userId: string) {
    return RefreshToken.updateMany(
      {
        user: userId,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
    );
  },
};
