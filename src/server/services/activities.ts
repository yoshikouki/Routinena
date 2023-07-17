import { type NewActivityRequest } from "~/schemas/activities";
import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getAll: async (userId: string) => {
      return activityRepository().getAll(userId);
    },

    create: async (userId: string, newActivityParams: NewActivityRequest) => {
      return activityRepository().create(userId, newActivityParams);
    },
  };
};
