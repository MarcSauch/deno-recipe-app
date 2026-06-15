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
// Add CORS middleware
app.use(async (context, next) => {
  context.response.headers.set("Access-Control-Allow-Origin", "*");
  context.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  context.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (context.request.method === "OPTIONS") {
    context.response.status = 204;
    return;
  }
  await next();
});


app.use(router.routes());
app.use(recipe_router.routes());
app.use(ingredient_router.routes());
app.use(method_router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8010 });