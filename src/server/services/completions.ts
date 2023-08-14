import { completionRepository } from "../repositories/completion";

export type CompletionUpdateParams = {
  userId: string;
  completionId: string;
  completedAt: Date;
};

export const completionsService = () => {
  return {
    getAll: async (userId: string) => {
      return completionRepository().getAll(userId);
    },

    update: async (updateParams: CompletionUpdateParams) => {
      return completionRepository().update(updateParams);
    },

    delete: async (userId: string, completionId: string) => {
      return completionRepository().delete(userId, completionId);
    },
  };
};
