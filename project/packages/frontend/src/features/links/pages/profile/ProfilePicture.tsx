import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './ProfilePicture.module.css';

import {
  profilePictureSchema,
  type ProfilePictureValues,
} from './schemas/picture';
import FileUploadForm from '@src/components/forms/fields/FileForm';
import clsx from 'clsx';

export default function ProfilePicture() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilePictureValues>({
    resolver: zodResolver(profilePictureSchema),
    mode: 'onChange',
    defaultValues: {
      picture: undefined,
    },
  });

  const onSubmit = (data: ProfilePictureValues) => {
    const file = data.picture?.[0];
    console.log('Uploading file:', file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        styles['picture-form'],
        'flex flex-col gap-2 px-4 py-6 mb-5'
      )}
    >
      <FileUploadForm<ProfilePictureValues>
        name="picture"
        control={control}
        label="Profile picture"
        error={errors.picture}
        helperText="Image must be below 1024x1024px. Use PNG or JPG format."
        icon="IconUploadImage"
        styleName="row"
      />
    </form>
  );
}
