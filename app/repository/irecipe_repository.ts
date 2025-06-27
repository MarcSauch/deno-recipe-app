import type { Recipe } from "../model/recipe";


export class IRecipeRepository {   
    db: any; // Replace 'any' with your database type or ORM instance

    constructor(db : any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;

    }
    async create(recipe: Recipe): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }

    async get( id: number): Promise<Recipe | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }  
    async update(id: number, recipe: Partial<Recipe>): Promise<Recipe | null> {
        throw new Error("Method not implemented.");
    }
}