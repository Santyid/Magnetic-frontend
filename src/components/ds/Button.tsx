import React from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'info' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon: React.ReactNode;
  'aria-label': string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white disabled:bg-white-200 disabled:text-grey-100',
  secondary:
    'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white disabled:bg-white-200 disabled:text-grey-100',
  outline:
    'bg-white-50 hover:bg-white-200 active:bg-grey-50 text-grey-500 border border-grey-100 disabled:bg-white-200 disabled:text-grey-100 disabled:border-grey-50',
  ghost:
    'bg-transparent hover:bg-white-100 active:bg-white-200 text-grey-500 disabled:text-grey-100',
  danger:
    'bg-error-400 hover:bg-error-500 active:bg-error-600 text-white disabled:bg-white-200 disabled:text-grey-100',
  info:
    'bg-info-50 hover:bg-info-100 text-primary-500 disabled:bg-white-200 disabled:text-grey-100',
  link:
    'bg-transparent hover:underline text-primary-500 disabled:text-grey-100 px-0',
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'h-12 min-w-[196px] px-5 text-[18px] gap-2',
  md: 'h-10 min-w-[182px] px-5 text-[16px] gap-2',
  sm: 'h-9 min-w-[164px] px-4 text-[14px] gap-1.5',
};

const iconButtonSizeStyles: Record<ButtonSize, string> = {
  lg: 'h-12 w-12',
  md: 'h-10 w-10',
  sm: 'h-9 w-9',
};

// ─── BUTTON COMPONENT ──────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      isLoading,
      fullWidth,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer select-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-1',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          variant !== 'link' ? sizeStyles[size] : size === 'lg' ? 'text-[18px]' : size === 'md' ? 'text-[16px]' : 'text-[14px]',
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ─── ICON BUTTON COMPONENT ────────────────────────────────────────────────────

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'outline', size = 'md', icon, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer select-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-1',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          iconButtonSizeStyles[size],
          'min-w-0',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ─── TOGGLE BUTTON ─────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked = false, onChange, size = 'md', disabled = false, className = '' }: ToggleProps) {
  const sizeMap = {
    sm: { track: 'w-10 h-6', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    md: { track: 'w-12 h-7', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-8', thumb: 'h-6 w-6', translate: 'translate-x-6' },
  };

  const s = sizeMap[size];

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        'relative inline-flex items-center rounded-full transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-1',
        s.track,
        checked ? 'bg-secondary-500' : 'bg-grey-100',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'inline-block rounded-full bg-white shadow-ds-sm transform transition-transform duration-200',
          s.thumb,
          checked ? s.translate : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  );
}
