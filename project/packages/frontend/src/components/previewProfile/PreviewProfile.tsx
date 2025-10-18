import { Link } from '@src/models/Types';
import clsx from 'clsx';
import Icon, { IconProps } from '../icon/Icon';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '@src/shared/utils';

const linksMockup: Link[] = [
  {
    platform: 'Github',
    url: 'https://www.github',
    id: 2,
  },
];

interface PreviewProfileProps {
  showBackToEditor?: boolean;
  showshareLink?: boolean;
}

export function PreviewProfile({
  showshareLink = true,
  showBackToEditor = true,
}: PreviewProfileProps) {
  const navigate = useNavigate();

  const shareLink = () => {
    toast.loading('Share Link copied.');
    copyTextToClipboard('This text will be copied to your clipboard.');
  };

  return (
    <div className="preview-profile">
      <header className="preview-profile__header">
        <nav
          className="preview-profile__navigqtor"
          aria-label="Profile controls"
        >
          <ul className="preview-profile__control-list">
            {showBackToEditor && (
              <li>
                <button
                  className="preview-profile__btn-back-editor"
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
                  className="preview-profile__btn-share-link"
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
      <section className="preview-profile__image" aria-label="User avatar">
        <img
          src="https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/44548/optimized_product_thumb_stage.jpg"
          alt="Avatar of John Doe"
          className="profile-image"
        />
      </section>
      <section
        className="preview-profile__information"
        aria-labelledby="profile-name"
      >
        <p
          id="profile-name"
          className="text-preset-2 text-grey-950 text-ellipsis overflow-hidden whitespace-nowrap px-4"
        >
          John Doe
        </p>
        <p className="text-preset-4 text-grey-500 text-ellipsis overflow-hidden whitespace-nowrap px-4">
          johndoe@email.com
        </p>
      </section>
      <section
        className="preview-profile__links"
        aria-labelledby="profile-links"
      >
        <h2 id="profile-links" className="sr-only">
          External profile links
        </h2>
        <ul className="profile__links">
          {linksMockup.map(({ platform, url, id }, index) => (
            <li
              key={id}
              className={clsx(
                'profile__link text-preset-4 platform',
                platform.toLowerCase()
              )}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform} profile`}
              >
                <Icon
                  name={platform as IconProps['name']}
                  className="text-white"
                  aria-hidden="true"
                />
                <span className="sr-only">{platform}</span>
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
    </div>
  );
}
