import clsx from 'clsx';
import styles from './LinkForm.module.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { linkFormSchema, type LinkFormValues } from './schemas/link';

import InputForm from '@src/components/forms/fields/InputForm';
import SelectForm from '@src/components/forms/fields/SelectForm';

import Icon from '@src/components/icon/Icon';

import { platforms } from './platforms';
import { Link } from '@src/models/Types';
import { useEffect, useMemo, useRef } from 'react';

interface LinkFormProps {
  idx: number;
  value: Link;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLFormElement>) => void;
  onDrop: () => void;
  onChange: (link: Link) => void;
  onValidityChange: (isValid: boolean) => void;
  onRemove: () => void;
}

export default function LinkForm({
  idx,
  value: { id, platform, url },
  onDragStart,
  onDragOver,
  onDrop,
  onChange,
  onValidityChange,
  onRemove,
}: LinkFormProps) {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
    defaultValues: {
      platform: platform,
      url: url,
    },
  });

  const previousIsValidRef = useRef<boolean | null>(null);

  const watched = useWatch({ control });

  const newLink = useMemo(
    () => ({
      id,
      platform: watched.platform ?? '',
      url: watched.url ?? '',
    }),
    [id, watched.platform, watched.url]
  );

  useEffect(() => {
    if (newLink.platform !== platform || newLink.url !== url) {
      onChange(newLink);
    }
  }, [newLink, onChange, platform, url]);

  useEffect(() => {
    if (isValid !== previousIsValidRef.current) {
      onValidityChange?.(isValid);
      previousIsValidRef.current = isValid;
    }
  }, [isValid, onValidityChange]);

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
          aria-label={`Drag and Drop for Link #${idx + 1}`}
        >
          <Icon name="IconDragAndDrop" />
          Link #{idx + 1}
        </span>

        <button
          type="button"
          className="link"
          aria-label={`Remove Link #${idx + 1}`}
          onClick={onRemove}
        >
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
