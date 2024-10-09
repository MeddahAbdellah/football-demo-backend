/**
 * @openapi
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the team
 *         thumbnail:
 *           type: string
 *           description: URL of the team's thumbnail image
 *         players:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PlayerId'
 *           description: Array of player IDs belonging to the team
 *       required:
 *         - name
 *         - thumbnail
 *         - players
 *
 *     TeamId:
 *       type: string
 *       format: objectId
 *       description: Unique identifier for a team
 */

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
