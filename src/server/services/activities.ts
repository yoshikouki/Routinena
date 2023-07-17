import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getAll: async (userId: string) => {
      return activityRepository().getAll(userId);
    },
  };
};
