import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/health-check", (_req: Request, res: Response) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
