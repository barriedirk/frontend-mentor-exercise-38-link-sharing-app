import { z } from 'zod';

export const linkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url({ message: 'Must be a valid URL' }),
  position: z.number().optional(),
});

export const linkArraySchema = z.array(linkSchema);

export type LinkInput = z.infer<typeof linkSchema>;
