import "dotenv/config";

const requiredEnv = [
  "DB_NAME",
  "DB_HOST",
  "DB_PORT",
  "PORT",
  "SALT_ROUNDS",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  PORT: Number(process.env?.["PORT"]) || 3000,

  DB_NAME: process.env?.["DB_NAME"]!,

  DB_HOST: process.env?.["DB_HOST"]!,

  DB_PORT: Number(process.env?.["DB_PORT"]),

  SALT_ROUNDS: Number(process.env?.["SALT_ROUNDS"]) || 10,

  JWT_SECRET: process.env?.["JWT_SECRET"]!,

  JWT_EXPIRES_IN: process.env?.["JWT_EXPIRES_IN"]!,

  JWT_REFRESH_SECRET: process.env?.["JWT_REFRESH_SECRET"]!,

  JWT_REFRESH_EXPIRES_IN: process.env?.["JWT_REFRESH_EXPIRES_IN"]!,
};
