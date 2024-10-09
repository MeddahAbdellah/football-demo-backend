import { Schema } from "mongoose";

export type PlayerId = Schema.Types.ObjectId & {
  readonly __player_id__: unique symbol;
};

export type Player = {
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: string;
};
