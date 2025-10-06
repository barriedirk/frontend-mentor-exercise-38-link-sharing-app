import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Email is invalid'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
