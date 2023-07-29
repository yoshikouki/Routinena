import {
  type ActivityModificationParams,
  type ActivityUpdateParams,
} from "~/schemas/activities";
import { activityRepository } from "../repositories/activity";

export const activitiesService = () => {
  return {
    getOne: async (userId: string, activityId: string) => {
      return activityRepository().getOneWithCompletions(userId, activityId);
    },

    getAll: async (userId: string) => {
      return activityRepository().getAllWithLatestCompletion(userId);
    },

    create: async (
      userId: string,
      newActivityParams: ActivityModificationParams,
    ) => {
      return activityRepository().create(userId, newActivityParams);
    },

    updateOne: async (
      userId: string,
      activityRequest: ActivityUpdateParams,
    ) => {
      return activityRepository().updateOne(userId, activityRequest);
    },

    deleteOne: async (userId: string, activityId: string) => {
      return activityRepository().deleteOne(userId, activityId);
    },

    complete: async (userId: string, activityId: string) => {
      return activityRepository().complete(userId, activityId);
    },
  };
};
