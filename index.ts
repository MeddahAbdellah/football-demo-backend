import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { loadMongoModels } from "@libs/database";
loadMongoModels();

import { leaguesRouter } from "@libs/leagues";
import { teamsRouter } from "@libs/teams";

const app: Express = express();
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: "https://yourdomain.com",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
}

app.get("/health-check", (_req: Request, res: Response) => {
  res.send("ok");
});
app.use("/leagues", leaguesRouter);
app.use("/teams", teamsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
