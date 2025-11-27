import * as t from "drizzle-orm/pg-core";
import { user } from "./user.schema";
import { experienceLevelEnum, genderEnum, timestamps } from "./column.helper";
import { relations } from "drizzle-orm";

/*

Field: healthCondition, healthGoals, dan allergies akan berbentuk stringified JSON untuk
mempermudah pembentukan dan pemodelan DB. Karena ketiga field ini akan memiliki value
berupa list/array, akan sangat sulit untuk membuat struktur relationship dengan 
usecase seperti ini. Maka dari itu, stringified JSON dengan field yang bernilai TEXT adalah 
pilihan yang tepat.

*/

export const profile = t.pgTable("profiles", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: t.integer().references((): t.AnyPgColumn => user.id),
  age: t.integer().notNull(),
  gender: genderEnum().notNull(),
  region: t.varchar().notNull(),
  healthCondition: t.text().notNull(),
  healthGoals: t.text().notNull(),
  allergies: t.text().notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  ...timestamps,
});

export const profileRelation = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));
