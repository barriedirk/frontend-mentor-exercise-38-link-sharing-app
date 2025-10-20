import clsx from 'clsx';

import styles from './Profile.module.css';

import ProfilePicture from './ProfilePicture';
import ProfileForm from './ProfileForm';

import { useProfileStore } from '@src/store/useProfileStore';
import { useCallback, useState } from 'react';
import { User } from '@src/models/User';
import { loadingSignal } from '@src/services/loadingSignal';
import { updateProfile as updateProfileApi } from '@src/services/profileApi';
import { useSignals } from '@preact/signals-react/runtime';

import toast from 'react-hot-toast';
import { useLogout } from '@src/hooks/useLogout';

export default function Profile() {
  useSignals();

  const logout = useLogout();

  const profile = useProfileStore((state) => state.profile);
  const avatar = useProfileStore((state) => state.avatar);
  const updateAvatar = useProfileStore((state) => state.updateAvatar);
  const updateProfile = useProfileStore((state) => state.updateProfile);

  const [isValidForm, setIsValidForm] = useState(false);

  const onChangeProfile = useCallback(
    (profile: User, isValid: boolean) => {
      updateProfile(profile);
      setIsValidForm(isValid);
    },
    [updateProfile, setIsValidForm]
  );

  const onChangeAvatar = useCallback(
    (avatar: FileList | undefined) => {
      console.log('onchangeAvatar', avatar);
      if (avatar && avatar.length > 0) {
        updateAvatar(avatar[0]);
      } else {
        updateAvatar(null);
      }
    },
    [updateAvatar]
  );

  const save = async () => {
    if (!isValidForm || !profile) return;

    const idToast = toast.loading('Saving profile ...');

    loadingSignal.show();

    try {
      await updateProfileApi(profile, avatar);

      toast.success('Successed to save Profile', { id: idToast });
    } catch (error) {
      console.error('Failed to save profile', error);

      toast.error('Failed to save Profile', { id: idToast });
    } finally {
      loadingSignal.hide();
    }
  };

  return (
    <>
      <header className="flex items-center gap-6 mb-2.5">
        <h2
          id="profile-heading"
          className="text-preset-2 md:text-preset-1 text-grey-900"
        >
          Profile Details
        </h2>
        <button
          type="button"
          className="button button--small button--secondary px-5"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <ProfilePicture
        profile={profile!}
        onChange={(avatar) => onChangeAvatar(avatar)}
      />

      <ProfileForm
        profile={profile!}
        onChange={(profile, isValid) => onChangeProfile(profile, isValid)}
      />

      <div
        id="profile-actions"
        className={clsx(
          styles['profile-actions'],
          'mt-5 flex flex-row-reverse'
        )}
      >
        <button
          disabled={!isValidForm}
          className="button button--primary w-full  md:w-[85px]"
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
