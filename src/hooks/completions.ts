"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";

export type Completions = RouterOutputs["completions"]["getAll"];

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

  const dailyCompletions = completions.reduce(
    (acc, completion) => {
      const key = format(new Date(completion.completedAt), "yyyy-MM-dd");
      return {
        ...acc,
        [key]: {
          completions: [completion, ...(acc[key]?.completions || [])],
        },
      };
    },
    {} as Record<
      string,
      {
        completions: Completions;
      }
    >,
  );

  useEffect(() => {
    if (!fetchedCompletions) return;
    setCompletions(fetchedCompletions);
  }, [fetchedCompletions]);

  return {
    completions,
    last24HoursCompletions,
    dailyCompletions,
    isLoading,
    isFetching,
  };
};

