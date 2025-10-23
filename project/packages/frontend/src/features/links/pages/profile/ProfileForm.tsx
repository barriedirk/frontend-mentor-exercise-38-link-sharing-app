import styles from './ProfileForm.module.css';

import clsx from 'clsx';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { profileFormSchema, type ProfileFormValues } from './schemas/profile';

import { User } from '@src/models/User';

import InputForm from '@src/components/forms/fields/InputForm';
import ChecboxForm from '@src/components/forms/fields/ChecboxForm';
import { useEffect, useRef } from 'react';
import { shallowEqual } from '@src/shared/utils';
import { useFocusFirstInput } from '@src/hooks/useFocusFirstInput';

interface ProfileFormProps {
  onChange: (profile: User, isValid: boolean) => void;
  profile: User;
}

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputFirstRef = useFocusFirstInput();

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

      if (prevUpdatePasswordRef.current !== updatePassword) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        prevUpdatePasswordRef.current = updatePassword;
      }

      prevIsValidRef.current = isValid;
      onChange(newData, isValid);
    }
  }, [watched, onChange, isValid, updatePassword]);

  return (
    <form
      ref={inputFirstRef}
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
        dataTestid="profile-checkbox-update-password"
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
        dataTestid="profile-first-name"
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
        dataTestid="profile-last-name"
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
        dataTestid="profile-email"
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
        dataTestid="profile-slug"
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
            dataTestid="profile-password"
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
            dataTestid="profile-confirm-password"
          />
        </>
      )}
      <div
        ref={bottomRef}
        className="h-px pointer-events-none select-none"
        aria-hidden="true"
        data-testid="profile-bottom-ref"
      ></div>
    </form>
  );
}
