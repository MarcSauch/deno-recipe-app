
export interface CreateMethodDTO {
    step: string;
    recipe_id: number; // Required to associate the method with a recipe
    step_number: number; // Required to specify the order of the method steps
}

export interface UpdateMethodDTO  {
    step?: string; // Optional to update the step description
    step_number?: number; // Optional to update the step number
    recipe_id: number; // Optional to update the associated recipe
}

export interface MethodDTO {
    id: number;
    step_number: number;
    step: string;
}
