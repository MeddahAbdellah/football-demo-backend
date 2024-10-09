import request from "supertest";
import express from "express";
import { TeamModel } from "../model";
import { teamsRouter } from "../routes";

const app = express();
app.use("/teams", teamsRouter);

describe("Teams API E2E Tests", () => {
  let testTeamId: string;
  let emptyTeamId: string;

  beforeAll(async () => {
    // Fetch a team ID that we know has players
    const teamWithPlayers = await TeamModel.findOne({
      players: { $exists: true, $ne: [] },
    });
    testTeamId = teamWithPlayers?._id.toString() || "";

    // Fetch or create a team with no players
    const emptyTeam = await TeamModel.findOne({
      players: { $exists: true, $size: 0 },
    });
    if (emptyTeam) {
      emptyTeamId = emptyTeam._id.toString();
    } else {
      const newEmptyTeam = await TeamModel.create({
        name: "Empty Team",
        players: [],
      });
      emptyTeamId = newEmptyTeam._id.toString();
    }
  });

  it("should return players for a valid team ID", async () => {
    const response = await request(app).get(`/teams/${testTeamId}/players`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("_id");
  });

  it("should return 400 for invalid team ID", async () => {
    const response = await request(app).get("/teams/invalidid/players");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid team ID" });
  });

  it("should return 404 when team is not found", async () => {
    const nonExistentId = "507f1f77bcf86cd799439011"; // Valid ObjectId that doesn't exist
    const response = await request(app).get(`/teams/${nonExistentId}/players`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Team not found" });
  });

  it("should return empty array when team has no players", async () => {
    const response = await request(app).get(`/teams/${emptyTeamId}/players`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
