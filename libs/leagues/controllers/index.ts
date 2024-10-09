import { Request, Response } from "express";
import { leagueService } from "../service";
import { Types } from "mongoose";

/**
 * Few comments here,
 * 1. I have willingly done the validation manually and not through any library like express-validator or joi or zod
 * 2. I have not added any error handling middleware here, but it is a good practice to add one
 * 3. I have not added any logging middleware here, but it is a good practice to add one
 * 4. I have not added any security middleware here, but it is necessary to add one
 * 6. I return the list of teams with the object, since the size of the list is not huge
 */

export const getLeaguesController = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (typeof name !== "string") {
    res.status(400).json({ error: "Name parameter must be a string" });
    return;
  }

  try {
    const leagues = await leagueService().searchLeagues(name);
    res.json(leagues);
  } catch (error) {
    console.error("Error fetching leagues:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLeagueTeamsController = async (req: Request, res: Response) => {
  const { leagueId } = req.params;
  if (!Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ error: "League ID must be a valid ID" });
    return;
  }

  try {
    const teams = await leagueService().getLeagueTeams(leagueId);
    console.log({ teams });
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
