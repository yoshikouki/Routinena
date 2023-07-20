import { activityRequestSchema, newActivityRequestSchema } from "~/schemas/activities";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { activitiesService } from "~/server/services/activities";

export const activitiesRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(activityRequestSchema)
    .query(({ ctx, input }) => activitiesService().getOne(ctx.session.user.id, input)),

  getAll: protectedProcedure.query(({ ctx }) =>
    activitiesService().getAll(ctx.session.user.id),
  ),

  create: protectedProcedure
    .input(newActivityRequestSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().create(ctx.session.user.id, input),
    ),

  deleteOne: protectedProcedure
    .input(activityRequestSchema)
    .mutation(({ ctx, input }) =>
      activitiesService().deleteOne(ctx.session.user.id, input),
    ),
});
