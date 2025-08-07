
import { Method, MethodType } from "../model/method.ts";
import { UpdateMethodDTO, CreateMethodDTO } from "../dto/method_dto.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IMethodRepository } from "./imethod_repository.ts";
import { eq } from 'drizzle-orm';

export class MethodRepository implements IMethodRepository {   
    db: NodePgDatabase<{ Ingredient: typeof Method }>;

    constructor(db : any) {
        // Initialize the database connection or ORM here if needed
        this.db = db;

    }
    
    async create(method: CreateMethodDTO): Promise<MethodType> {
        const result = await this.db.insert(Method).values(method).returning();
        return result[0];
    }


    async get( id: number): Promise<MethodType | null> {
        const method = await this.db.select().from(Method).where(eq(Method.id,id)).limit(1);
        return method.length > 0 ? method[0] : null;
    }

    async get_all(): Promise<MethodType[]> {
        const methods = await this.db.select().from(Method);
        return methods
    } 

    async get_all_methods_by_recipe_id(recipe_id: number): Promise<MethodType[]> {
        const methods = await this.db.select().from(Method).where(eq(Method.recipe_id, recipe_id));
        return methods;
    }

    async update(id: number, method: UpdateMethodDTO): Promise<MethodType | null> {
        const existingMethod = await this.get(id);
        if (!existingMethod) {
            return null; // Method not found
        }
        
        // Build update data excluding the id field
        const updateData: Partial<Omit<MethodType, 'id'>> = {};
        
        if (method.step !== undefined) {
            updateData.step = method.step;
        }
        if (method.step_number !== undefined) {
            updateData.step_number = method.step_number;
        }
        
        console.log("Updating method with ID:", id, "with data:", updateData);
        const result = await this.db.update(Method).set(updateData).where(eq(Method.id, id)).returning();
        return result.length > 0 ? result[0] : null;
    }

    async delete(id: number): Promise<boolean> {
      const result = await this.db.delete(Method).where(eq(Method.id, id)).returning();
      return result.length > 0;
    }
}