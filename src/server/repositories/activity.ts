import { type Activity, type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "./../db";
import { type NewActivityRequest } from "~/schemas/activities";

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
      newActivityParams: NewActivityRequest,
    ): Promise<Activity> => {
      const activity = await prisma.activity.create({
        data: {
          ownerId: userId,
          ...newActivityParams,
        },
      });
      return activity;
    },
  };
};
