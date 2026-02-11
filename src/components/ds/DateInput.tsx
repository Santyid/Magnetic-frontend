import React, { useState, useRef, useEffect } from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type DateInputSize = 'sm' | 'md' | 'lg';

export interface DateInputProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  size?: DateInputSize;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  locale?: 'es' | 'en' | 'pt';
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const inputSizeStyles: Record<DateInputSize, string> = {
  lg: 'h-12 px-4 text-ds-md',
  md: 'h-10 px-3.5 text-ds-base',
  sm: 'h-9 px-3 text-ds-sm',
};

const labelSizeStyles: Record<DateInputSize, string> = {
  lg: 'text-ds-base mb-1.5',
  md: 'text-ds-sm mb-1',
  sm: 'text-ds-xs mb-1',
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const WEEKDAYS: Record<string, string[]> = {
  es: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  pt: ['Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa', 'Do'],
};

const MONTHS: Record<string, string[]> = {
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  pt: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// ─── CALENDAR ICON ────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

// ─── DATE INPUT COMPONENT ─────────────────────────────────────────────────────

export function DateInput({
  label,
  value = null,
  onChange,
  placeholder,
  size = 'md',
  error,
  helperText,
  disabled = false,
  locale = 'es',
  minDate,
  maxDate,
  fullWidth = true,
  className = '',
}: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => (value ?? new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (value ?? new Date()).getMonth());
  const containerRef = useRef<HTMLDivElement>(null);
  const hasError = !!error;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen]);

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function selectDate(day: number) {
    const selected = new Date(viewYear, viewMonth, day);
    onChange?.(selected);
    setIsOpen(false);
  }

  function goToToday() {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange?.(today);
    setIsOpen(false);
  }

  function isDateDisabled(day: number): boolean {
    const date = new Date(viewYear, viewMonth, day);
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  }

  // Build calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);
  const weekdays = WEEKDAYS[locale] || WEEKDAYS.es;
  const months = MONTHS[locale] || MONTHS.es;

  const prevMonthDays: number[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  const currentDays: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentDays.push(i);
  }

  const totalCells = prevMonthDays.length + currentDays.length;
  const nextMonthDays: number[] = [];
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    nextMonthDays.push(i);
  }

  return (
    <div ref={containerRef} className={[fullWidth ? 'w-full' : '', 'relative', className].join(' ')}>
      {label && (
        <label className={['block font-medium text-grey-500', labelSizeStyles[size]].join(' ')}>
          {label}
        </label>
      )}

      {/* Trigger input */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={[
          'w-full flex items-center justify-between border rounded-input transition-colors duration-200 text-left',
          hasError
            ? 'border-error-400 focus:ring-2 focus:ring-error-100'
            : isOpen
              ? 'border-primary-500 ring-2 ring-primary-50'
              : 'border-grey-100 hover:border-grey-200',
          disabled ? 'bg-grey-50 cursor-not-allowed' : 'bg-white cursor-pointer',
          inputSizeStyles[size],
        ].join(' ')}
      >
        <span className={value ? 'text-grey-500' : 'text-grey-100'}>
          {value ? formatDate(value, locale) : (placeholder || 'dd/mm/yyyy')}
        </span>
        <span className={['flex-shrink-0', disabled ? 'text-grey-100' : 'text-grey-300'].join(' ')}>
          <CalendarIcon />
        </span>
      </button>

      {(error || helperText) && (
        <p className={['mt-1 text-ds-xs', hasError ? 'text-error-400' : 'text-grey-300'].join(' ')}>
          {error || helperText}
        </p>
      )}

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-[267px] bg-white rounded-lg shadow-ds-lg border border-grey-50 overflow-hidden">
          {/* Header: month/year navigation */}
          <div className="flex items-center justify-between px-5 h-[53px]">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded-md text-grey-800 hover:bg-white-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-ds-sm font-semibold text-grey-500">
              {months[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded-md text-grey-800 hover:bg-white-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-grey-100" />

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-5 pt-3 pb-1">
            {weekdays.map((day, i) => (
              <div key={i} className="text-center text-[11px] font-medium text-grey-300">
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 px-5 pb-3 gap-y-0.5">
            {/* Previous month days */}
            {prevMonthDays.map((day) => (
              <div key={`prev-${day}`} className="flex items-center justify-center w-full aspect-square">
                <span className="text-ds-xs text-grey-100">{day}</span>
              </div>
            ))}

            {/* Current month days */}
            {currentDays.map((day) => {
              const date = new Date(viewYear, viewMonth, day);
              const isSelected = value && isSameDay(date, value);
              const isTodayDate = isToday(date);
              const isDisabledDay = isDateDisabled(day);

              return (
                <button
                  key={`cur-${day}`}
                  type="button"
                  disabled={isDisabledDay}
                  onClick={() => selectDate(day)}
                  className={[
                    'flex items-center justify-center w-full aspect-square rounded-full text-ds-xs transition-colors',
                    isSelected
                      ? 'bg-primary-500 text-white font-semibold'
                      : isTodayDate
                        ? 'bg-primary-50 text-primary-500 font-medium'
                        : 'text-grey-500 hover:bg-white-200',
                    isDisabledDay ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  ].join(' ')}
                >
                  {day}
                </button>
              );
            })}

            {/* Next month days */}
            {nextMonthDays.map((day) => (
              <div key={`next-${day}`} className="flex items-center justify-center w-full aspect-square">
                <span className="text-ds-xs text-grey-100">{day}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-grey-100" />

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3">
            <button
              type="button"
              onClick={goToToday}
              className="text-ds-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              {locale === 'es' ? 'Hoy' : locale === 'pt' ? 'Hoje' : 'Today'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => { onChange?.(null); setIsOpen(false); }}
                className="text-ds-xs font-medium text-grey-300 hover:text-grey-500 transition-colors"
              >
                {locale === 'es' ? 'Limpiar' : locale === 'pt' ? 'Limpar' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
