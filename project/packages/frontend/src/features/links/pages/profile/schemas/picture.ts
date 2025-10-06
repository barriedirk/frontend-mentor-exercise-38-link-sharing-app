import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// export const profilePictureSchema = z.object({
//   picture: z
//     .any()
//     .refine((file) => file?.length === 1, 'Image is required')
//     .refine(
//       (file) => file && file[0]?.size <= MAX_FILE_SIZE,
//       'Max file size is 5MB'
//     )
//     .refine(
//       (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
//       'Only .jpg, .png, .webp formats are supported'
//     ),
// });

export const profilePictureSchema = z.object({
  picture: z
    .custom<FileList>()
    .refine((file) => file?.length === 1, 'Image is required')
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      'Only .jpg, .png, .webp formats are supported'
    ),
});

export type ProfilePictureValues = z.infer<typeof profilePictureSchema>;
