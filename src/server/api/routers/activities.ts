import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { activitiesService } from "~/server/services/activities";

export const activitiesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    activitiesService().getAll(ctx.session.user.id),
  ),
});
