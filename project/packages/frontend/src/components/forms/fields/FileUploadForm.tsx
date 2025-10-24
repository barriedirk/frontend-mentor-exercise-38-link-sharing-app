import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  useWatch,
} from 'react-hook-form';

import Icon from '@src/components/icon/Icon';
import { IconProps } from '@src/components/icon/Icon';

import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface FileUploadFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  helperText?: string;
  currentImage?: string;
  styleName?: 'column' | 'row' | undefined;
  icon?: IconProps['name'];
  dataTestid?: string;
}

const FileUploadForm = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  currentImage,
  styleName,
  icon,
  dataTestid,
}: FileUploadFormProps<T>) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileList = useWatch({ name, control });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage ?? null
  );

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(currentImage ?? null);

      return undefined;
    }
  }, [fileList, currentImage]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (onChange: (value: FileList | undefined) => void) => {
    onChange(undefined);
    setPreviewUrl(null);

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <fieldset
      className={clsx(
        'form-group input-file',
        styleName,
        error && 'form-group--error'
      )}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <label
        id={`${name}-label`}
        className={clsx(
          'form-label',
          !error && 'text-grey-900',
          error && 'text-error'
        )}
        htmlFor={inputId}
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className={clsx(
              'form-input-group text-preset-3 relative inline-block',
              error && 'is-invalid'
            )}
          >
            <input
              data-testid={dataTestid}
              id={inputId}
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={(e) => {
                const fileList = e.target.files;

                if (!fileList || fileList.length === 0) return;

                onChange(fileList);
              }}
              className="hidden"
            />

            <div
              className={clsx(
                'form-file-preview overflow-hidden bg-grey-100 cursor-pointer border text-purple-600',
                error && 'border-error'
              )}
              onClick={handleClick}
              data-testid={dataTestid ? `${dataTestid}-upload` : null}
            >
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              )}
              {!previewUrl && icon && (
                <div className="flex flex-col gap-3 items-center justify-center w-full h-full ">
                  <Icon name={icon} />
                  <p className="text-preset-3-semibold">+ Upload Image</p>
                </div>
              )}
              {!previewUrl && !icon && (
                <div className="flex items-center justify-center w-full h-full text-grey-500 text-preset-3-semibold">
                  + Upload
                </div>
              )}
            </div>

            {previewUrl && (
              <button
                type="button"
                onClick={() => handleRemove(onChange)}
                className="absolute top-0 right-0 bg-white border rounded-full p-1 text-xs text-red-550"
                aria-label="Remove image"
                title="Remove image"
                data-testid={dataTestid ? `${dataTestid}-remove-image` : null}
              >
                <Icon name="IconRemove" />
              </button>
            )}
          </div>
        )}
      />

      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-preset-4 error"
          data-testid={dataTestid ? `${dataTestid}-error-message` : null}
        >
          {error.message}
        </span>
      )}

      {helperText && (
        <p
          className="form-helper-text text-preset-4 text-grey-500 mt-1"
          data-testid={dataTestid ? `${dataTestid}-helper-text` : null}
        >
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

export default FileUploadForm;
