import { newActivityRequestSchema } from "~/schemas/activities";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { activitiesService } from "~/server/services/activities";

export const activitiesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    activitiesService().getAll(ctx.session.user.id),
  ),

  create: protectedProcedure
    .input(newActivityRequestSchema)
    .mutation(({ ctx, input }) => activitiesService().create(ctx.session.user.id, input)),
});
