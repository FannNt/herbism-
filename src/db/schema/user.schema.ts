import * as t from "drizzle-orm/pg-core";
import { roleEnum, timestamps } from "./column.helper";
import { Many, relations } from "drizzle-orm";
import { profile } from "./profile.schema";
import { plant } from "./plant.schema";

export const user = t.pgTable(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    username: t.varchar({ length: 250 }).notNull(),
    name: t.varchar({ length: 250 }).notNull(),
    email: t.varchar({ length: 250 }).notNull(),
    role: roleEnum().default("user"),
    city: t.varchar({ length: 250 }).notNull(),
    password: t.varchar({ length: 250 }).notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)]
);

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile),
  plants: many(plant),
}));
