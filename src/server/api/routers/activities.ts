import { activityIdentifierSchema, activityModificationParamsSchema, activityUpdateParamsSchema } from "~/schemas/activities";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { activitiesService } from "~/server/services/activities";

export const activitiesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(activityModificationParamsSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().create(ctx.session.user.id, input),
    ),

  updateOne: protectedProcedure
    .input(activityUpdateParamsSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().updateOne(ctx.session.user.id, input),
    ),

  deleteOne: protectedProcedure
    .input(activityIdentifierSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().deleteOne(ctx.session.user.id, input.activityId),
    ),

  complete: protectedProcedure
    .input(activityIdentifierSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().complete(ctx.session.user.id, input.activityId),
    ),
});
