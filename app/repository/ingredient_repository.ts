import { Ingredient, IngredientType } from "../model/ingredient.ts";
import { CreateIngredientDTO, UpdateIngredientDTO } from "../dto/ingredient_dto.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IIngredientRepository } from "./iingredient_repository.ts";
import { eq } from 'drizzle-orm';



export class IngredientRepository implements IIngredientRepository {   
    db: NodePgDatabase<{ Ingredient: typeof Ingredient }>;

    constructor(db : any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;

    }
    
    async create(ingredient: CreateIngredientDTO): Promise<IngredientType> {
        // Insert the ingredient data without the id field (auto-generated)
        const ingredientData = {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit as IngredientType["unit"],
            recipe_id: ingredient.recipe_id
        };
        const result = await this.db.insert(Ingredient).values(ingredientData).returning();
        return result[0];
    }

    async get( id: number): Promise<IngredientType | null> {
        const ingredient = await this.db.select().from(Ingredient).where(eq(Ingredient.id,id)).limit(1);
        return ingredient.length > 0 ? ingredient[0] : null;
    }

    async get_all(): Promise<IngredientType[]> {
        const ingredients = await this.db.select().from(Ingredient);
        return ingredients;
    }  

    async get_all_ingredients_by_recipe_id(recipe_id: number): Promise<IngredientType[]> {
        const ingredients = await this.db.select().from(Ingredient).where(eq(Ingredient.recipe_id, recipe_id));
        return ingredients;
    }


    async update(id: number, ingredient: UpdateIngredientDTO): Promise<IngredientType | null> {
        const existingIngredient = await this.get(id);
        if (!existingIngredient) {
            return null; // Ingredient not found
        }
        
        // Build update data excluding the id field
        const updateData: Partial<Omit<IngredientType, 'id'>> = {};
        
        if (ingredient.name !== undefined) {
            updateData.name = ingredient.name;
        }
        if (ingredient.quantity !== undefined) {
            updateData.quantity = ingredient.quantity;
        }
        if (ingredient.unit !== undefined) {
            updateData.unit = ingredient.unit as IngredientType["unit"];
        }
        
        console.log("Updating ingredient with ID:", id, "with data:", updateData);
        const result = await this.db.update(Ingredient).set(updateData).where(eq(Ingredient.id, id)).returning();
        return result[0] ?? null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.db.delete(Ingredient).where(eq(Ingredient.id, id)).returning();
        return result.length > 0;
    }
}