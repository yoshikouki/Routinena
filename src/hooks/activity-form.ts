"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Activity } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  activityModificationParamsSchema,
  type ActivityModificationParams,
} from "~/schemas/activities";
import { api } from "~/utils/api";
import { type ActivityWithCompletions } from "./activities";

export interface UseActivityForm {
  activity?: Activity;
  onSubmit?: (params: ActivityWithCompletions) => void;
  onCancel?: () => void;
}

export const useActivityForm = (props?: UseActivityForm) => {
  const activity = props && props.activity;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityModificationParams>({
    defaultValues: {
      name: activity?.name || "",
      description: activity?.description || "",
    },
    resolver: zodResolver(activityModificationParamsSchema),
  });

  const pathname = usePathname();
  const apiUtils = api.useContext();
  const procedure = activity ? api.activities.updateOne : api.activities.create;
  const mutation = procedure.useMutation({
    onSuccess: (data: ActivityWithCompletions) => {
      if (props?.onSubmit) {
        props.onSubmit(data);
      }
      void apiUtils.activities.getAll.invalidate();
      if (!pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
      }
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutateAsync({
      ...data,
      activityId: activity ? activity.id : "",
    });
  });

  const onCancel = props?.onCancel
    ? props?.onCancel
    : () => router.push("/dashboard");

  return {
    control,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
  };
};
