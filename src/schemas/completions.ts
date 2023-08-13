import { z } from "zod";

export const completionIdentifierSchema = z.object({
  completionId: z.string().trim(),
});
export type ActivityIdentifier = z.infer<typeof completionIdentifierSchema>;
