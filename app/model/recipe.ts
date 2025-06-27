import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const Recipe = pgTable("Recipes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  image_url: varchar({ length: 255 }).notNull(),
});
