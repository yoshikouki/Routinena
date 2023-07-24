import { type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "./../db";
import { type ActivityUpdateParams, type ActivityModificationParams } from "~/schemas/activities";

interface Props {
  prisma?: PrismaClient;
}

export const activityRepository = (props?: Props) => {
  const prisma: PrismaClient = props?.prisma || prismaClient;

  return {
    getOneWithCompletions: async (userId: string, activityId: string) => {
      const activity = await prisma.activity.findUnique({
        where: { id: activityId, ownerId: userId },
        include: {
          completions: {
            select: {
              id: true,
              completedAt: true,
            },
            orderBy: {
              completedAt: "desc",
            },
          },
        },
      });
      return activity;
    },

    getAllWithLatestCompletion: async (userId: string) => {
      const activities = await prisma.activity.findMany({
        where: { ownerId: userId },
        include: {
          completions: {
            select: {
              id: true,
              completedAt: true,
            },
            orderBy: {
              completedAt: "desc",
            },
            take: 1,
          },
        },
      });
      return activities;
    },

    create: async (
      userId: string,
      newActivityParams: ActivityModificationParams,
    ) => {
      const activity = await prisma.activity.create({
        data: {
          ownerId: userId,
          ...newActivityParams,
        },
        include: {
          completions: {
            select: {
              id: true,
              completedAt: true,
            },
            orderBy: {
              completedAt: "desc",
            },
            take: 1,
          },
        },
      });
      return activity;
    },

    updateOne: async (
      userId: string,
      activityParams: ActivityUpdateParams,
    ) => {
      const activity = await prisma.activity.update({
        where: { id: activityParams.activityId, ownerId: userId },
        data: {
          name: activityParams.name,
          description: activityParams.description,
        },
        include: {
          completions: {
            select: {
              id: true,
              completedAt: true,
            },
            orderBy: {
              completedAt: "desc",
            },
            take: 1,
          },
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
          },
        },
        include: {
          completions: {
            select: {
              id: true,
              completedAt: true,
            },
            orderBy: {
              completedAt: "desc",
            },
            take: 1,
          },
        },
      });
      return activity;
    },
  };
};
