import { IngredientDTO } from "./ingredient_dto.ts";
import { MethodDTO } from "./method_dto.ts";


export interface RecipeUpdateDTO {
    title?: string;
    description?: string;
    ingredients?: IngredientDTO[];
    method?: MethodDTO[];
    imageUrl?: string;
}

export interface RecipeCreateDTO {
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    method: MethodDTO[];
    imageUrl?: string;
}

export interface RecipeDTO{
    id: string;
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    method: MethodDTO[];
    imageUrl?: string;
}