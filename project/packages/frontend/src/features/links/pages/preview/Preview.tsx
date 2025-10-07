import './Preview.css';

import Icon from '@src/components/icon/Icon';

import IllustrationPhoneMockup from '@src/components/svg/IllustrationPhoneMockup';

export default function Preview() {
  return (
    <div className="preview-wrapper">
      <IllustrationPhoneMockup className="phone-svg" />

      <div className="preview-wrapper__image">
        <img src="/assets/avatar.png" alt="Profile" className="profile-image" />
      </div>

      <div className="preview-wrapper__profile">
        <p className="text-preset-2 text-grey-950">Ben Wright</p>
        <p className="text-preset-4 text-grey-500">ben@example.com</p>
      </div>

      <div className="preview-wrapper__links">
        <ul className="profile__links">
          <li className="profile__link text-preset-4 text-white bg-black">
            <button type="button">
              <Icon name="IconGithub" className="text-white" />
              <span>GitHub</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto   icon-arrow-right"
              />
            </button>
          </li>
          <li className="profile__link text-preset-4 text-white bg-blue-800">
            <button type="button">
              <Icon name="IconFrontendMentor" className="text-white" />
              <span>Frontend Mentor</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto icon-arrow-right"
              />
            </button>
          </li>
          <li className="profile__link text-preset-4 text-white bg-red-550">
            <button type="button">
              <Icon name="IconYoutube" className="text-white" />
              <span>Youtube</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto icon-arrow-right"
              />
            </button>
          </li>
          <li className="profile__link text-preset-4 text-white bg-blue-500">
            <button type="button">
              <Icon name="IconLinkedin" className="text-white" />
              <span>Linkedin</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto icon-arrow-right"
              />
            </button>
          </li>
          <li className="profile__link text-preset-4 text-white bg-red-550">
            <button type="button">
              <Icon name="IconYoutube" className="text-white" />
              <span>Youtube</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto icon-arrow-right"
              />
            </button>
          </li>
          <li className="profile__link text-preset-4 text-white bg-red-550">
            <button type="button">
              <Icon name="IconYoutube" className="text-white" />
              <span>Youtube</span>
              <Icon
                name="IconArrowRight"
                className="text-white ml-auto icon-arrow-right"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
