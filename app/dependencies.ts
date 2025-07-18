import {IRecipeRepository} from "./repository/irecipe_repository.ts";
import {RecipeRepository} from "./repository/recipe_repository.ts";
import {IRecipeService} from "./service/irecipe_service.ts";
import {RecipeService} from "./service/recipe_service.ts";
import {IIngredientService} from "./service/iingredient_service.ts";
import {IngredientService} from "./service/ingredient_service.ts";
import {IIngredientRepository} from "./repository/iingredient_repository.ts";
import { IngredientRepository } from "./repository/ingredient_repository.ts";
import { IMethodService } from "./service/imethod_service.ts";
import { MethodService } from "./service/method_service.ts";
import { IMethodRepository } from "./repository/imethod_repository.ts";
import { MethodRepository } from "./repository/method_repository.ts";




import * as RecipeSchema from "./model/recipe.ts";
import * as IngredientSchema from "./model/ingredient.ts";
import * as MethodSchema from "./model/method.ts";

import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export async function* get_db() {
    const client = new Client({
        connectionString: Deno.env.get("DATABASE_URL")!
    });
    await client.connect();
    const db = drizzle(client, { schema: { ...RecipeSchema, ...IngredientSchema, ...MethodSchema } });
    try {
        yield db;
    } finally {
        await client.end();
    }
}

export async function get_recipe_repository(): Promise<IRecipeRepository> {
    const dbGenerator = get_db();
    const { value: db } = await dbGenerator.next();
    if (!db) {
        throw new Error("Failed to initialize database connection");
    }
    return new RecipeRepository(db);
}


export async function get_recipe_service(): Promise<IRecipeService> {
    const recipeRepository = await get_recipe_repository();
    return new RecipeService(recipeRepository);
}

export async function get_ingredient_repository(): Promise<IIngredientRepository> {
    const dbGenerator = get_db();
    const { value: db } = await dbGenerator.next();
    if (!db) {
        throw new Error("Failed to initialize database connection");
    }
    return new IngredientRepository(db);
}


export async function get_ingredient_service(): Promise<IIngredientService> {
    const ingredientRepository = await get_ingredient_repository();
    return new IngredientService(ingredientRepository);
}

export async function get_method_repository(): Promise<IMethodRepository> {
    const dbGenerator = get_db();
    const { value: db } = await dbGenerator.next();
    if (!db) {
        throw new Error("Failed to initialize database connection");
    }
    return new MethodRepository(db);
}

export async function get_method_service(): Promise<IMethodService> {
    const methodRepository = await get_method_repository();
    return new MethodService(methodRepository);
}