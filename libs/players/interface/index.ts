/**
 * @openapi
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         thumbnail:
 *           type: string
 *         signin:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             currency:
 *               type: string
 *         born:
 *           type: string
 *     PlayerId:
 *       type: string
 *       format: objectId
 *       description: Unique identifier for a player
 */

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
