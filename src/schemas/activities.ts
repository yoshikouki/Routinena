import { z } from "zod";

export const activityIdentifierSchema = z.object({
  activityId: z.string().trim(),
});
export type ActivityIdentifier = z.infer<typeof activityIdentifierSchema>;

export const activityModificationParamsSchema = z.object({
  name: z.string().max(255).trim(),
  description: z.string().max(2000).trim().nullable(),
});
export type ActivityModificationParams = z.infer<
  typeof activityModificationParamsSchema
>;

export const activityUpdateParamsSchema =
  activityModificationParamsSchema.merge(activityIdentifierSchema);
export type ActivityUpdateParams = z.infer<typeof activityUpdateParamsSchema>;
