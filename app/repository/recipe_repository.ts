import {IRecipeRepository} from "./irecipe_repository.ts";
import  { Recipe , type RecipeItem } from "../model/recipe";
import { drizzle } from 'drizzle-orm/node-postgres';


export class RecipeRepository implements IRecipeRepository
{
    db: any;
    constructor(db: any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;
    }


    async create(recipe: RecipeItem): Promise<RecipeItem> {
        await this.db.insert(Recipe).values(recipe)
    }

    async get(id: number): Promise<RecipeItem | null> {
        const recipe = await this.db.select().from(Recipe).where(Recipe.id.eq(id)).limit(1);
        return recipe.length > 0 ? recipe[0] : null;
    }

    async getAll(): Promise<RecipeItem[]> {
        const recipes = await this.db.select().from(Recipe);
        return recipes;
    }

    async update(id: number, recipe: Partial<RecipeItem>): Promise<RecipeItem | null> {
        const existingRecipe = await this.get(id);
        if (!existingRecipe) {
            return null; // Recipe not found
        }

        const updatedRecipe = { ...existingRecipe, ...recipe };
        await this.db.update(Recipe).set(updatedRecipe).where(Recipe.id.eq(id));
        return updatedRecipe;
    }
}