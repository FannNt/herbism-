import * as t from "drizzle-orm/pg-core";
import { user } from "./user.schema";
import { relations } from "drizzle-orm";
import { timestamps } from "./column.helper";

export const plant = t.pgTable("plant", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: t.integer().references((): t.AnyPgColumn => user.id),
  name: t.varchar({ length: 250 }).notNull(),
  kind: t.varchar({ length: 250 }).notNull(),
  ...timestamps,
});

export const plantRelationship = relations(plant, ({ one }) => ({
  user: one(user, {
    fields: [plant.userId],
    references: [user.id],
  }),
}));
