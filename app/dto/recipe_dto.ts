import { IngredientDTO } from "./ingredient_dto.ts";
import { MethodDTO } from "./method_dto.ts";


export interface RecipeUpdateDTO {
    favorite?: boolean;
    title?: string;
    description?: string;
    image_url?: string;
}

export interface RecipeCreateDTO {
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    method: MethodDTO[];
    image_url?: string;
}

export interface RecipeDTO{
    id: number;
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    method: MethodDTO[];
    image_url?: string;
    favorite: boolean;
}

export interface RecipeCardDTO {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    favorite: boolean;
}