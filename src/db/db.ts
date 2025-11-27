import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import * as userSchema from "./schema/user.schema";
import * as profileSchema from "./schema/profile.schema";
import * as plantSchema from "./schema/plant.schema";
import * as columnHelper from "./schema/column.helper";

config({
  path: "./.env",
});

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
  schema: {
    ...userSchema,
    ...profileSchema,
    ...plantSchema,
    ...columnHelper,
  },
});
