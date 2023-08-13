"use client";

import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";

export type Completions = RouterOutputs["completions"]["getAll"];
export type Completion = Completions[number];

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

export const useCompletion = (fetchedCompletion: Completion) => {
  const completion = {
    ...fetchedCompletion,
  };

  const [isEditing, setIsEditing] = useState(false);
  const onEdit = useCallback(() => setIsEditing(true), []);
  const onCancelEdit = useCallback(() => setIsEditing(false), []);

  const onUpdate = useCallback(
    (data: Partial<Completion>) => {
      console.log(data);
      onCancelEdit();
    },
    [onCancelEdit],
  );

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const onOpenDeleteConfirm = useCallback(() => setOpenDeleteConfirm(true), []);
  const onCloseDeleteConfirm = useCallback(
    () => setOpenDeleteConfirm(false),
    [],
  );

  const apiUtils = api.useContext();
  const { mutate: deleteMutation } = api.completions.delete.useMutation({
    onSuccess: () => {
      void apiUtils.completions.getAll.invalidate();
      onCancelEdit();
      onCloseDeleteConfirm();
    },
  });
  const onDelete = useCallback(
    () => deleteMutation({ completionId: completion.id }),
    [completion.id, deleteMutation],
  );

  return {
    completion,
    isEditing,
    onEdit,
    onCancelEdit,
    onUpdate,
    onDelete,
    openDeleteConfirm,
    onOpenDeleteConfirm,
    onCloseDeleteConfirm,
  };
};

