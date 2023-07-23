import { type Activity } from "@prisma/client";
import { activitiesService } from "~/server/services/activities";
import { notFound } from "next/navigation";
import { useServerSession } from "./server-session";

export type ActivityWithCompletions = Activity & {
  completions: {
    id: string
    completedAt: Date;
  }[];
};
export type ActivitiesWithCompletions = ActivityWithCompletions[];

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
