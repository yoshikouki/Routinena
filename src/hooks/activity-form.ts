"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ActivityModificationRequest, activityModificationRequestSchema } from "~/schemas/activities";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

export const useActivityForm = () => {
  const { control, handleSubmit } = useForm<ActivityModificationRequest>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(activityModificationRequestSchema),
  });
  const mutation = api.activities.create.useMutation();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    router.push("/dashboard");
  });

  return {
    control,
    onSubmit,
  };
};
