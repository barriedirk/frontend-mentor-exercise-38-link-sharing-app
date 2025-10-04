import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import React, { useState, useRef, useEffect } from 'react';

import Icon from '@src/components/icon/Icon';
import { IconProps } from '@src/components/icon/Icon';
import clsx from 'clsx';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  icon?: IconProps['name'];
  placeholder?: string;
  helperText?: string;
  options: Option[];
}

const SelectForm = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  icon,
  placeholder = 'Select an option',
  helperText,
  options,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLFieldSetElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);

        const handleSelect = (option: Option) => {
          field.onChange(option.value);
          closeDropdown();
        };

        return (
          <fieldset
            ref={selectRef}
            className={clsx(
              'form-group',
              error && 'form-group--error',
              'relative'
            )}
            role="group"
            aria-labelledby={`${name}-label`}
          >
            {/* Label */}
            <label
              id={`${name}-label`}
              className={clsx(
                'text-preset-4',
                !error && 'text-grey-900',
                error && 'text-error'
              )}
              htmlFor={inputId}
            >
              {label}
            </label>

            {/* Select Trigger */}
            <div
              className={clsx(
                'form-input-group text-preset-3 relative cursor-pointer',
                error && 'is-invalid'
              )}
              onClick={toggleDropdown}
            >
              {icon && <Icon name={icon} />}
              <div
                id={inputId}
                className={clsx(
                  'form-control',
                  error && 'is-invalid',
                  'flex items-center gap-2'
                )}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
              >
                {selected?.icon}
                <span className={clsx(!selected && 'text-grey-400')}>
                  {selected?.label || placeholder}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <span id={errorId} role="alert" className="text-preset-4 error">
                {error.message}
              </span>
            )}

            {/* Helper Text */}
            {helperText && (
              <p className="text-preset-4 text-grey-500">{helperText}</p>
            )}

            {/* Dropdown */}
            {isOpen && (
              <div
                className="absolute left-0 right-0 z-10 mt-1 rounded-md border border-grey-300 bg-white shadow-md"
                style={{ top: '100%' }}
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={clsx(
                      'flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-grey-100',
                      field.value === option.value && 'bg-grey-100'
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </fieldset>
        );
      }}
    />
  );
};

export default SelectForm;
