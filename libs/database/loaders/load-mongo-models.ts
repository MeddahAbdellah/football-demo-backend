import * as db from "../connections/mongodb";
import { LeagueModel } from "@libs/leagues/model";
import { TeamModel } from "@libs/teams/model";
import { PlayerModel } from "@libs/players/model";

export const loadMongoModels = async () => {
  // The mere act of importing the models above is enough to register them with Mongoose
  db;
  PlayerModel;
  TeamModel;
  LeagueModel;
};
