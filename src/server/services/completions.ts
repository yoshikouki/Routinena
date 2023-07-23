import { completionRepository } from "../repositories/completion";

export const completionsService = () => {
  return {
    getAll: async (userId: string) => {
      return completionRepository().getAll(userId);
    },
  };
};
