import { z } from "zod";

export const activityRequestSchema = z.object({
  activityId: z.string().trim(),
});
export type ActivityRequest = z.infer<typeof activityRequestSchema>;

export const newActivityRequestSchema = z.object({
  name: z.string().max(255).trim(),
  description: z.string().max(2000).trim().optional(),
});
export type NewActivityRequest = z.infer<typeof newActivityRequestSchema>;
