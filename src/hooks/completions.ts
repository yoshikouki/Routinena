"use client";

import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";

type Completions = RouterOutputs["completions"]["getAll"];

export const useCompletions = () => {
  const [completions, setCompletions] = useState<Completions>([]);
  const {
    data: fetchedCompletions,
    isLoading,
    isFetching,
  } = api.completions.getAll.useQuery();
  const last24HoursCompletions =
    fetchedCompletions?.filter(
      (completion) =>
        new Date(completion.completedAt).getTime() >
        new Date().getTime() - 24 * 60 * 60 * 1000,
    ) || [];

  useEffect(() => {
    if (!fetchedCompletions) return;
    setCompletions(fetchedCompletions);
  }, [fetchedCompletions]);

  return {
    completions,
    isLoading,
    isFetching,
    last24HoursCompletions,
  };
};

