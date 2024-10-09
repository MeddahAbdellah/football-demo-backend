import { leagueService } from "./";
import { LeagueModel } from "../model";

/**
 * Since the searchLeagues function is a bit more complex, I would write a unit test for it, to lock it's behavior.
 */
jest.mock("../model", () => ({
  LeagueModel: {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn(),
  },
}));

describe("leagueService", () => {
  describe("searchLeagues", () => {
    const mockLeagues = [
      { _id: "1", name: "Premier League" },
      { _id: "2", name: "La Liga" },
      { _id: "3", name: "Bundesliga" },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return exact matches when found", async () => {
      const mockSort = jest.fn().mockReturnThis();
      const mockLean = jest.fn().mockResolvedValue(mockLeagues.slice(0, 1));

      (LeagueModel.find as jest.Mock).mockReturnValue({
        sort: mockSort,
        lean: mockLean,
      });
      const result = await leagueService().searchLeagues("Premier");

      expect(LeagueModel.find).toHaveBeenCalledWith({ name: /^Premier/i });
      expect(result).toEqual(mockLeagues.slice(0, 1));
    });

    it("should perform text search when no exact matches are found", async () => {
      const mockSort = jest.fn().mockReturnThis();
      const mockLean = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mockLeagues);

      (LeagueModel.find as jest.Mock).mockReturnValue({
        sort: mockSort,
        lean: mockLean,
      });

      const result = await leagueService().searchLeagues("League");

      expect(LeagueModel.find).toHaveBeenCalledTimes(2);
      expect(LeagueModel.find).toHaveBeenNthCalledWith(1, { name: /^League/i });
      expect(LeagueModel.find).toHaveBeenNthCalledWith(
        2,
        { $text: { $search: "League" } },
        { score: { $meta: "textScore" } },
      );
      expect(result).toEqual(mockLeagues);
    });

    it("should handle multi-word search terms", async () => {
      const mockSort = jest.fn().mockReturnThis();
      const mockLean = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mockLeagues);

      (LeagueModel.find as jest.Mock).mockReturnValue({
        sort: mockSort,
        lean: mockLean,
      });

      const result = await leagueService().searchLeagues("Premier League");

      expect(LeagueModel.find).toHaveBeenCalledTimes(2);
      expect(LeagueModel.find).toHaveBeenNthCalledWith(1, {
        name: /^Premier League/i,
      });

      expect(LeagueModel.find).toHaveBeenNthCalledWith(
        2,
        { $text: { $search: "Premier League" } },
        { score: { $meta: "textScore" } },
      );
      expect(result).toEqual(mockLeagues);
    });

    it("should handle multi-word fuzzy search terms", async () => {
      const mockSort = jest.fn().mockReturnThis();
      const mockLean = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mockLeagues);

      (LeagueModel.find as jest.Mock).mockReturnValue({
        sort: mockSort,
        lean: mockLean,
      });

      const result = await leagueService().searchLeagues("Premier Laague");

      expect(LeagueModel.find).toHaveBeenCalledTimes(2);
      expect(LeagueModel.find).toHaveBeenNthCalledWith(1, {
        name: /^Premier Laague/i,
      });

      expect(LeagueModel.find).toHaveBeenNthCalledWith(
        2,
        { $text: { $search: "Premier Laague" } },
        { score: { $meta: "textScore" } },
      );
      expect(result).toEqual(mockLeagues);
    });
  });
});
