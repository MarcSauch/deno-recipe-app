
import { IngredientDTO, CreateIngredientDTO, UpdateIngredientDTO } from "../dto/ingredient_dto.ts";


export class IIngredientService {
    async create(ingredient: CreateIngredientDTO): Promise<IngredientDTO> {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<IngredientDTO | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<IngredientDTO[]>{
        console.log("Method not implemented.");
        throw new Error("Method not implemented.");
    }

    async update(id: number, ingredient: UpdateIngredientDTO): Promise<IngredientDTO | null> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}