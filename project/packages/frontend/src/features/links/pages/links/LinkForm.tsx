import clsx from 'clsx';
import styles from './LinkForm.module.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { linkFormSchema, type LinkFormValues } from './schemas/link';

import InputForm from '@src/components/forms/fields/InputForm';
import SelectForm from '@src/components/forms/fields/SelectForm';

import Icon from '@src/components/icon/Icon';

import { platforms } from './platforms';

interface LinkFormProps {
  idx: number;
  value: number;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLFormElement>) => void;
  onDrop: () => void;
}

export default function LinkForm({
  idx,
  value,
  onDragStart,
  onDragOver,
  onDrop,
}: LinkFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
    defaultValues: {
      platform: '',
      url: '',
    },
  });

  return (
    <form
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={clsx(styles['link-form'], 'flex flex-col gap-2 px-4 py-6')}
    >
      <header className="flex justify-between">
        <span
          className="flex-row-center gap-2 cursor-pointer"
          tabIndex={0}
          aria-label={`Drag and Drop for Link #${1}`}
        >
          <Icon name="IconDragAndDrop" />
          Link #{value}
        </span>

        <button type="button" className="link">
          remove
        </button>
      </header>

      <SelectForm<LinkFormValues>
        name="platform"
        control={control}
        label="Platform"
        error={errors.platform}
        placeholder="Select Platform"
        options={platforms}
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
