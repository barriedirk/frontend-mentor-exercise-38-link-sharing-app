import { z } from 'zod';

export const linkFormSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.url().min(1, 'Url is required'),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;
