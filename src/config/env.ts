import "dotenv/config";

const requiredEnv = ["DB_NAME", "DB_HOST", "DB_PORT", "PORT", "SALT_ROUNDS"];

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
};
