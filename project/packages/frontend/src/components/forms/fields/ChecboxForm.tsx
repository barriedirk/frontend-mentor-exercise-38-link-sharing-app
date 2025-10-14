import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import clsx from 'clsx';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  helperText?: string;
}

const ChecboxForm = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
}: Props<T>) => {
  const checkboxId = `${name}-checkbox`;
  const errorId = `${name}-error`;

  return (
    <fieldset
      className={clsx(
        'form-group input-checkbox',
        error && 'form-group--error'
      )}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <div className="flex items-center gap-2.5">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={checkboxId}
              type="checkbox"
              {...field}
              checked={!!field.value}
              className="form-checkbox mt-1"
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
        <label
          htmlFor={checkboxId}
          id={`${name}-label`}
          className={clsx(
            'form-label',
            !error && 'text-grey-900',
            error && 'text-error'
          )}
        >
          {label}
        </label>
      </div>

      {error && (
        <span id={errorId} role="alert" className="text-preset-4 error">
          {error.message}
        </span>
      )}

      {helperText && (
        <p className="text-preset-4 text-grey-500 mt-1">{helperText}</p>
      )}
    </fieldset>
  );
};

export default ChecboxForm;
