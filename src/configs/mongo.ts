import { registerAs } from "@nestjs/config";

export const config = registerAs("mongo", () => ({
  uri: process.env.MONGO_DB,
}));
