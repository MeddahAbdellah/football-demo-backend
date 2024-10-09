import { PlayerId } from "@libs/players";
import { Schema } from "mongoose";

export type TeamId = Schema.Types.ObjectId & {
  readonly __team_id__: unique symbol;
};

export type Team = {
  name: string;
  thumbnail: string;
  players: PlayerId[];
};
