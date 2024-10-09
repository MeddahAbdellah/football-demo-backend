import express from "express";
import { getTeamPlayers } from "../controllers";

const teamsRouter = express.Router();
/**
 * @openapi
 * /teams/{teamId}/players:
 *   get:
 *     summary: Get players of a team
 *     tags: [Teams]
 *     description: Retrieves the list of players for a specific team
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to fetch players for
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid team ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "League ID must be a string"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
teamsRouter.get("/:teamId/players", getTeamPlayers);

export { teamsRouter };
