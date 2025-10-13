import { z } from 'zod';

export const idSchema = z.object({
  id: z.number().min(1, 'Id is required'),
});

export const registerSchema = z.object({
  id: z.number().optional(),
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  slug: z.string().min(1, 'Slug is required'),
  avatar_url: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type IdInput = z.infer<typeof idSchema>;
