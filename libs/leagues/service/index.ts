import { LeagueModel } from "../model";

export const leagueService = () => {
  return {
    getAllLeagues: async () => {
      return LeagueModel.find().lean();
    },
    searchLeagues: async (name: string) => {
      const regex = new RegExp(`^${name}`, "i");

      // First, try to find exact matches at the beginning
      const exactMatches = await LeagueModel.find({ name: regex }).lean();

      // If we have exact matches, return them
      if (exactMatches.length > 0) {
        return exactMatches;
      }

      const searchTerms = name
        .split(" ")
        .map((term) => `${term}`)
        .join(" ");

      return LeagueModel.find(
        { $text: { $search: searchTerms } },
        { score: { $meta: "textScore" } },
      )
        .sort({ score: { $meta: "textScore" } })
        .lean();
    },
    getLeagueTeams: async (leagueId: string) => {
      const result = await LeagueModel.findById(leagueId)
        .populate("teams")
        .select("teams -_id")
        .lean();
      return result?.teams || [];
    },
  };
};
