
export interface UpdateIngredientDTO {
    name?: string;
    quantity?: string;
    unit?: string; // Optional unit of measurement
}

export interface CreateIngredientDTO {
    name: string;
    quantity: string;
    unit?: string; // Optional unit of measurement
}

export interface IngredientDTO {
    id: string;
    name: string;
    quantity: string;
    unit?: string; // Optional unit of measurement
}