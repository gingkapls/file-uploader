import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: "../.env" });

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
