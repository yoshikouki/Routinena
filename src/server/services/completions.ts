import { completionRepository } from "../repositories/completion";

export const completionsService = () => {
  return {
    getAll: async (userId: string) => {
      return completionRepository().getAll(userId);
    },

    delete: async (userId: string, completionId: string) => {
      return completionRepository().delete(userId, completionId);
    },
  };
};
