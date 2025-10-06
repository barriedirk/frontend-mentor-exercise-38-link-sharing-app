import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import Icon from '@src/components/icon/Icon';
import { IconProps } from '@src/components/icon/Icon';
import clsx from 'clsx';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  icon?: IconProps['name'];
  placeholder?: string;
  styleName?: 'column' | 'row' | undefined;
  helperText?: string;
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  error,
  autoComplete,
  icon,
  placeholder,
  styleName,
  helperText,
}: Props<T>) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <fieldset
      className={clsx(
        'form-group input-text',
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

      <div
        className={clsx(
          'form-input-group text-preset-3 relative',
          error && 'is-invalid'
        )}
      >
        {icon && <Icon name={icon} />}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={inputId}
              type={type}
              {...field}
              autoComplete={autoComplete}
              placeholder={placeholder}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
        {error && (
          <span id={errorId} role="alert" className="text-preset-4 error">
            {error.message}
          </span>
        )}
      </div>
      {helperText && (
        <p className="text-preset-4 text-grey-500">{helperText}</p>
      )}
    </fieldset>
  );
};

export default InputForm;
