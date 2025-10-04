import { z } from 'zod';

export const linkFormSchema = z.object({
  option: z.string().min(1, 'Option is required'),
  url: z.url().min(1, 'Url is required'),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;
