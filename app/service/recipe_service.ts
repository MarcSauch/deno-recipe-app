import { IRecipeService } from "./irecipe_service.ts";
import { RecipeDTO, RecipeCreateDTO ,RecipeUpdateDTO,RecipeCardDTO } from "../dto/recipe_dto.ts";
import { IRecipeRepository } from "../repository/irecipe_repository.ts";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { receiveMessageOnPort } from "node:worker_threads";
import { Recipe } from "../model/recipe.ts";

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
                imageUrl: recipe.image_url,
                favorite: recipe.favorite
            }
        });
    }

    async update(recipeId: number, recipe: RecipeUpdateDTO): Promise<number | null> {
        console.log("Send data to repository for update:", recipe);
        return await this.recipeRepository.update(recipeId, recipe);
    }

    async delete(id: number): Promise<boolean> {
        await this.recipeRepository.delete(id);
        return true;
    }
    async update_favorite(id: number, favorite: boolean): Promise<boolean> {
        return await this.recipeRepository.update_favorite(id, favorite);
    }
}