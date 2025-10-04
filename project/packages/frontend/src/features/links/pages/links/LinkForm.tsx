import clsx from 'clsx';
import styles from './LinkForm.module.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { linkFormSchema, type LinkFormValues } from './schemas/link';

import InputForm from '@src/components/forms/fields/InputForm';
import SelectForm, { Option } from '@src/components/forms/fields/SelectForm';

import Icon from '@src/components/icon/Icon';

const options: Option[] = [
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

export default function LinkForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
    defaultValues: {
      option: '',
      url: '',
    },
  });

  return (
    <form className={clsx(styles['link-form'], 'flex flex-col gap-2 p-2.5')}>
      <header className="flex justify-between">
        <span className="flex-row-center">
          <Icon name="IconDragAndDrop" />
          Link #1
        </span>

        <button type="button" className="link">
          remove
        </button>
      </header>

      <SelectForm<LinkFormValues>
        name="option"
        control={control}
        label="Platform"
        error={errors.option}
        placeholder="Select Platform"
        options={options}
      />

      <InputForm<LinkFormValues>
        name="url"
        control={control}
        label="Link"
        type="email"
        error={errors.url}
        autoComplete="url"
        icon="IconLink"
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </form>
  );
}
