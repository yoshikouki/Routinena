"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NewActivityRequest, newActivityRequestSchema } from "~/schemas/activities";

export const useActivityForm = () => {
  const { control, handleSubmit } = useForm<NewActivityRequest>({
    resolver: zodResolver(newActivityRequestSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return {
    control,
    onSubmit,
  };
};
