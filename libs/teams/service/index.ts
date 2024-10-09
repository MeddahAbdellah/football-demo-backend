import { TeamModel } from "../model";

export const teamsService = () => {
  return {
    getPlayersOfTeam: async (teamId: string) => {
      return await TeamModel.findById(teamId).populate("players").lean();
    },
  };
};
