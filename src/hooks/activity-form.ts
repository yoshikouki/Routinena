"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  activityModificationRequestSchema,
  activityUpdateRequestSchema,
} from "~/schemas/activities";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { type Activity } from "@prisma/client";

export const useActivityForm = (props?: {
  activity?: Activity;
  onSubmit?: () => void;
}) => {
  const activity = props && props.activity;
  const formProps = activity
    ? {
        defaultValues: {
          activityId: activity.id,
          name: activity.name,
          description: activity.description,
        },
        resolver: zodResolver(activityUpdateRequestSchema),
      }
    : {
        defaultValues: {
          name: "",
          description: "",
        },
        resolver: zodResolver(activityModificationRequestSchema),
      };
  const { control, handleSubmit } = useForm(formProps);
  const mutation = props?.activity
    ? api.activities.updateOne.useMutation()
    : api.activities.create.useMutation();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    if (props?.onSubmit) {
      props.onSubmit();
    } else {
      router.push("/dashboard");
    }
  });

  return {
    control,
    onSubmit,
  };
};
