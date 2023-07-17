import { type Activity, type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "./../db";

interface Props {
  prisma?: PrismaClient;
}

export const activityRepository = (props?: Props) => {
  const prisma: PrismaClient = props?.prisma || prismaClient;

  return {
    getAll: async (userId: string): Promise<Activity[]> => {
      const activities = await prisma.activity.findMany({
        where: { ownerId: userId },
      });
      return activities;
    },
  };
};
