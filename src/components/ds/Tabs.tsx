import React from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  size?: TabSize;
  fullWidth?: boolean;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const containerSizes: Record<TabSize, string> = {
  lg: 'h-12 p-[7px] rounded-input gap-1',
  md: 'h-10 p-1 rounded-input gap-0.5',
  sm: 'h-[30px] p-1 rounded-input gap-0.5',
};

const itemSizes: Record<TabSize, string> = {
  lg: 'h-[34px] px-4 text-ds-base rounded-sm',
  md: 'h-6 px-3 text-ds-sm rounded-sm',
  sm: 'h-6 px-2.5 text-ds-xs rounded-sm',
};

// ─── TABS COMPONENT ────────────────────────────────────────────────────────────

export function Tabs({ items, value, onChange, size = 'md', fullWidth, className = '' }: TabsProps) {
  return (
    <div
      className={[
        'inline-flex items-center bg-white-100',
        containerSizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.value)}
            className={[
              'relative flex items-center justify-center gap-1.5 font-medium transition-all duration-200',
              itemSizes[size],
              fullWidth ? 'flex-1' : '',
              isActive
                ? 'bg-white text-grey-500 shadow-ds-sm'
                : 'text-grey-300 hover:text-grey-500',
              item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {item.icon}
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
              <span
                className={[
                  'flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-semibold rounded-[3px]',
                  isActive ? 'bg-error-400 text-white' : 'bg-grey-100 text-white',
                ].join(' ')}
              >
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── UNDERLINE TABS ────────────────────────────────────────────────────────────

export interface UnderlineTabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function UnderlineTabs({ items, value, onChange, className = '' }: UnderlineTabsProps) {
  return (
    <div className={['flex items-center border-b border-grey-50', className].join(' ')}>
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.value)}
            className={[
              'relative flex items-center justify-center gap-1.5 px-4 py-2.5 text-ds-sm font-medium transition-colors duration-200',
              isActive ? 'text-primary-500' : 'text-grey-300 hover:text-grey-500',
              item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {item.icon}
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-semibold rounded-full bg-error-400 text-white">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
