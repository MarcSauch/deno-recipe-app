import { Recipe , RecipeType} from "../model/recipe.ts";
import {RecipeCreateDTO, RecipeDTO, RecipeCardDTO} from "../dto/recipe_dto.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";


export class IRecipeRepository {   
    db: NodePgDatabase<{ Recipe: typeof Recipe }>;

    constructor(db : any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;

    }
    async create(recipe: RecipeCreateDTO): Promise<RecipeCardDTO> {
        throw new Error("Method not implemented.");
    }

    async get( id: number): Promise<RecipeDTO | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<RecipeDTO[]> {
        throw new Error("Method not implemented.");
    }  

    async get_all_recipes_card(): Promise<RecipeType[]> {
        throw new Error("Method not implemented.");
    }
    async update(recipe: RecipeDTO): Promise<number | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}