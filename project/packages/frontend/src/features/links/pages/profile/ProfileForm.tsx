import clsx from 'clsx';

import styles from './ProfileForm.module.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { profileFormSchema, type ProfileFormValues } from './schemas/profile';

import InputForm from '@src/components/forms/fields/InputForm';

import { useProfileStore } from '@src/store/useProfileStore';
import { User } from '@src/models/User';

interface ProfileFormProps {
  profile: User;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      slug: '',
      email: '',
    },
  });

  return (
    <form
      className={clsx(
        styles['profile-form'],
        'flex flex-col gap-5 px-4 py-6 mb-5'
      )}
    >
      <InputForm<ProfileFormValues>
        name="firstName"
        control={control}
        label="First name*"
        type="text"
        error={errors.firstName}
        autoComplete="firstName"
        placeholder="e.g. Ben"
        styleName="row"
      />

      <InputForm<ProfileFormValues>
        name="lastName"
        control={control}
        label="Last name*"
        type="text"
        error={errors.lastName}
        autoComplete="lastName"
        placeholder="e.g. Wright"
        styleName="row"
      />

      <InputForm<ProfileFormValues>
        name="email"
        control={control}
        label="Email"
        type="text"
        error={errors.lastName}
        autoComplete="email"
        placeholder="e.g. ben@example.com"
        styleName="row"
      />

      <InputForm<ProfileFormValues>
        name="slug"
        control={control}
        label="Slug"
        type="text"
        error={errors.lastName}
        autoComplete="slug"
        placeholder="e.g. ben-wright"
        styleName="row"
      />
    </form>
  );
}
