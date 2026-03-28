import { z } from 'zod';

export const chatRequestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  systemPrompt: z.string().max(1000).optional(),
  temperature: z.number().min(0).max(2).default(0.7)
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
