import { z } from "zod";

export const newActivityRequestSchema = z.object({
  name: z.string().max(255).trim(),
  description: z.string().optional(),
});
export type NewActivityRequest = z.infer<typeof newActivityRequestSchema>;
