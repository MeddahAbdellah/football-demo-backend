import { Request, Response } from "express";
import { teamsService } from "../service";
import { Types } from "mongoose";

/**
 * Few comments here,
 * 1. I have willingly done the validation manually and not through any library like express-validator or joi or zod
 * 2. I have not added any error handling middleware here, but it is a good practice to add one
 * 3. I have not added any logging middleware here, but it is a good practice to add one
 * 4. I have not added any security middleware here, but it is necessary to add one
 * 6. I return the list of teams with the object, since the size of the list is not huge
 */
export const getTeamPlayers = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  if (!Types.ObjectId.isValid(teamId)) {
    res.status(400).json({ error: "Team ID must be a valid ID" });
    return;
  }

  try {
    const players = await teamsService().getPlayersOfTeam(teamId);
    res.json(players);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
