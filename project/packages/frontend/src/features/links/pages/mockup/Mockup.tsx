import './Mockup.css';

import { getApiUrl } from '@src/shared/getApiUrl';
import Icon, { IconProps } from '@src/components/icon/Icon';

import IllustrationPhoneMockup from '@src/components/svg/IllustrationPhoneMockup';
import { useLinksStore } from '@src/store/useLinksStore';

import { useProfileStore } from '@src/store/useProfileStore';
import clsx from 'clsx';

const API_URL = `${getApiUrl()}/uploads/`;

export default function Mockup() {
  const profile = useProfileStore((state) => state.profile);
  const avatar = useProfileStore((state) => state.avatar);
  const links = useLinksStore((state) => state.links);

  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  const email = profile?.email;
  let picture = '';

  if (avatar) {
    picture = URL.createObjectURL(avatar);
  } else if (profile?.avatarUrl) {
    picture = `${API_URL}${profile?.avatarUrl}`;
  }

  return (
    <div className="preview-wrapper">
      <IllustrationPhoneMockup className="phone-svg" />

      <div className="preview-wrapper__image">
        {picture && (
          <img
            src={picture}
            alt={`Avatar of ${fullName}`}
            className="profile-image"
            title={`${fullName} / ${email}`}
          />
        )}
      </div>

      <div className="preview-wrapper__profile">
        <p
          className="text-preset-2 text-grey-950 text-ellipsis overflow-hidden whitespace-nowrap px-4"
          title={fullName}
        >
          {fullName}
        </p>
        <p
          className="text-preset-4 text-grey-500 text-ellipsis overflow-hidden whitespace-nowrap px-4"
          title={email}
        >
          {email}
        </p>
      </div>

      <div className="preview-wrapper__links">
        <ul className="profile__links">
          {links.map(({ platform, url, id }, index) => (
            <li
              key={id}
              className={clsx(
                'profile__link text-preset-4 platform',
                platform.toLowerCase()
              )}
            >
              <button type="button">
                <Icon
                  name={platform as IconProps['name']}
                  className="text-white"
                />
                <span>{platform}</span>
                <Icon
                  name="IconArrowRight"
                  className="text-white ml-auto icon-arrow-right"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
