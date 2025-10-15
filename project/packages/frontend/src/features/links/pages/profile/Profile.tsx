import clsx from 'clsx';

import styles from './Profile.module.css';

import ProfilePicture from './ProfilePicture';
import ProfileForm from './ProfileForm';

import { useProfileStore } from '@src/store/useProfileStore';
import { useState } from 'react';
import { User } from '@src/models/User';
import { loadingSignal } from '@src/services/loadingSignal';
import { updateProfile } from '@src/services/profileApi';
import { useSignals } from '@preact/signals-react/runtime';

export default function Profile() {
  useSignals();

  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);

  const [isValidForm, setIsValidForm] = useState(false);

  const onChangeProfile = (profile: User, isValid: boolean) => {
    updateProfile(profile);
    setIsValidForm(isValid);
  };

  const save = async () => {
    if (!isValidForm || !profile) return;

    console.log(profile);

    loadingSignal.show();

    try {
      const value = await updateProfile(profile);

      console.log('@fetchedLinks => ', value);
    } catch (error) {
      console.error('Failed to save links', error);
    } finally {
      loadingSignal.hide();
    }
  };

  return (
    <>
      <h2
        id="profile-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Profile Details
      </h2>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <ProfilePicture profile={profile!} />

      <ProfileForm
        profile={profile!}
        onChange={(profile, isValid) => onChangeProfile(profile, isValid)}
      />

      <div id="link-actions" className={clsx(styles['link-actions'], 'mt-5')}>
        <button
          disabled={!isValidForm}
          className="button button--primary w-full"
          type="button"
          aria-label="Save"
          onClick={() => save()}
        >
          Save
        </button>
      </div>
    </>
  );
}
