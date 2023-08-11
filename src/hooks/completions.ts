"use client";

import { api } from "~/utils/api";

export const useCompletions = () => {
  const { data: fetchedCompletions, isLoading } =
    api.completions.getAll.useQuery();

  return {
    completions: fetchedCompletions,
    isLoading,
  };
};
