import { IRecipeService } from "./irecipe_service.ts";
import { RecipeDTO, RecipeCreateDTO ,RecipeUpdateDTO } from "../dto/recipe_dto.ts";
import { IRecipeRepository } from "../repository/irecipe_repository.ts";

export class RecipeService implements IRecipeService {
    private recipeRepository: IRecipeRepository;

    constructor(recipeRepository: IRecipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    async create(recipe: RecipeCreateDTO): Promise<RecipeDTO> {
        return await this.recipeRepository.create(recipe);
    }

    async get(id: number): Promise<RecipeDTO | null> {
        return await this.recipeRepository.get(id);
    }

    async getAll(): Promise<RecipeDTO[]> {
        return await this.recipeRepository.getAll();
    }

    async update(id: number, recipe: RecipeUpdateDTO): Promise<RecipeDTO | null> {
        return await this.recipeRepository.update(id, recipe);
    }

    // async delete(id: number): Promise<void> {
    //     await this.recipeRepository.delete(id);
    // }
}