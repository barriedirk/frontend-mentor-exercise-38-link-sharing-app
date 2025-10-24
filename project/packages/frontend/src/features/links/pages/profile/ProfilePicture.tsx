import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import clsx from 'clsx';

import styles from './ProfilePicture.module.css';

import {
  profilePictureSchema,
  type ProfilePictureValues,
} from './schemas/picture';
import FileUploadForm from '@src/components/forms/fields/FileUploadForm';

import { User } from '@src/models/User';
import { useEffect } from 'react';

interface ProfilePictureProps {
  onChange: (avatar: FileList | undefined) => void;
  profile: User;
}
export default function ProfilePicture({
  profile,
  onChange,
}: ProfilePictureProps) {
  const {
    control,
    formState: { errors },
  } = useForm<ProfilePictureValues>({
    resolver: zodResolver(profilePictureSchema),
    mode: 'onChange',
  });

  const picture = useWatch({
    control,
    name: 'picture',
  });

  useEffect(() => {
    onChange(picture);
  }, [picture, onChange]);

  return (
    <form
      className={clsx(
        styles['picture-form'],
        'flex flex-col gap-2 px-4 py-6 mb-5 overflow-hidden'
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
        currentImage={profile.avatarUrl ?? undefined}
        dataTestid="picture"
      />
    </form>
  );
}
