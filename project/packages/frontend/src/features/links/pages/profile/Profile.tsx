import clsx from 'clsx';

import styles from './Profile.module.css';

import ProfilePicture from './ProfilePicture';
import ProfileForm from './ProfileForm';

export default function Profile() {
  const save = () => {
    return;
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

      <ProfilePicture />

      <ProfileForm />

      <div id="link-actions" className={clsx(styles['link-actions'], 'mt-5')}>
        <button
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
