import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./model/recipe.ts", "./model/ingredient.ts", "./model/method.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL")!,
  },
});


// run Command:  deno run --node-modules-dir npm:drizzle-kit push 