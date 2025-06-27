
import { RecipeDTO, RecipeCreateDTO ,RecipeUpdateDTO } from "../dto/recipe_dto.ts";

export class IRecipeService {
    async create(recipe: RecipeCreateDTO): Promise<RecipeDTO> {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<RecipeDTO | null> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<RecipeDTO[]> {
        throw new Error("Method not implemented.");
    }

    async update(id: number, recipe: RecipeUpdateDTO): Promise<RecipeDTO | null> {
        throw new Error("Method not implemented.");
    }

    // async delete(id: number): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }
}