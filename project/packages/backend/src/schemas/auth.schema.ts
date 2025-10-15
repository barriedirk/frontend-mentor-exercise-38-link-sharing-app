import { z } from 'zod';

export const idSchema = z.object({
  id: z.number().min(1, 'Id is required'),
});

export const registerSchema = z
  .object({
    id: z.number().optional(),
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    slug: z.string().min(1, 'Slug is required'),
    avatar_url: z.string().url().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/.test(
        data.password
      )
    ) {
      ctx.addIssue({
        path: ['password'],
        code: 'custom',
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
    }
  });

export const updateSchema = z
  .object({
    id: z.number().optional(),
    email: z.email(),
    password: z.string().optional(),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    slug: z.string().min(1, 'Slug is required'),
    avatar_url: z.string().url().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/.test(
        data.password
      )
    ) {
      ctx.addIssue({
        path: ['password'],
        code: 'custom',
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
    }
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type IdInput = z.infer<typeof idSchema>;
