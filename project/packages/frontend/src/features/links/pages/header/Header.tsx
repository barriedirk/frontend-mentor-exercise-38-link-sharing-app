import './Header.css';

import { useSignals } from '@preact/signals-react/runtime';
import { tabHeader } from '../MainLinksStateSignal';

import clsx from 'clsx';
import Icon from '@src/components/icon/Icon';

import { useNavigate } from 'react-router-dom';

export default function Header() {
  useSignals();

  const navigate = useNavigate();

  const onPreview = () => {
    navigate('/preview');
  };

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
            className={clsx(
              'flex-row-center tab',
              tabHeader.value === 'link' && 'tab--current'
            )}
            title="Links"
            onClick={() => {
              tabHeader.value = 'link';
            }}
          >
            <Icon name="IconLinksHeader" className="header__icon" />
            <span className="header__text text-preset-3-semibold">Links</span>
          </button>

          <button
            type="button"
            aria-current="true"
            className={clsx(
              'flex-row-center tab',
              tabHeader.value === 'profile' && 'tab--current'
            )}
            title="Profile Details"
            onClick={() => {
              tabHeader.value = 'profile';
            }}
          >
            <Icon name="IconProfileDetailsHeader" className="header__icon" />
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
            onClick={onPreview}
          >
            <Icon name="IconPreviewHeader" className="header__icon" />
            <span className="header__text text-preset-3-semibold px-3">
              Preview
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
