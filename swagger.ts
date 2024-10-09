import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for your Express project",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./libs/**/routes/*.ts", "./libs/**/interface/*.ts"], // Include both routes and interfaces
};

const specs = swaggerJsdoc(options);

export default specs;
