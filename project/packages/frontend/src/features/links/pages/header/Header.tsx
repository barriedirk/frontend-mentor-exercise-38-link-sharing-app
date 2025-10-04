import './Header.css';

import clsx from 'clsx';

import Icon from '@src/components/icon/Icon';

export default function Header() {
  return (
    <div className="header">
      <nav className="header__navigation">
        <div className="header__logo">
          <Icon name="LogoDevlinksLarge" className="header__icon--logo" />
          <h1 className="sr-only">devlinks App</h1>
        </div>

        <div className="header__tabs flex items-center gap-2">
          <button
            type="button"
            aria-current="false"
            className="flex-row-center tab"
            title="Links"
          >
            <Icon name="IconLinksHeader" className="header__icon" />
            <span className="header__text text-preset-3-semibold">Links</span>
          </button>

          <button
            type="button"
            aria-current="true"
            className="flex-row-center tab tab--current"
            title="Profile Details"
          >
            <Icon name="IconPreviewHeader" className="header__icon" />
            <span className="header__text text-preset-3-semibold">
              Profile Details
            </span>
          </button>
        </div>

        <div className="header__preview">
          <button
            type="button"
            className="button button--secondary h-[52px] min-h-[52px] min-w-[52px]"
            title="Preview"
          >
            <Icon name="IconPreviewHeader" className="header__icon" />
            <span className="header__text text-preset-3-semibold">Preview</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
