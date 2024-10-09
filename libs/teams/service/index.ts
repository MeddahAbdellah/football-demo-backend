import { TeamModel } from "../model";

export const teamsService = () => {
  return {
    getPlayersOfTeam: async (teamId: string) => {
      const result = await TeamModel.findById(teamId)
        .populate("players")
        .select("players -_id")
        .lean();
      return result?.players || [];
    },
  };
};
