import {
  completionIdentifierSchema,
  completionUpdateParamsSchema,
} from "~/schemas/completions";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { completionsService } from "~/server/services/completions";

export const completionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    completionsService().getAll(ctx.session.user.id),
  ),

  update: protectedProcedure
    .input(completionUpdateParamsSchema)
    .mutation(({ ctx, input }) =>
      completionsService().update({
        userId: ctx.session.user.id,
        ...input,
      }),
    ),

  delete: protectedProcedure
    .input(completionIdentifierSchema)
    .mutation(({ ctx, input }) =>
      completionsService().delete(ctx.session.user.id, input.completionId),
    ),
});
