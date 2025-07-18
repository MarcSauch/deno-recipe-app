import { Router } from "@oak/oak";
import { get_recipe_service } from "../dependencies.ts";

export const recipe_router = new Router({prefix: "/api/recipes"});



// Get Routes
recipe_router
    .get("/", async (context) => {
        try {
            console.log("Fetching recipes...");
            const service = await get_recipe_service();
            console.log("Recipe Service is ready");
            
            const recipes = await service.get_all();
            context.response.body = recipes;
            console.log(`Fetched ${recipes.length} recipes`);
            console.log("Recipes fetched successfully.");
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching recipes.";
            console.error("Error fetching recipes:", error);
        }
    })
    .get("/recipe", (context) => {
        context.response.body = "List of recipes will be here.";    
    })
    .get("/recipe/:id", async (context) => {
        const id = context.params.id;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Recipe ID is required.";
            return;
        }

        try {
            const service = await get_recipe_service();
            const recipeId = parseInt(id);
            console.log(`Fetching recipe with ID: ${recipeId}`);
            
            const recipe = await service.get(recipeId);
            if (recipe) {
                context.response.body = recipe;
                console.log(`Recipe with ID ${recipeId} fetched successfully.`);
            } else {
                context.response.status = 404;
                context.response.body = `Recipe with ID ${recipeId} not found.`;
                console.error(`Recipe with ID ${recipeId} not found.`);
            }
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching recipe.";
            console.error("Error fetching recipe:", error);
        }
    })
    .get("/recipes-card", async (context) => {
        try {
            console.log("Fetching recipes for card view...");
            const service = await get_recipe_service();
            console.log("Recipe Service is ready for card view");
            const recipes = await service.get_all_recipes_card();
            context.response.body = recipes;
            console.log(`Fetched ${recipes.length} recipes for card view`);
            console.log("Recipes for card view fetched successfully.");
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching recipes for card view.";
            console.error("Error fetching recipes for card view:", error);
        }
    });

// Create Routes
recipe_router
    .post("/create-recipe", async (context) => {
       try {

            const body = await context.request.body;
            const data = await body.json();
            
            // Validate required fields
            if (!data) {
                context.response.status = 400;
                context.response.body = "Invalid Recipe data. Required field: id";
                return;
            }
            const service = await get_recipe_service();
            const newRecipe = await service.create(data);
            context.response.status = 201; // Created
            context.response.body = newRecipe;
            console.log("Recipe created successfully:", newRecipe);
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error creating recipe.";
            console.error("Error creating recipe:", error); 
        }
    })
    .post("/update-recipe", async (context) => {
        try {
            const body = await context.request.body;
            const data = await body.json();
            // Validate required fields
            if (!data) {
                context.response.status = 400;
                context.response.body = "Invalid Recipe data. Required field: id";
                return;
            }
            const service = await get_recipe_service();
            const updatedRecipeId = await service.update(data);
            context.response.status = 200; // OK
            context.response.body = { id: updatedRecipeId };
            console.log("Recipe updated successfully:", updatedRecipeId);
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error updating recipe.";
            console.error("Error updating recipe:", error);
        }
    });

// Delete Routes
recipe_router
    .delete("/delete-recipe/:id", async (context) => {
        const { id } = context.params;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Recipe ID is required.";
            return;
        }

        try {
            const service = await get_recipe_service();
            const recipeId = parseInt(id);
            console.log(`Deleting recipe with ID: ${recipeId}`);

            const success = await service.delete(recipeId);
            if (success) {
                context.response.status = 204; // No Content
                console.log(`Recipe with ID ${recipeId} deleted successfully.`);
            } else {
                context.response.status = 404;
                context.response.body = `Recipe with ID ${recipeId} not found.`;
                console.error(`Recipe with ID ${recipeId} not found.`);
            }
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error deleting recipe.";
            console.error("Error deleting recipe:", error);
        }
    });