import { z } from "zod";

export const completionIdentifierSchema = z.object({
  completionId: z.string().trim(),
});
export type CompletionIdentifier = z.infer<typeof completionIdentifierSchema>;

export const completionUpdateParamsSchema = z
  .object({
    completedAt: z.date(),
  })
  .merge(completionIdentifierSchema);
export type CompletionUpdateParams = z.infer<
  typeof completionUpdateParamsSchema
>;
