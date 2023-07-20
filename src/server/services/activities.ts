import { type ActivityRequest, type NewActivityRequest } from "~/schemas/activities";
import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getOne: async (userId: string, activityRequest: ActivityRequest) => {
      return activityRepository().getOne(userId, activityRequest.activityId);
    },

    getAll: async (userId: string) => {
      return activityRepository().getAll(userId);
    },

    create: async (userId: string, newActivityParams: NewActivityRequest) => {
      return activityRepository().create(userId, newActivityParams);
    },
  };
};
