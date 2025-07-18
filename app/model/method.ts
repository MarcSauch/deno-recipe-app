import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { Recipe } from "./recipe.ts";

export const Method = pgTable("Methods", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  step_number: integer().notNull(),
  step: varchar({ length: 255 }).notNull(),
  recipe_id: integer().notNull().references(() => Recipe.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
});


export type MethodType = typeof Method.$inferSelect;