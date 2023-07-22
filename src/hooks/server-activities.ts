import { activitiesService } from "~/server/services/activities";
import { notFound } from "next/navigation";
import { useServerSession } from "./server-session";

export const useServerActivities = {
  getAll: async () => {
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
