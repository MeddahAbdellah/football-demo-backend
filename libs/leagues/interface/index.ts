import { TeamId } from "@libs/teams";
import { Schema } from "mongoose";

export type LeagueId = Schema.Types.ObjectId & {
  readonly __league_id__: unique symbol;
};

export type League = {
  name: string;
  sport: string;
  teams: TeamId[];
};
