# Recipe App - Deno Backend API

This is the backend API for the Recipe App, built with Deno, Oak, and Drizzle ORM. It provides RESTful endpoints to manage recipes, ingredients, and preparation methods.

## ✨ Features

-   **CRUD Operations** for recipes, ingredients, and methods.
-   **Built with Deno** for a modern, secure TypeScript runtime.
-   **Oak Middleware Framework** for routing and handling HTTP requests.
-   **Drizzle ORM** for typesafe SQL queries and schema management.
-   **PostgreSQL** database.
-   **Containerized** with Docker for easy setup and deployment.

## 🛠️ Technology Stack

-   **Runtime**: [Deno](https://deno.land/)
-   **Web Framework**: [Oak](https://oakserver.github.io/oak/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Getting Started

### Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/) must be installed and running on your system.

### Installation & Running

The entire application stack (backend, database) is managed via Docker Compose.

1.  **Clone the repository** (if you haven't already).

2.  **Navigate to the root `recipe-app` directory** in your terminal.

3.  **Build and start the services** in detached mode:
    ```bash
    docker compose up --build -d
    ```

4.  The API will be running and accessible at `http://localhost:8010`.

## 📂 Project Structure

The application follows a standard layered architecture within the `app/` directory:

```
app/
├── controller/   # Handles HTTP requests and API routes
├── service/      # Contains the core business logic
├── repository/   # Manages data access and database queries
├── model/        # Data models (Drizzle schema)
├── dto/          # Data Transfer Objects for API contracts
├── main.ts       # Application entry point
├── database.ts   # Database connection setup
└── deno.json     # Project dependencies and tasks
```

## 🗄️ Database Management with Drizzle Studio

You can inspect and manage the database using Drizzle Studio.

1.  Ensure the containers are running.

2.  Execute the `studio` task inside the `recipe-backend` container:
    ```bash
    docker exec -it recipe-backend deno task studio
    ```

3.  Open your browser and navigate to `http://localhost:4983` to use Drizzle Studio.

## 🧪 API Testing

API tests and requests are managed using [Bruno](https://www.usebruno.com/). The collection is located in the `api_test/` directory. You can import this collection into your Bruno client to test the endpoints.

## 🌐 API Endpoints

The API is prefixed with `/api`.

### Recipes (`/api/recipes`)

-   `GET /`: Get all recipes with full details.
-   `GET /recipes-card`: Get a list of all recipes (summary view for cards).
-   `GET /recipe/:id`: Get full details for a single recipe by ID.
-   `GET /image/:imageName`: Get a recipe image by its filename.
-   `POST /create-recipe`: Create a new recipe.
-   `POST /recipe/:id/update`: Update an existing recipe.
-   `POST /recipe/:id/favorite`: Update the favorite status of a recipe.
-   `DELETE /delete-recipe/:id`: Delete a recipe by ID.


### Ingredients (`/api/ingredients`)

-   `GET /`: Get all ingredients.
-   `GET /ingredient/:id`: Get a single ingredient by ID.
-   `POST /create-ingredient`: Create a new ingredient.
-   `POST /update-ingredient`: Update an existing ingredient.
-   `DELETE /ingredient/:id`: Delete an ingredient by ID.

### Methods (`/api/methods`)

-   `GET /`: Get all method steps.
-   `GET /method/:id`: Get a single method step by ID.
-   `POST /create-method`: Create a new method step.
-   `POST /update-method`: Update a single method step.
-   `POST /update-methods`: Batch update multiple method steps.
-   `DELETE /method/:id`: Delete a method step by ID.