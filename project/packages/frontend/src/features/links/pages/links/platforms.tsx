import { Option } from '@src/components/forms/fields/SelectForm';

import Icon from '@src/components/icon/Icon';

export const platforms: Option[] = [
  {
    value: 'Github',
    label: 'Github',
    icon: <Icon name="IconGithub" />,
  },
  {
    value: 'Gitlab',
    label: 'Gitlab',
    icon: <Icon name="IconGitlab" />,
  },
  {
    value: 'Youtube',
    label: 'Youtube',
    icon: <Icon name="IconYoutube" />,
  },
];
