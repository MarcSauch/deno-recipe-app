import { Router } from "@oak/oak";
import { get_ingredient_service } from "../dependencies.ts";
import { CreateIngredientDTO } from "../dto/ingredient_dto.ts";

export const ingredient_router = new Router({prefix: "/api/ingredients"});




ingredient_router
    .get("/", async (context) => {
        try {
            console.log("Fetching ingredients...");
            const service = await get_ingredient_service();
            console.log("Ingredient Service is ready");
            
            const ingredients = await service.get_all();
            context.response.body = ingredients;
            console.log(`Fetched ${ingredients.length} ingredients`);
            console.log("ingredients fetched successfully.");
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching ingredients.";
            console.error("Error ingredients recipes:", error);
        }
    })
    .get("/ingredient", (context) => {
        context.response.body = "Query A Ingredient by id.";    
    })

    .get("/ingredient/:id", async (context) => {
        const id = context.params.id;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Recipe ID is required.";
            return;
        }

        try {
            const service = await get_ingredient_service();
            const ingredient_id = parseInt(id);
            console.log(`Fetching Ingredient with ID: ${ingredient_id}`);
            
            const recipe = await service.get(ingredient_id);
            if (recipe) {
                context.response.body = recipe;
                console.log(`Ingredient with ID ${ingredient_id} fetched successfully.`);
            } else {
                context.response.status = 404;
                context.response.body = `Ingredient with ID ${ingredient_id} not found.`;
                console.error(`Ingredient with ID ${ingredient_id} not found.`);
            }
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching Ingredient.";
            console.error("Error fetching Ingredient:", error);
        }
    });

ingredient_router
    .post("/create-ingredient", async (context) => {
        try {
            console.log("Creating new ingredient...");
            const body = await context.request.body;
            const data = await body.json();
            console.log("Received ingredient data:", data);
            // Validate required fields
            if (!data || !data.name || !data.quantity || (!data.unit && data.unit !== "") || !data.recipe_id) {
                console.error("Invalid ingredient data:", data);
                context.response.status = 400;
                context.response.body = "Invalid ingredient data. Required fields: name, quantity, unit, recipe_id";
                return;
            }

            console.log("Creating new ingredient with data:", data);
            const service = await get_ingredient_service();
            const createdIngredient = await service.create(data as CreateIngredientDTO);
            console.log("Created Ingredient:", createdIngredient);
            
            context.response.status = 200;
            context.response.body = { ingredient: createdIngredient };
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error creating ingredient.";
            console.error("Error creating ingredient:", error);
        }
    })
    .post("/update-ingredient", async (context) => {
        try {
            const body = await context.request.body;
            const data = await body.json();
            
            // Validate required fields
            if (!data || !data.id) {
                context.response.status = 400;
                context.response.body = "Invalid ingredient data. Required field: id";
                return;
            }
            const service = await get_ingredient_service();
            const updatedIngredient = await service.update(data.id, data);
            if (updatedIngredient) {
                context.response.status = 200;
                context.response.body = `Ingredient with ID ${data.id} updated successfully.`;
                console.log(`Ingredient with ID ${data.id} updated successfully.`);
            }
            else {
                context.response.status = 404;
                context.response.body = `Ingredient with ID ${data.id} not found.`;
                console.error(`Ingredient with ID ${data.id} not found.`);
            }

            
        }catch (error) {
            context.response.status = 500;
            context.response.body = "Error updating ingredient.";
            console.error("Error updating ingredient:", error);
        }
    });

ingredient_router
    .delete("/ingredient/:id", async (context) => {
        const id = context.params.id;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Ingredient ID is required.";
            return;
        }

        try {
            const service = await get_ingredient_service();
            const ingredient_id = parseInt(id);
            console.log(`Deleting Ingredient with ID: ${ingredient_id}`);

            const success = await service.delete(ingredient_id);
            context.response.status = success ? 200 : 404;
            context.response.body = { success };
            console.log(`Ingredient with ID ${ingredient_id} deleted successfully.`);
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error deleting Ingredient.";
            console.error("Error deleting Ingredient:", error);
        }
    });
