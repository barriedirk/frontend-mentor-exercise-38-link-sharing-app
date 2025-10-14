import { z } from 'zod';

export const profileFormSchema = z
  .object({
    updatePassword: z.boolean(),
    id: z.number().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    slug: z.string().min(5, 'Slug is required'),
    email: z.email('Email is invalid'),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.updatePassword) {
      if (!data.password) {
        ctx.addIssue({
          path: ['password'],
          code: 'custom',
          message: 'Password is required',
        });
      } else if (
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

      if (!data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: 'Confirm Password is required',
        });
      } else if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: 'The passwords are different',
        });
      }
    }
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
