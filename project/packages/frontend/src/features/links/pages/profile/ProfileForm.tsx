import styles from './ProfileForm.module.css';

import clsx from 'clsx';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { profileFormSchema, type ProfileFormValues } from './schemas/profile';

import { User } from '@src/models/User';

import InputForm from '@src/components/forms/fields/InputForm';
import ChecboxForm from '@src/components/forms/fields/ChecboxForm';
import { useEffect, useMemo, useRef } from 'react';
import { shallowEqual } from '@src/shared/utils';

interface ProfileFormProps {
  onChange: (profile: User, isValid: boolean) => void;
  profile: User;
}

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      updatePassword: false,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      slug: profile.slug,
      email: profile.email.trim(),
      password: '',
      confirmPassword: '',
    },
  });

  const prevIsValidRef = useRef<boolean>(false);
  const prevDataRef = useRef<User | null>(null);
  const prevUpdatePasswordRef = useRef<boolean>(false);

  const watched = useWatch({ control });

  const updatePassword = useWatch({
    control,
    name: 'updatePassword',
  });

  useEffect(() => {
    const newData: User = {
      email: watched.email ?? '',
      firstName: watched.firstName ?? '',
      lastName: watched.lastName ?? '',
      slug: watched.slug ?? '',
      password: updatePassword ? watched.password ?? '' : '',
    };

    const hasChanged = !shallowEqual(prevDataRef.current, newData);

    if (
      hasChanged ||
      prevUpdatePasswordRef.current !== updatePassword ||
      isValid !== prevIsValidRef.current
    ) {
      prevDataRef.current = newData;
      prevUpdatePasswordRef.current = updatePassword;
      prevIsValidRef.current = isValid;

      onChange(newData, isValid);
    }
  }, [watched, onChange, isValid, updatePassword]);

  return (
    <form
      className={clsx(
        styles['profile-form'],
        'flex flex-col gap-5 px-4 py-6 mb-5'
      )}
    >
      <ChecboxForm<ProfileFormValues>
        name="updatePassword"
        control={control}
        label="Update Password"
        error={errors.updatePassword}
      />

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

      {updatePassword && (
        <>
          <InputForm<ProfileFormValues>
            name="password"
            control={control}
            label="Update password"
            type="password"
            error={errors.password}
            autoComplete="password"
            icon="IconPassword"
            placeholder="At least 8 characters"
          />

          <InputForm<ProfileFormValues>
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword}
            autoComplete="confirmPassword"
            icon="IconPassword"
            placeholder="At least 8 characters"
            helperText="Password must contain at least 8 characters"
          />
        </>
      )}
    </form>
  );
}
