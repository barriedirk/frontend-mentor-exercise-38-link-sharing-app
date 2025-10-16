import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import clsx from 'clsx';

import styles from './ProfilePicture.module.css';

import {
  profilePictureSchema,
  type ProfilePictureValues,
} from './schemas/picture';
import FileUploadForm from '@src/components/forms/fields/FileUploadForm';

import { useProfileStore } from '@src/store/useProfileStore';
import { User } from '@src/models/User';

interface ProfilePictureProps {
  onChange: (profile: User) => void;
  profile: User;
}
export default function ProfilePicture({
  profile,
  onChange,
}: ProfilePictureProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilePictureValues>({
    resolver: zodResolver(profilePictureSchema),
    mode: 'onChange',
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
        defaultImage={profile.avatarUrl ?? undefined}
      />
    </form>
  );
}
