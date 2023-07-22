import { activityIdentifierSchema, activityModificationRequestSchema, activityUpdateRequestSchema } from "~/schemas/activities";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { activitiesService } from "~/server/services/activities";

export const activitiesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(activityModificationRequestSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().create(ctx.session.user.id, input),
    ),

  updateOne: protectedProcedure
    .input(activityUpdateRequestSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().updateOne(ctx.session.user.id, input),
    ),

  deleteOne: protectedProcedure
    .input(activityIdentifierSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().deleteOne(ctx.session.user.id, input.activityId),
    ),
});
