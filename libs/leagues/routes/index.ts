import express from "express";
import { getLeaguesController, getLeagueTeamsController } from "../controllers";

const leaguesRouter = express.Router();

leaguesRouter.get("/", getLeaguesController);
leaguesRouter.get("/:leagueId/teams", getLeagueTeamsController);

export { leaguesRouter };
