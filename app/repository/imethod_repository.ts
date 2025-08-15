
import { Method, MethodType } from "../model/method.ts";
import { UpdateMethodDTO, CreateMethodDTO } from "../dto/method_dto.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";


export class IMethodRepository {   
    // db: NodePgDatabase<{ Ingredient: typeof Method }>;

    // constructor(db : any) {
    //     // Initialize the database connection or ORM here if needed
    //     this.db = db;

    // }
    async create(method: CreateMethodDTO): Promise<MethodType> {
        throw new Error("Method not implemented.");
    }


    async get( id: number): Promise<MethodType | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<MethodType[]> {
        throw new Error("Method not implemented.");
    } 

    async get_all_methods_by_recipe_id(recipe_id: number): Promise<MethodType[]> {
        throw new Error("Method not implemented.");
    }
    
    async update(method: UpdateMethodDTO): Promise<MethodType | null> {
        throw new Error("Method not implemented.");
    }

    async update_multiple(methods: UpdateMethodDTO[]): Promise<MethodType[] | null>{
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}