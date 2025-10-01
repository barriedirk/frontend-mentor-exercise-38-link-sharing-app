import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import Icon from '@src/components/icon/Icon';
import { IconProps } from '@src/components/icon/Icon';

import './FormInput.css';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  autoComplete?: string;
  icon?: IconProps['name'];
}

const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  error,
  autoComplete,
  icon,
}: Props<T>) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <fieldset
      className="form-group"
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <label
        id={`${name}-label`}
        className="text-preset-4 text-grey-900"
        htmlFor={inputId}
      >
        {label}
      </label>

      <div className="form-input-group">
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
              placeholder=" "
              className={`form-control text-preset-4-mobile md:text-preset-4 ${
                error ? 'is-invalid' : ''
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
      </div>

      {error && (
        <span id={errorId} role="alert" className="text-preset-4-mobile error">
          {error.message}
        </span>
      )}
    </fieldset>
  );
};

export default InputForm;
