import express from "express";
import {
  searchLeaguesController,
  getLeagueTeamsController,
} from "../controllers";

const leaguesRouter = express.Router();

/**
 * @openapi
 * /leagues:
 *   get:
 *     summary: Search for leagues or get all leagues
 *     tags: [Leagues]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the league to search for (optional)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/League'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
leaguesRouter.get("/", searchLeaguesController);
/**
 * @openapi
 * /leagues/{leagueId}/teams:
 *   get:
 *     summary: Get teams for a specific league
 *     tags: [Leagues]
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the league
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
leaguesRouter.get("/:leagueId/teams", getLeagueTeamsController);

export { leaguesRouter };
