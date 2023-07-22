import { type ActivityUpdateRequest, type ActivityModificationRequest } from "~/schemas/activities";
import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getOne: async (userId: string, activityId: string) => {
      return activityRepository().getOne(userId, activityId);
    },

    getAll: async (userId: string) => {
      return activityRepository().getAll(userId);
    },

    create: async (
      userId: string,
      newActivityParams: ActivityModificationRequest,
    ) => {
      return activityRepository().create(userId, newActivityParams);
    },

    updateOne: async (
      userId: string,
      activityRequest: ActivityUpdateRequest,
    ) => {
      return activityRepository().updateOne(userId, activityRequest);
    },

    deleteOne: async (userId: string, activityId: string) => {
      return activityRepository().deleteOne(userId, activityId);
    },
  };
};
