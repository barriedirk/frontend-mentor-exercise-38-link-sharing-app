import { z } from 'zod';

export const profileFormSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  slug: z.string().min(5, 'Slug is required'),
  email: z.email('Email is invalid'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
