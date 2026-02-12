import React from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type ChipVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
export type ChipSize = 'sm' | 'md';

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const variantStyles: Record<ChipVariant, string> = {
  default: 'bg-white-50 text-grey-500 border border-grey-50',
  primary: 'bg-primary-50 text-primary-500',
  secondary: 'bg-secondary-50 text-secondary-500',
  success: 'bg-success-50 text-success-400',
  error: 'bg-error-50 text-error-400',
  warning: 'bg-warning-50 text-warning-400',
};

const disabledStyle = 'bg-grey-50 text-grey-100 border-grey-50';

const sizeStyles: Record<ChipSize, string> = {
  md: 'h-7 px-[11px] text-ds-sm gap-[10px]',
  sm: 'h-6 px-[9px] text-ds-xs gap-[8px]',
};

// ─── CHIP COMPONENT ────────────────────────────────────────────────────────────

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  removable,
  onRemove,
  leftIcon,
  disabled,
  className = '',
}: ChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-[23px] font-semibold select-none',
        disabled ? disabledStyle : variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {removable && !disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 ml-0.5 hover:opacity-70 transition-opacity"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
