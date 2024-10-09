import request from "supertest";
import express from "express";
import * as db from "@libs/database";
import { TeamModel } from "@libs/teams/model";
db;
TeamModel;
import { leaguesRouter } from "../routes";
import { LeagueModel } from "../model";
const app = express();
app.use("/leagues", leaguesRouter);

describe("getLeaguesController E2E Tests", () => {
  it("should return leagues when given a valid name query", async () => {
    const response = await request(app)
      .get("/leagues/")
      .query({ name: "Premier" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
  });

  it("should return 400 when name query is not a string", async () => {
    const response = await request(app)
      .get("/leagues/")
      .query({ name: ["Invalid", "Name"] });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Name parameter must be a string" });
  });

  it("should return empty array when no leagues match the query", async () => {
    const response = await request(app)
      .get("/leagues/")
      .query({ name: "NonexistentLeague" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("getLeagueTeamsController E2E Tests", () => {
  let validLeagueId: string;
  let emptyLeagueId: string;

  beforeAll(async () => {
    // Find a league with teams
    const leagueWithTeams = await LeagueModel.findOne({
      teams: { $exists: true, $ne: [] },
    });
    validLeagueId = leagueWithTeams?._id.toString() || "1";

    // Find or create a league without teams
    const leagueWithoutTeams = await LeagueModel.findOne({
      teams: { $exists: true, $eq: [] },
    });
    if (leagueWithoutTeams) {
      emptyLeagueId = leagueWithoutTeams._id.toString();
    } else {
      const newLeague = await LeagueModel.create({
        name: "Empty League",
        teams: [],
      });
      emptyLeagueId = newLeague._id.toString();
    }
  });

  it("should return teams for a valid league ID", async () => {
    const response = await request(app).get(`/leagues/${validLeagueId}/teams`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("name");
  });

  it("should return 400 when league ID is not a valid number", async () => {
    const response = await request(app).get("/leagues/invalid/teams");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "League ID must be a valid ID" });
  });

  it("should return empty array for a league with no teams", async () => {
    const response = await request(app).get(`/leagues/${emptyLeagueId}/teams`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
