import express from "express";
import {
  searchLeaguesController,
  getLeagueTeamsController,
} from "../controllers";

const leaguesRouter = express.Router();

leaguesRouter.get("/", searchLeaguesController);
leaguesRouter.get("/:leagueId/teams", getLeagueTeamsController);

export { leaguesRouter };
