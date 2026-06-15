
import { IngredientDTO, CreateIngredientDTO, UpdateIngredientDTO } from "../dto/ingredient_dto.ts";
import { Ingredient } from "../model/ingredient.ts";
import { IIngredientService } from "./iingredient_service.ts";
import { IngredientRepository } from "../repository/ingredient_repository.ts";
import { IIngredientRepository } from "../repository/iingredient_repository.ts";


export class IngredientService implements IIngredientService {
    private ingredientRepository: IngredientRepository;

    constructor(ingredientRepository: IIngredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    async create(ingredient: CreateIngredientDTO): Promise<IngredientDTO> {
        const created_ingredient = await this.ingredientRepository.create(ingredient);
        return {
            id: created_ingredient.id,
            name: created_ingredient.name,
            quantity: created_ingredient.quantity,
            unit: created_ingredient.unit
        };
    }

    async get(id: number): Promise<IngredientDTO | null> {
        return await this.ingredientRepository.get(id);
    }

    async get_all(): Promise<IngredientDTO[]>{
        const ingredients = await this.ingredientRepository.get_all(); 
        // change later 
        return ingredients.map(ingredient => {
            return {
                id: ingredient.id,
                name: ingredient.name,
                quantity: ingredient.quantity,
                unit: ingredient.unit
            }
        })
    }

    async update(id: number, ingredient: UpdateIngredientDTO): Promise<IngredientDTO | null> {
        const updatedIngredient = await this.ingredientRepository.update(id, ingredient);
        if (!updatedIngredient) {
            return null; // Ingredient not found
        }
        return {
            id: updatedIngredient.id,
            name: updatedIngredient.name,
            quantity: updatedIngredient.quantity,
            unit: updatedIngredient.unit
        };
    }

    async delete(id: number): Promise<boolean> {
        return await this.ingredientRepository.delete(id);
    }
}