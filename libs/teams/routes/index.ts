import express from "express";
import { getTeamPlayers } from "../controllers";

const teamsRouter = express.Router();

teamsRouter.get("/:teamId/players", getTeamPlayers);

export { teamsRouter };
