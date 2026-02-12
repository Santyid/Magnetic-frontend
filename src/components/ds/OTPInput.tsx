import { useRef, useCallback } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function OTPInput({ length = 6, value, onChange, error, disabled = false, autoFocus = true }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  }, [length]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    // Handle paste
    if (inputValue.length > 1) {
      const pasteValue = inputValue.replace(/\D/g, '').slice(0, length);
      onChange(pasteValue);
      focusInput(Math.min(pasteValue.length, length - 1));
      return;
    }

    // Single digit
    const digit = inputValue.replace(/\D/g, '');
    const newValue = digits.map((d, i) => (i === index ? digit : d)).join('').replace(/\s/g, '');
    onChange(newValue);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        e.preventDefault();
        const newValue = digits.map((d, i) => (i === index - 1 ? '' : d)).join('').replace(/\s/g, '');
        onChange(newValue);
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasteData) {
      onChange(pasteData);
      focusInput(Math.min(pasteData.length, length - 1));
    }
  };

  return (
    <div>
      <div className="flex gap-3 justify-center">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            className={`
              w-12 h-14 text-center text-xl font-semibold
              border rounded-input transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500
              disabled:bg-white-200 disabled:cursor-not-allowed
              ${error ? 'border-error-400' : 'border-grey-100'}
              ${digits[index] ? 'text-grey-500' : 'text-grey-200'}
            `}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error-400 text-center">{error}</p>
      )}
    </div>
  );
}
