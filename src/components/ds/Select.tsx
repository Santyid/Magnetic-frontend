import { useState, useRef, useEffect } from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const selectSizeStyles: Record<SelectSize, string> = {
  lg: 'h-12 px-4 text-ds-md',
  md: 'h-10 px-3.5 text-ds-base',
  sm: 'h-9 px-3 text-ds-sm',
};

const labelSizeStyles: Record<SelectSize, string> = {
  lg: 'text-ds-base mb-1.5',
  md: 'text-ds-sm mb-1',
  sm: 'text-ds-xs mb-1',
};

// ─── CHEVRON ICON ──────────────────────────────────────────────────────────────

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── SELECT COMPONENT ──────────────────────────────────────────────────────────

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  helperText,
  error,
  size = 'md',
  disabled = false,
  fullWidth = true,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasError = !!error;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={containerRef} className={[fullWidth ? 'w-full' : '', 'relative'].join(' ')}>
      {label && (
        <label className={['block font-medium text-grey-500', labelSizeStyles[size]].join(' ')}>
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={[
          'relative flex items-center justify-between w-full border rounded-input transition-colors duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500',
          selectSizeStyles[size],
          hasError ? 'border-error-400' : 'border-grey-100',
          disabled ? 'bg-grey-50 cursor-not-allowed text-grey-300' : 'bg-white text-grey-500',
          className,
        ].join(' ')}
      >
        <span className={selectedOption ? '' : 'text-grey-100'}>{selectedOption?.label || placeholder}</span>
        <ChevronDown className={['text-grey-300 transition-transform duration-200', isOpen ? 'rotate-180' : ''].join(' ')} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-grey-50 rounded-input shadow-ds-md max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={[
                'w-full text-left px-3.5 py-2 text-ds-sm transition-colors',
                option.value === value ? 'bg-primary-50 text-primary-500 font-medium' : 'text-grey-500 hover:bg-white-100',
                option.disabled ? 'text-grey-100 cursor-not-allowed' : 'cursor-pointer',
              ].join(' ')}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {(error || helperText) && (
        <p className={['mt-1 text-ds-xs', hasError ? 'text-error-400' : 'text-grey-300'].join(' ')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// ─── SEGMENT CONTROL ───────────────────────────────────────────────────────────

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Segment({ options, value, onChange, size = 'md', className = '' }: SegmentProps) {
  const containerSize = {
    lg: 'h-[68px] p-4 rounded-md',
    md: 'h-12 p-1.5 rounded-md',
    sm: 'h-10 p-1 rounded-md',
  };

  const itemSize = {
    lg: 'h-9 text-ds-md rounded-sm',
    md: 'h-8 text-ds-base rounded-sm',
    sm: 'h-7 text-ds-sm rounded-sm',
  };

  return (
    <div className={['inline-flex items-center bg-white-100 gap-0.5', containerSize[size], className].join(' ')}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={[
            'flex-1 flex items-center justify-center px-4 font-medium transition-all duration-200',
            itemSize[size],
            option.value === value
              ? 'bg-white text-grey-500 shadow-ds-sm border border-grey-50'
              : 'text-grey-300 hover:text-grey-500',
          ].join(' ')}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
