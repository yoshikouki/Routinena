"use client";

import { api } from "~/utils/api";

export const useActivities = () => {
  const { data: activities } = api.activities.getAll.useQuery();

  return {
    activities,
  };
};
