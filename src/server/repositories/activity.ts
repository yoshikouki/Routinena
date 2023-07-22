import { type Activity, type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "./../db";
import { type ActivityUpdateParams, type ActivityModificationParams } from "~/schemas/activities";

interface Props {
  prisma?: PrismaClient;
}

export const activityRepository = (props?: Props) => {
  const prisma: PrismaClient = props?.prisma || prismaClient;

  return {
    getOne: async (userId: string, activityId: string) => {
      const activity = await prisma.activity.findUnique({
        where: { id: activityId, ownerId: userId },
      });
      return activity;
    },

    getAll: async (userId: string): Promise<Activity[]> => {
      const activities = await prisma.activity.findMany({
        where: { ownerId: userId },
      });
      return activities;
    },

    create: async (
      userId: string,
      newActivityParams: ActivityModificationParams,
    ): Promise<Activity> => {
      const activity = await prisma.activity.create({
        data: {
          ownerId: userId,
          ...newActivityParams,
        },
      });
      return activity;
    },

    updateOne: async (
      userId: string,
      activityParams: ActivityUpdateParams,
    ): Promise<Activity> => {
      const activity = await prisma.activity.update({
        where: { id: activityParams.activityId, ownerId: userId },
        data: {
          name: activityParams.name,
          description: activityParams.description,
        },
      });
      return activity;
    },

    deleteOne: async (userId: string, activityId: string) => {
      const activity = await prisma.activity.delete({
        where: { id: activityId, ownerId: userId },
      });
      return activity;
    },

    complete: async (userId: string, activityId: string) => {
      const activity = await prisma.activity.update({
        where: { id: activityId, ownerId: userId },
        data: {
          completions: {
            create: {
              completedAt: new Date(),
              userId,
            },
          }
        },
        include: {
          completions: true,
        }
      });
      return activity;
    },
  };
};
