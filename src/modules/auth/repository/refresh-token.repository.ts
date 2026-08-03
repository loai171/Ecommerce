import RefreshToken from "../schema/refresh-token.schema.js";

export class RefreshTokenRepository {
  create = async (data: {
    user: string;
    tokenHash: string;
    expiresAt: Date;
  }) => {
    return RefreshToken.create(data);
  };

  findByTokenHash = async (tokenHash: string) => {
    return RefreshToken.findOne({
      tokenHash,
      revokedAt: null,
      expiresAt: {
        $gt: new Date(),
      },
    });
  };
  revoke = async (tokenHash: string) => {
    return RefreshToken.findOneAndUpdate(
      { tokenHash },
      {
        revokedAt: new Date(),
      },
      {
        new: true,
      },
    );
  };

  revokeAllByUser = async (userId: string) => {
    return RefreshToken.updateMany(
      {
        user: userId,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
    );
  };
}
