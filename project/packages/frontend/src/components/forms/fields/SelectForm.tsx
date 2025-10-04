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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLFieldSetElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const optionEl = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLDivElement;

      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const inputId = `${name}-input`;
  const errorId = `${name}-error`;
  const listboxId = `${name}-listbox`;

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

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : 0
              );
              break;
            case 'ArrowUp':
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : options.length - 1
              );
              break;
            case 'Enter':
            case ' ':
              e.preventDefault();
              if (isOpen && highlightedIndex >= 0) {
                handleSelect(options[highlightedIndex]);
              } else {
                setIsOpen(true);
              }
              break;
            case 'Escape':
              closeDropdown();
              break;
          }
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

            <div
              role="combobox"
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-owns={listboxId}
              aria-activedescendant={
                isOpen && highlightedIndex >= 0
                  ? `${name}-option-${highlightedIndex}`
                  : undefined
              }
              tabIndex={0}
              onKeyDown={handleKeyDown}
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

            {helperText && (
              <p className="text-preset-4 text-grey-500">{helperText}</p>
            )}

            {isOpen && (
              <div
                id={listboxId}
                role="listbox"
                ref={dropdownRef}
                className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md border border-grey-300 bg-white shadow-md"
                style={{ top: '100%' }}
              >
                {options.map((option, index) => {
                  const isSelected = field.value === option.value;
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <div
                      key={option.value}
                      id={`${name}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      data-index={index}
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        'flex cursor-pointer items-center gap-2 px-4 py-2',
                        isSelected && 'bg-grey-100 font-semibold',
                        isHighlighted && 'bg-grey-200'
                      )}
                    >
                      {option.icon}
                      {option.label}
                    </div>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      }}
    />
  );
};

export default SelectForm;
