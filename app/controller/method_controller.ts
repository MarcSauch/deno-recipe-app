import { Router } from "@oak/oak";
import { get_method_service } from "../dependencies.ts";
import { CreateMethodDTO } from "../dto/method_dto.ts";

export const method_router = new Router({prefix: "/api/methods"});




method_router
    .get("/", async (context) => {
        try {
            console.log("Fetching ingredients...");
            const service = await get_method_service();
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
    .get("/method", (context) => {
        context.response.body = "Query by step_id to get a step .";    
    })

    .get("/method/:id", async (context) => {
        const id = context.params.id;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Method ID is required.";
            return;
        }

        try {
            const service = await get_method_service();
            const method_id = parseInt(id);
            console.log(`Fetching Method with ID: ${method_id}`);
            
            const recipe = await service.get(method_id);
            if (recipe) {
                context.response.body = recipe;
                console.log(`Method with ID ${method_id} fetched successfully.`);
            } else {
                context.response.status = 404;
                context.response.body = `Method with ID ${method_id} not found.`;
                console.error(`Method with ID ${method_id} not found.`);
            }
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error fetching Method.";
            console.error("Error fetching Method:", error);
        }
    });



method_router
    .post("/create-method", async (context) => {
        try {
            const body = await context.request.body;
            const data = await body.json();
            
            // Validate required fields
            if (!data || !data.step || !data.recipe_id || !data.step_number) {
                context.response.status = 400;
                context.response.body = "Invalid method data. Required fields: step, step_number,  recipe_id";
                return;
            }

            console.log("Creating new method with data:", data);
            const service = await get_method_service();
            const createdMethod = await service.create(data as CreateMethodDTO);
            console.log("Created method:", createdMethod);
            
            context.response.status = 200;
            context.response.body = { method: createdMethod };
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error creating method.";
            console.error("Error creating method:", error);
        }
    })
    .post("/update-method", async (context) => {
        try {
            const body = await context.request.body;
            const data = await body.json();
            
            // Validate required fields
            if (!data || !data.id) {
                context.response.status = 400;
                context.response.body = "Invalid Method data. Required field: id";
                return;
            }
            const service = await get_method_service();
            const updatedMethod= await service.update(data.id, data);
            if (updatedMethod) {
                context.response.status = 200;
                context.response.body = `Method with ID ${data.id} updated successfully.`;
                console.log(`Method with ID ${data.id} updated successfully.`);
            }
            else {
                context.response.status = 404;
                context.response.body = `Method with ID ${data.id} not found.`;
                console.error(`Method with ID ${data.id} not found.`);
            }

            
        }catch (error) {
            context.response.status = 500;
            context.response.body = "Error updating Method.";
            console.error("Error updating Method:", error);
        }
    });

method_router
    .delete("/method/:id", async (context) => {
        const id = context.params.id;
        if (!id) {
            context.response.status = 400;
            context.response.body = "Method ID is required.";
            return;
        }

        try {
            const service = await get_method_service();
            const method_id = parseInt(id);
            console.log(`Deleting Method with ID: ${method_id}`);

            const success = await service.delete(method_id);
            context.response.status = success ? 200 : 404;
            context.response.body = { success };
            console.log(`Method with ID ${method_id} deleted successfully.`);
        } catch (error) {
            context.response.status = 500;
            context.response.body = "Error deleting Method.";
            console.error("Error deleting Method:", error);
        }
    });
