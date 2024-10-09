import mongoose, { Schema } from "mongoose";
import { Player } from "../interface";

const playerSchema = new mongoose.Schema<Player>({
  name: String,
  thumbnail: String,
  position: String,
  signin: {
    amount: Number,
    currency: String,
  },
  born: String,
});

const PlayerModel = mongoose.model("players", playerSchema);

export { PlayerModel };
