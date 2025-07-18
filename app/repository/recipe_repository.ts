import {IRecipeRepository} from "./irecipe_repository.ts";
import  { Recipe, RecipeType } from "../model/recipe.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, not, sql } from 'drizzle-orm';
import { RecipeCreateDTO, RecipeDTO } from "../dto/recipe_dto.ts";
import { MethodRepository } from "./method_repository.ts";
import { IngredientRepository } from "./ingredient_repository.ts";
export class RecipeRepository implements IRecipeRepository
{
    db: NodePgDatabase<{ Recipe: typeof Recipe }>;
    constructor(db: NodePgDatabase<{ Recipe: typeof Recipe }>) {
        // The db parameter is already a drizzle instance from dependencies.ts
        this.db = db;
    }

    async create(recipe: RecipeCreateDTO): Promise<RecipeType> {
        const recipe_table = {
            title: recipe.title,
            description: recipe.description,
            image_url: recipe.image_url ?? "",
        }
        const new_recipe = await this.db.insert(Recipe).values(recipe_table).returning();
        if (new_recipe.length === 0) {
            throw new Error("Failed to create recipe");
        }
        else{
            console.log("Recipe created successfully:", new_recipe[0]);
            new_recipe[0].id = Number(new_recipe[0].id); // Ensure id is a number
            console.log("Recipe ID:", new_recipe[0].id);
            // Create a new MethodRepository instance
            const methodRepo = new MethodRepository(this.db);
            // Create methods for the recipe
            for (const method of recipe.method) {
                const methodData = {
                    step: method.step,
                    step_number: method.step_number,
                    recipe_id: new_recipe[0].id, // Use the newly created recipe ID
                };
                console.log("Creating method:", methodData);
                await methodRepo.create(methodData); // Create each method
            }
            console.log("All methods created for recipe ID:", new_recipe[0].id);
            // Create a new IngredientRepository instance
            const ingredientRepo = new IngredientRepository(this.db);
            // Create ingredients for the recipe
            console.log("Creating ingredients for recipe ID:", new_recipe[0].id);
            console.log("Recipe ingredients:", recipe.ingredients);
            if (!recipe.ingredients || recipe.ingredients.length === 0) {
                console.warn("No ingredients provided for recipe ID:", new_recipe[0].id);
            }
            console.log("Recipe ingredients length:", recipe.ingredients.length);
            console.log("Recipe ingredients data:", recipe.ingredients);
            if (!Array.isArray(recipe.ingredients)) {
                throw new Error("Ingredients should be an array");
            }   
            for (const ingredient of recipe.ingredients) {
                const ingredientData = {
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit || "",
                    recipe_id: new_recipe[0].id, // Use the newly created recipe ID
                };
                console.log("Creating ingredient:", ingredientData);
                await ingredientRepo.create(ingredientData); // Create each ingredient
            }
            console.log("All ingredients created for recipe ID:", new_recipe[0].id);

        }
 

        return new_recipe[0]; // Return the created recipe
    }

    async get(id: number): Promise<RecipeDTO | null> {
        const recipe = await this.db.select().from(Recipe).where(eq(Recipe.id,id)).limit(1);
        if (recipe.length === 0) {
            console.warn(`Recipe with ID ${id} not found`);
            return null; // Recipe not found
        }
        else{
            console.log(`Recipe with ID ${id} fetched successfully:`, recipe[0]);
            const methodRepo = new MethodRepository(this.db);
            const ingredientRepo = new IngredientRepository(this.db);
            // Fetch methods for the recipe
            const methods = await methodRepo.get_all_methods_by_recipe_id(id);
            console.log(`Methods for recipe ID ${id} fetched successfully:`, methods);
            const ingredients = await ingredientRepo.get_all_ingredients_by_recipe_id(id);
            console.log(`Ingredients for recipe ID ${id} fetched successfully:`, ingredients);
            const composed_recipe: RecipeDTO = {
                ...recipe[0],
                method: methods.map(method => ({
                    id: method.id,
                    recipe_id: method.recipe_id,
                    step: method.step,
                    step_number: method.step_number,
                })),
                ingredients: ingredients.map(ingredient => ({
                    id: ingredient.id,
                    recipe_id: ingredient.recipe_id,
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                })),
            };

            return composed_recipe; // Return the recipe with methods and ingredients
        }

    }

    async get_all(): Promise<RecipeDTO[]> {
        console.log("Fetching all recipes");
        // console.log("Database connection:", this.db);

        const recipes = await this.db.select().from(Recipe)
        const completed_recipes : RecipeDTO[] = [];
        for (const recipe of recipes) {
            console.log(`Recipe ID: ${recipe.id}, Title: ${recipe.title}`);
            const methodRepo = new MethodRepository(this.db);
            const ingredientRepo = new IngredientRepository(this.db);
            // Fetch methods for the recipe
            const methods = await methodRepo.get_all_methods_by_recipe_id(recipe.id);
            console.log(`Methods for recipe ID ${recipe.id} fetched successfully:`, methods);
            const ingredients = await ingredientRepo.get_all_ingredients_by_recipe_id(recipe.id);
            console.log(`Ingredients for recipe ID ${recipe.id} fetched successfully:`, ingredients);
            completed_recipes.push({
                ...recipe,
                method: methods.map(method => ({
                    id: method.id,
                    recipe_id: method.recipe_id,
                    step: method.step,
                    step_number: method.step_number,
                })),
                ingredients: ingredients.map(ingredient => ({
                    id: ingredient.id,
                    recipe_id: ingredient.recipe_id,
                    name: ingredient.name, 
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                })),
            });
        }
        return completed_recipes;
    }

    async get_all_recipes_card(): Promise<RecipeType[]> {
        console.log("Fetching all recipes");
        const recipes = await this.db.select().from(Recipe)

        console.log("Recipes fetched:", recipes.length);
        console.log(recipes)
        return recipes;

    }

    async update(recipe : RecipeDTO): Promise<number | null> {
        const existingRecipe = await this.get(recipe.id);
        if (!existingRecipe) {
            console.log("Recipe not found");
            return null;
        }
        const updatedRecipe = {
            title: recipe.title,
            description: recipe.description,
            image_url: recipe.image_url
        };
        await this.db.update(Recipe).set(updatedRecipe).where(eq(Recipe.id, recipe.id));
        const methodRepo = new MethodRepository(this.db);
        const ingredientRepo = new IngredientRepository(this.db);

        recipe.method.forEach(async (step) =>{
            console.log(`Updating method for recipe ID ${recipe.id}:`, step);
            await methodRepo.update(step.id, step);
        })

        recipe.ingredients.forEach(async (ingredient) =>{
            console.log(`Updating ingredient for recipe ID ${recipe.id}:`, ingredient);
            await ingredientRepo.update(ingredient.id, ingredient);
        });
        console.log(`Recipe ID ${recipe.id} updated successfully`);

        return recipe.id;
    }

    async delete(id: number): Promise<boolean> {
        const existingRecipe = await this.get(id);
        if (!existingRecipe) {
            console.log("Recipe not found")
            return false;
        }
        await this.db.delete(Recipe).where(eq(Recipe.id, id));
        console.log(`Recipe ID ${id} deleted successfully`);
        return true;
        
    }

    // async update(id: number, recipe: Partial<Recipe>): Promise<Recipe | null> {
    //     const existingRecipe = await this.get(id);
    //     if (!existingRecipe) {
    //         return null; // Recipe not found
    //     }

    //     const updatedRecipe = { ...existingRecipe, ...recipe };
    //     await this.db.update(Recipe).set(updatedRecipe).where({ id });
    //     return updatedRecipe;
    // }

}