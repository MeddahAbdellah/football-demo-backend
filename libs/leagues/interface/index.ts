/**
 * @openapi
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         sport:
 *           type: string
 *         teams:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *     LeagueId:
 *       type: string
 *       format: objectId
 *       description: Unique identifier for a team
 */

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
