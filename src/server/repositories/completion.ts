import { type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "../db";

interface Props {
  prisma?: PrismaClient;
}

export const completionRepository = (props?: Props) => {
  const prisma: PrismaClient = props?.prisma || prismaClient;

  return {
    getAll: async (userId: string) => {
      const completions = await prisma.completion.findMany({
        where: { userId },
        select: {
          id: true,
          completedAt: true,
          activity: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
        orderBy: {
          completedAt: "desc",
        },
      });
      return completions;
    },

    delete: async (userId: string, completionId: string) => {
      const completion = await prisma.completion.delete({
        where: { id: completionId, userId },
      });
      return completion;
    },
  };
};
