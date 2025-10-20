import './PreviewProfile.css';

import clsx from 'clsx';
import Icon, { IconProps } from '../icon/Icon';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '@src/shared/utils';
import useChangeBodyStyle from '@src/hooks/useChangeBodyStyle';
import { FullProfile } from '@src/models/FullProfile';

interface PreviewProfileProps {
  fullProfile: FullProfile;
  showBackToEditor?: boolean;
  showshareLink?: boolean;
}

const HOST = import.meta.env.VITE_HOST;

export function PreviewProfile({
  fullProfile: { user, links },
  showshareLink = false,
  showBackToEditor = false,
}: PreviewProfileProps) {
  useChangeBodyStyle('background-color: var(--clr-grey-50)');

  const navigate = useNavigate();

  const shareLink = () => {
    toast.loading('Share Link copied.');

    const host = `${HOST}/view/${user.slug}`;

    copyTextToClipboard(host);
  };

  return (
    <div className="preview-profile">
      <header className="preview-profile__header max-w-[1392px] mx-auto bg-white z-10 relative md:bg-grey-50">
        <nav
          className="preview-profile__navigqtor"
          aria-label="Profile controls"
        >
          <ul className="preview-profile__control-list flex flex-row justify-between p-5">
            {showBackToEditor && (
              <li>
                <button
                  className="preview-profile__btn-back-editor button button--secondary px-4"
                  aria-label="Back to profile editor"
                  type="button"
                  onClick={() => navigate('/')}
                >
                  Back to Editor
                </button>
              </li>
            )}
            {showshareLink && (
              <li>
                <button
                  className="preview-profile__btn-share-link button button--primary px-4"
                  aria-label="Copy shareable link"
                  type="button"
                  onClick={shareLink}
                >
                  Share Link
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <section className="preview-profile__wrapper p-10  rounded-3xl max-w-[349px] mx-auto bg-white z-10 relative">
        <section
          className="preview-profile__avatar flex items-center justify-center"
          aria-label="User avatar"
        >
          <img
            src={user.avatarUrl}
            alt={`Avatar of ${user.firstName} ${user.lastName}`}
            className="preview-profile__image h-[104px] w-[104px] rounded-full border-purple-600 border flex justify-center items-center text-center"
          />
        </section>
        <section
          className="preview-profile__information flex flex-col justify-center items-center mt-7"
          aria-labelledby="profile-name"
        >
          <p
            id="profile-name"
            className="text-preset-1 text-grey-950 text-ellipsis overflow-hidden whitespace-nowrap px-4"
            aria-label="Full Name"
          >
            {`${user.firstName} ${user.lastName}`}
          </p>
          <p
            className="text-preset-3-regular text-grey-500 text-ellipsis overflow-hidden whitespace-nowrap px-4 mt-4"
            aria-label={`Email of ${user.firstName} ${user.lastName}`}
          >
            {user.email}
          </p>
        </section>
        <section
          className="preview-profile__links mt-12"
          aria-labelledby="profile-links"
        >
          <h2 id="profile-links" className="sr-only">
            External profile links
          </h2>
          <ul className="profile__links flex flex-col gap-7">
            {links.map(({ platform, url, id }, index) => (
              <li
                key={id}
                className={clsx(
                  'profile__link text-preset-4 platform w-full rounded-xl h-[56px] p-2',
                  platform.toLowerCase()
                )}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${platform} profile`}
                  className="flex justify-start gap-2 items-center w-full text-preset-3-regular px-5"
                >
                  <Icon
                    name={platform as IconProps['name']}
                    className="text-white"
                    aria-hidden="true"
                  />
                  <span className="">{platform}</span>
                  <Icon
                    name="IconArrowRight"
                    className="text-white ml-auto icon-arrow-right"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
