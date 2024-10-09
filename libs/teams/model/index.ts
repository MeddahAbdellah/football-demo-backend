import mongoose, { Schema } from "mongoose";
import { type Team } from "../interface";

const teamSchema = new mongoose.Schema<Team>({
  name: String,
  thumbnail: String,
  players: [{ type: Schema.Types.ObjectId, ref: "players" }],
});

const TeamModel = mongoose.model("teams", teamSchema);

export { TeamModel };
