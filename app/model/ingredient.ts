import { pgEnum, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { Recipe } from "./recipe.ts";

export const unitEnum = pgEnum("Unit", [
  "grams",
  "kilograms",
  "milliliters",
  "liters",
  "teaspoons",
  "tablespoons",
  "cups",
  "ounces",
  "pounds",
  "pieces",
  "pinches",
  "bunches",
  "slices",
  "cloves",
  "stalks",
  "sprigs",
  "heads",
  "cans",
  "jars",
  "",
]);

export const Ingredient = pgTable("Ingredients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  quantity: varchar({ length: 255 }).notNull(),
  unit: unitEnum().notNull().default(""),
  recipe_id: integer().notNull().references(() => Recipe.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
});
