import React from 'react';

import Codepen from './icons/Codepen';
import Codewars from './icons/Codewars';
import Devto from './icons/Devto';
import Facebook from './icons/Facebook';
import Freecodecamp from './icons/Freecodecamp';
import FrontendMentor from './icons/FrontendMentor';
import Github from './icons/Github';
import Gitlab from './icons/Gitlab';
import Hashnode from './icons/Hashnode';
import Linkedin from './icons/Linkedin';
import StackOverflow from './icons/StackOverflow';
import Twitch from './icons/Twitch';
import Twitter from './icons/Twitter';
import Youtube from './icons/Youtube';

import IconRemove from './icons/IconRemove';
import IconArrowRight from './icons/IconArrowRight';
import IconChangesSaved from './icons/IconChangesSaved';
import IconChevronDown from './icons/IconChevronDown';
import IconDragAndDrop from './icons/IconDragAndDrop';
import IconEmail from './icons/IconEmail';
import IconLink from './icons/IconLink';
import IconLinkCopiedToClipboard from './icons/IconLinkCopiedToClipboard';
import IconLinksHeader from './icons/IconLinksHeader';
import IconPassword from './icons/IconPassword';
import IconPreviewHeader from './icons/IconPreviewHeader';
import IconProfileDetailsHeader from './icons/IconProfileDetailsHeader';
import IconUploadImage from './icons/IconUploadImage';

export interface IconProps {
  name:
    | 'Codepen'
    | 'Codewars'
    | 'Devto'
    | 'Facebook'
    | 'Github'
    | 'Gitlab'
    | 'Hashnode'
    | 'Freecodecamp'
    | 'FrontendMentor'
    | 'StackOverflow'
    | 'Twitch'
    | 'Twitter'
    | 'Youtube'
    | 'IconLink'
    | 'IconRemove'
    | 'IconArrowRight'
    | 'IconChangesSaved'
    | 'IconChevronDown'
    | 'IconDragAndDrop'
    | 'IconEmail'
    | 'IconLinkCopiedToClipboard'
    | 'Linkedin'
    | 'IconLinksHeader'
    | 'IconPassword'
    | 'IconPreviewHeader'
    | 'IconProfileDetailsHeader'
    | 'IconUploadImage'
    | 'LogoDevlinksLarge'
    | 'LogoDevlinksSmall';
  className?: string;
  alt?: string;
}

const spriteIcons = [
  'Codepen',
  'Codewars',
  'Devto',
  'Facebook',
  'Freecodecamp',
  'FrontendMentor',
  'Github',
  'Gitlab',
  'Hashnode',
  'Linkedin',
  'StackOverflow',
  'Twitch',
  'Twitter',
  'Youtube',
  'IconRemove',
  'IconArrowRight',
  'IconChangesSaved',
  'IconChevronDown',
  'IconDragAndDrop',
  'IconEmail',
  'IconLink',
  'IconLinkCopiedToClipboard',
  'IconLinksHeader',
  'IconPassword',
  'IconPreviewHeader',
  'IconProfileDetailsHeader',
  'IconUploadImage',
];

const iconMap = {
  LogoDevlinksLarge: new URL(
    '../../assets/logo-devlinks-large.svg',
    import.meta.url
  ).href,
  LogoDevlinksSmall: new URL(
    '../../assets/logo-devlinks-small.svg',
    import.meta.url
  ).href,
  Codepen: Codepen,
  Codewars: Codewars,
  Devto: Devto,
  Facebook: Facebook,
  Freecodecamp: Freecodecamp,
  FrontendMentor: FrontendMentor,
  Github: Github,
  Gitlab: Gitlab,
  Hashnode: Hashnode,
  StackOverflow: StackOverflow,
  Twitch: Twitch,
  Twitter: Twitter,
  Youtube: Youtube,
  Linkedin: Linkedin,
  IconRemove: IconRemove,
  IconArrowRight: IconArrowRight,
  IconChangesSaved: IconChangesSaved,
  IconChevronDown: IconChevronDown,
  IconLink: IconLink,
  IconDragAndDrop: IconDragAndDrop,
  IconEmail: IconEmail,
  IconLinkCopiedToClipboard: IconLinkCopiedToClipboard,
  IconLinksHeader: IconLinksHeader,
  IconPassword: IconPassword,
  IconPreviewHeader: IconPreviewHeader,
  IconProfileDetailsHeader: IconProfileDetailsHeader,
  IconUploadImage: IconUploadImage,
};

export default function Icon({ name, className, alt }: IconProps) {
  const src = iconMap[name];

  if (spriteIcons.includes(name) && typeof src !== 'string') {
    const Component = iconMap[name] as React.FC<React.SVGProps<SVGSVGElement>>;

    return <Component className={className} aria-label={alt || name} />;
  }

  return <img src={src as string} className={className} alt={alt || name} />;
}
