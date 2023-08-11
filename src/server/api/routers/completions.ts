import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { completionsService } from "~/server/services/completions";

export const completionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    completionsService().getAll(ctx.session.user.id),
  ),
});
