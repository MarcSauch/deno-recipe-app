import { Ingredient, IngredientType } from "../model/ingredient.ts";
import { CreateIngredientDTO , UpdateIngredientDTO} from "../dto/ingredient_dto.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";


export class IIngredientRepository {   
    db: NodePgDatabase<{ Ingredient: typeof Ingredient }>;

    constructor(db : any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;

    }
    async create(ingredient: CreateIngredientDTO): Promise<IngredientType> {
        throw new Error("Method not implemented.");
    }


    async get( id: number): Promise<IngredientType | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<IngredientType[]> {
        throw new Error("Method not implemented.");
    }  

    get_all_ingredients_by_recipe_id(recipe_id: number): Promise<IngredientType[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: number, ingredient: UpdateIngredientDTO): Promise<IngredientType | null> {
        throw new Error("Method not implemented.");
    }
}