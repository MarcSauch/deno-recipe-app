import { Application, Router } from "@oak/oak";
import { RecipeService } from "../service/recipe_service.ts";
import { RecipeRepository } from "../repository/recipe_repository.ts";

export const recipe_router = new Router({prefix: "/api/recipes"});




recipe_router
    .get("/", (context) => {
        context.response.body = "Hello from the Recipe API!";
    })
    .get("/recipe", (context) => {
        context.response.body = "List of recipes will be here.";    
    })
    .get("/recipe/:id", (context) => {
        const id = context.params.id;
        if (id) {
            context.response.body = `Details of recipe with ID: ${id}`;
        } else {
            context.response.status = 400;
            context.response.body = "Recipe ID is required.";
        }
    });

recipe_router
    .post("/recipe", async (context) => {
        const body = await context.request.body();
        if (body && body.title && body.description) {
            context.response.status = 201;
            context.response.body = `Recipe created with title: ${body.title}`;
        } else {
            context.response.status = 400;
            context.response.body = "Invalid recipe data.";
        }
    })