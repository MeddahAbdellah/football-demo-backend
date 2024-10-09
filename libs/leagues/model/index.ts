import mongoose, { Schema } from "mongoose";
import { type League } from "../interface";

const leagueSchema = new mongoose.Schema<League>({
  name: String,
  sport: String,
  teams: [{ type: Schema.Types.ObjectId, ref: "teams" }],
});

const LeagueModel = mongoose.model("leagues", leagueSchema);

(async () => {
  await LeagueModel.collection.createIndex({ name: "text" });
})();

export { LeagueModel };
