import React, { useState } from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const inputSizeStyles: Record<InputSize, string> = {
  lg: 'h-12 px-4 text-ds-md',
  md: 'h-10 px-3.5 text-ds-base',
  sm: 'h-9 px-3 text-ds-sm',
};

const labelSizeStyles: Record<InputSize, string> = {
  lg: 'text-ds-base mb-1.5',
  md: 'text-ds-sm mb-1',
  sm: 'text-ds-xs mb-1',
};

// ─── INPUT COMPONENT ───────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      fullWidth = true,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;
    const hasError = !!error;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className={[
              'block font-medium text-grey-500',
              labelSizeStyles[size],
            ].join(' ')}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <div className="flex items-center justify-center h-full px-3 bg-grey-50 border border-r-0 border-grey-100 rounded-l-input text-grey-300 text-ds-sm">
              {leftAddon}
            </div>
          )}

          <div
            className={[
              'relative flex items-center w-full',
              'border rounded-input transition-colors duration-200',
              hasError
                ? 'border-error-400 focus-within:ring-2 focus-within:ring-error-100'
                : 'border-grey-100 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-50',
              disabled ? 'bg-grey-50 cursor-not-allowed' : 'bg-white',
              leftAddon ? 'rounded-l-none' : '',
              rightAddon ? 'rounded-r-none' : '',
            ].join(' ')}
          >
            {leftIcon && (
              <span className="absolute left-3 text-grey-300 pointer-events-none">
                {leftIcon}
              </span>
            )}

            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              className={[
                'w-full bg-transparent outline-none placeholder:text-grey-100',
                'disabled:cursor-not-allowed disabled:text-grey-300',
                inputSizeStyles[size],
                leftIcon ? 'pl-10' : '',
                rightIcon ? 'pr-10' : '',
                className,
              ].join(' ')}
              {...props}
            />

            {rightIcon && (
              <span className="absolute right-3 text-grey-300">
                {rightIcon}
              </span>
            )}
          </div>

          {rightAddon && (
            <div className="flex items-center justify-center h-full px-3 bg-grey-50 border border-l-0 border-grey-100 rounded-r-input text-grey-300 text-ds-sm">
              {rightAddon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={[
              'mt-1 text-ds-xs',
              hasError ? 'text-error-400' : 'text-grey-300',
            ].join(' ')}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ─── PASSWORD INPUT ────────────────────────────────────────────────────────────

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        ref={ref}
        type={show ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow(!show)}
            className="text-grey-300 hover:text-grey-500 transition-colors pointer-events-auto"
          >
            {show ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

// ─── TEXTAREA COMPONENT ────────────────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, fullWidth = true, disabled, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, '-')}`;
    const hasError = !!error;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={textareaId} className="block font-medium text-grey-500 text-ds-sm mb-1">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={[
            'w-full px-3.5 py-2.5 text-ds-base bg-white border rounded-input outline-none',
            'placeholder:text-grey-100 transition-colors duration-200 resize-y min-h-[80px]',
            hasError
              ? 'border-error-400 focus:ring-2 focus:ring-error-100'
              : 'border-grey-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-50',
            disabled ? 'bg-grey-50 cursor-not-allowed text-grey-300' : '',
            className,
          ].join(' ')}
          {...props}
        />

        {(error || helperText) && (
          <p className={['mt-1 text-ds-xs', hasError ? 'text-error-400' : 'text-grey-300'].join(' ')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ─── CHECKBOX ──────────────────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, size = 'md', className = '', ...props }, ref) => {
    const boxSize = size === 'md' ? 'w-[23px] h-[23px]' : 'w-[17px] h-[17px]';

    return (
      <label className={['inline-flex items-center gap-2 cursor-pointer select-none', className].join(' ')}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={[
              boxSize,
              'rounded-md border-2 border-grey-100 bg-white transition-colors duration-200',
              'peer-checked:bg-primary-500 peer-checked:border-primary-500',
              'peer-disabled:bg-grey-50 peer-disabled:border-grey-50 peer-disabled:cursor-not-allowed',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-focus-visible:ring-offset-1',
            ].join(' ')}
          />
          <svg
            className={[
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity',
              size === 'md' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5',
            ].join(' ')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {label && <span className="text-ds-sm text-grey-500">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ─── RADIO ─────────────────────────────────────────────────────────────────────

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={['inline-flex items-center gap-2 cursor-pointer select-none', className].join(' ')}>
        <div className="relative">
          <input ref={ref} type="radio" className="peer sr-only" {...props} />
          <div
            className={[
              'w-[17px] h-[17px] rounded-full border-2 border-grey-100 bg-white transition-colors duration-200',
              'peer-checked:border-primary-500',
              'peer-disabled:bg-grey-50 peer-disabled:cursor-not-allowed',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-focus-visible:ring-offset-1',
            ].join(' ')}
          />
          <div
            className={[
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-primary-500',
              'opacity-0 peer-checked:opacity-100 transition-opacity',
            ].join(' ')}
          />
        </div>
        {label && <span className="text-ds-sm text-grey-500">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
