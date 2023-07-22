"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ActivityModificationRequest,
  activityModificationRequestSchema,
} from "~/schemas/activities";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { type Activity } from "@prisma/client";

export type UseActivityForm = {
  activity?: Activity;
  onSubmit?: () => void;
  onCancel?: () => void;
};
export const useActivityForm = (props?: UseActivityForm) => {
  const activity = props && props.activity;
  const { control, handleSubmit } = useForm<ActivityModificationRequest>({
    defaultValues: {
      name: activity?.name || "",
      description: activity?.description || "",
    },
    resolver: zodResolver(activityModificationRequestSchema),
  });
  const mutationUpdate = api.activities.updateOne.useMutation();
  const mutationCreate = api.activities.create.useMutation();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    if (activity) {
      mutationUpdate.mutate({
        activityId: activity.id,
        ...data,
      });
    } else {
      mutationCreate.mutate(data);
    }

    if (props?.onSubmit) {
      props.onSubmit();
    } else {
      router.push("/dashboard");
    }
  });

  const onCancel = () => {
    if (props?.onCancel) {
      props.onCancel();
    } else {
      router.push("/dashboard");
    }
  };

  return {
    control,
    onSubmit,
    onCancel,
  };
};
