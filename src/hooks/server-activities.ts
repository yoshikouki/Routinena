import { notFound } from "next/navigation";
import { activitiesService } from "~/server/services/activities";
import { type ActivitiesWithCompletions } from "./activities";
import { useServerSession } from "./server-session";

export const useServerActivities = {
  getAll: async (): Promise<ActivitiesWithCompletions> => {
    const session = await useServerSession.get();
    const activities = await activitiesService().getAll(session.user.id);
    return activities;
  },

  getOne: async (activityId: string) => {
    const session = await useServerSession.get();
    const activity = await activitiesService().getOne(
      session.user.id,
      activityId,
    );
    if (!activity) {
      notFound();
    }
    return activity;
  },
};
