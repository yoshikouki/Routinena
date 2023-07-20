import { type ActivityUpdateRequest, type ActivityIdentifier, type ActivityModificationRequest } from "~/schemas/activities";
import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getOne: async (userId: string, activityRequest: ActivityIdentifier) => {
      return activityRepository().getOne(userId, activityRequest.activityId);
    },

    getAll: async (userId: string) => {
      return activityRepository().getAll(userId);
    },

    create: async (userId: string, newActivityParams: ActivityModificationRequest) => {
      return activityRepository().create(userId, newActivityParams);
    },

    updateOne: async (userId: string, activityRequest: ActivityUpdateRequest) => {
      return activityRepository().updateOne(userId, activityRequest);
    },

    deleteOne: async (userId: string, activityRequest: ActivityIdentifier) => {
      return activityRepository().deleteOne(userId, activityRequest.activityId);
    },
  };
};
