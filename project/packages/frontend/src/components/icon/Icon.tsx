import React from 'react';

import IconRemove from './icons/IconRemove';
import IconArrowRight from './icons/IconArrowRight';
import IconChangesSaved from './icons/IconChangesSaved';
import IconChevronDown from './icons/IconChevronDown';
import IconCodepen from './icons/IconCodepen';
import IconCodewars from './icons/IconCodewars';
import IconDevto from './icons/IconDevto';
import IconDragAndDrop from './icons/IconDragAndDrop';
import IconEmail from './icons/IconEmail';
import IconFacebook from './icons/IconFacebook';
import IconFreecodecamp from './icons/IconFreecodecamp';
import IconFrontendMentor from './icons/IconFrontendMentor';
import IconGithub from './icons/IconGithub';
import IconGitlab from './icons/IconGitlab';
import IconHashnode from './icons/IconHashnode';
import IconLink from './icons/IconLink';
import IconLinkCopiedToClipboard from './icons/IconLinkCopiedToClipboard';
import IconLinkedin from './icons/IconLinkedin';
import IconLinksHeader from './icons/IconLinksHeader';
import IconPassword from './icons/IconPassword';
import IconPreviewHeader from './icons/IconPreviewHeader';
import IconProfileDetailsHeader from './icons/IconProfileDetailsHeader';
import IconStackOverflow from './icons/IconStackOverflow';
import IconTwitch from './icons/IconTwitch';
import IconTwitter from './icons/IconTwitter';
import IconUploadImage from './icons/IconUploadImage';
import IconYoutube from './icons/IconYoutube';
import IllustrationEmpty from './icons/IllustrationEmpty';
import IllustrationPhoneMockup from './icons/IllustrationPhoneMockup';

export interface IconProps {
  name:
    | 'IconRemove'
    | 'IconArrowRight'
    | 'IconChangesSaved'
    | 'IconChevronDown'
    | 'IconCodepen'
    | 'IconCodewars'
    | 'IconDevto'
    | 'IconDragAndDrop'
    | 'IconEmail'
    | 'IconFacebook'
    | 'IconFreecodecamp'
    | 'IconFrontendMentor'
    | 'IconGithub'
    | 'IconGitlab'
    | 'IconHashnode'
    | 'IconLink'
    | 'IconLinkCopiedToClipboard'
    | 'IconLinkedin'
    | 'IconLinksHeader'
    | 'IconPassword'
    | 'IconPreviewHeader'
    | 'IconProfileDetailsHeader'
    | 'IconStackOverflow'
    | 'IconTwitch'
    | 'IconTwitter'
    | 'IconUploadImage'
    | 'IconYoutube'
    | 'IllustrationEmpty'
    | 'IllustrationPhoneMockup'
    | 'LogoDevlinksLarge'
    | 'LogoDevlinksSmall';
  className?: string;
  alt?: string;
}

const spriteIcons = [
  'IconRemove',
  'IconArrowRight',
  'IconChangesSaved',
  'IconChevronDown',
  'IconCodepen',
  'IconCodewars',
  'IconDevto',
  'IconDragAndDrop',
  'IconEmail',
  'IconFacebook',
  'IconFreecodecamp',
  'IconFrontendMentor',
  'IconGithub',
  'IconGitlab',
  'IconHashnode',
  'IconLink',
  'IconLinkCopiedToClipboard',
  'IconLinkedin',
  'IconLinksHeader',
  'IconPassword',
  'IconPreviewHeader',
  'IconProfileDetailsHeader',
  'IconStackOverflow',
  'IconTwitch',
  'IconTwitter',
  'IconUploadImage',
  'IconYoutube',
  'IllustrationEmpty',
  'IllustrationPhoneMockup',
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
  IconRemove: IconRemove,
  IconArrowRight: IconArrowRight,
  IconChangesSaved: IconChangesSaved,
  IconChevronDown: IconChevronDown,
  IconCodepen: IconCodepen,
  IconCodewars: IconCodewars,
  IconDevto: IconDevto,
  IconDragAndDrop: IconDragAndDrop,
  IconEmail: IconEmail,
  IconFacebook: IconFacebook,
  IconFreecodecamp: IconFreecodecamp,
  IconFrontendMentor: IconFrontendMentor,
  IconGithub: IconGithub,
  IconGitlab: IconGitlab,
  IconHashnode: IconHashnode,
  IconLink: IconLink,
  IconLinkCopiedToClipboard: IconLinkCopiedToClipboard,
  IconLinkedin: IconLinkedin,
  IconLinksHeader: IconLinksHeader,
  IconPassword: IconPassword,
  IconPreviewHeader: IconPreviewHeader,
  IconProfileDetailsHeader: IconProfileDetailsHeader,
  IconStackOverflow: IconStackOverflow,
  IconTwitch: IconTwitch,
  IconTwitter: IconTwitter,
  IconUploadImage: IconUploadImage,
  IconYoutube: IconYoutube,
  IllustrationEmpty: IllustrationEmpty,
  IllustrationPhoneMockup: IllustrationPhoneMockup,
};

export default function Icon({ name, className, alt }: IconProps) {
  const src = iconMap[name];

  if (spriteIcons.includes(name) && typeof src !== 'string') {
    const Component = iconMap[name] as React.FC<React.SVGProps<SVGSVGElement>>;

    return <Component className={className} aria-label={alt || name} />;
  }

  return <img src={src as string} className={className} alt={alt || name} />;
}
