import { type PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "../db";
import { type CompletionUpdateParams } from "../services/completions";

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

    update: async (params: CompletionUpdateParams) => {
      const completion = await prisma.completion.update({
        where: { id: params.completionId, userId: params.userId },
        data: { completedAt: params.completedAt },
      });
      return completion;
    },

    delete: async (userId: string, completionId: string) => {
      const completion = await prisma.completion.delete({
        where: { id: completionId, userId },
      });
      return completion;
    },
  };
};
