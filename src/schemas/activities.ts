import { z } from "zod";

export const activityIdentifierSchema = z.object({
  activityId: z.string().trim(),
});
export type ActivityIdentifier = z.infer<typeof activityIdentifierSchema>;

export const activityModificationRequestSchema = z.object({
  name: z.string().max(255).trim(),
  description: z.string().max(2000).trim().nullable(),
});
export type ActivityModificationRequest = z.infer<
  typeof activityModificationRequestSchema
>;

export const activityUpdateRequestSchema =
  activityModificationRequestSchema.merge(activityIdentifierSchema);
export type ActivityUpdateRequest = z.infer<typeof activityUpdateRequestSchema>;
