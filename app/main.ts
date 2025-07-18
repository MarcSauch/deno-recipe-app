import { Application, Router } from "@oak/oak";
import { recipe_router } from "./controller/recipe_controller.ts";
import { ingredient_router } from "./controller/ingredient_controller.ts";
import { method_router } from "./controller/method_controller.ts";



const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Deno Recipe API!";
  })

const app = new Application();
app.use(router.routes());
app.use(recipe_router.routes());
app.use(ingredient_router.routes());
app.use(method_router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8010 });