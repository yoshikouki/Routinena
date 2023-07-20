import { z } from "zod";

export const activityIdentifierSchema = z.object({
  activityId: z.string().trim(),
});
export type ActivityIdentifier = z.infer<typeof activityIdentifierSchema>;

export const activityModificationRequestSchema = z.object({
  name: z.string().max(255).trim(),
  description: z.string().max(2000).trim().optional(),
});
export type ActivityModificationRequest = z.infer<typeof activityModificationRequestSchema>;
