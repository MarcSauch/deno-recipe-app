
import { RecipeDTO, RecipeCreateDTO ,RecipeUpdateDTO ,RecipeCardDTO} from "../dto/recipe_dto.ts";

export class IRecipeService {
    
    async create(recipe: RecipeCreateDTO): Promise<RecipeCardDTO> {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<RecipeDTO | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<RecipeDTO[]>{
        console.log("Method not implemented.");
        throw new Error("Method not implemented.");
    }

    async get_all_recipes_card(): Promise<RecipeCardDTO[]> {
        console.log("Method not implemented.");
        throw new Error("Method not implemented.");
    }

    async update(recipe: RecipeDTO): Promise<number | null> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}