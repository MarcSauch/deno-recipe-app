import { IRecipeService } from "./irecipe_service.ts";
import { RecipeDTO, RecipeCreateDTO ,RecipeUpdateDTO,RecipeCardDTO } from "../dto/recipe_dto.ts";
import { IRecipeRepository } from "../repository/irecipe_repository.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { receiveMessageOnPort } from "node:worker_threads";

export class RecipeService implements IRecipeService {
    private recipeRepository: IRecipeRepository;

    constructor(recipeRepository: IRecipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    async create(recipe: RecipeCreateDTO): Promise<RecipeCardDTO> {
        return await this.recipeRepository.create(recipe);
    }

    async get(id: number): Promise<RecipeDTO | null> {
        return await this.recipeRepository.get(id);
    }

    async get_all(): Promise<RecipeDTO[]> {
        let recipes = await this.recipeRepository.get_all(); 
        // change later 
        return recipes
    }

    async get_all_recipes_card(): Promise<RecipeCardDTO[]> {
        let recipes = await this.recipeRepository.get_all_recipes_card();
        return recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                imageUrl: recipe.image_url
            }
        });
    }

    async update(recipe: RecipeDTO): Promise<number | null> {
        return await this.recipeRepository.update(recipe);
    }

    async delete(id: number): Promise<boolean> {
        return await this.recipeRepository.delete(id);
    }
}