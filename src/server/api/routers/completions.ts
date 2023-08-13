import { completionIdentifierSchema } from "~/schemas/completions";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { completionsService } from "~/server/services/completions";

export const completionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    completionsService().getAll(ctx.session.user.id),
  ),

  delete: protectedProcedure
    .input(completionIdentifierSchema)
    .mutation(({ ctx, input }) =>
      completionsService().delete(ctx.session.user.id, input.completionId),
    ),
});
