import { Express, Request, Response } from "express";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Crossfit WOD API", version: "1.0.0" },
  },
  apis: [
    "./dist/v1/routes/workout.router.js",
    "./dist/repository/workout.repository.js",
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc.default(options);

// Function to setup our docs
const swaggerDocs = (app: Express, port: string) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

export { swaggerDocs };
