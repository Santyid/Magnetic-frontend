import React, { useState, useRef, useEffect } from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  type?: 'checkbox' | 'radio';
  checked?: boolean;
}

export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  width?: number;
  className?: string;
}

// ─── MENU COMPONENT ────────────────────────────────────────────────────────────

export function Menu({ trigger, items, align = 'left', width = 242, className = '' }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className={['relative inline-block', className].join(' ')}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={[
            'absolute z-50 mt-1 bg-white border border-grey-50 rounded-input shadow-ds-md py-1 overflow-auto max-h-64',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
          style={{ width }}
        >
          {items.map((item) => {
            if (item.divider) {
              return <div key={item.id} className="my-1 border-t border-grey-50" />;
            }

            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  if (!item.type) setIsOpen(false);
                }}
                className={[
                  'w-full flex items-center gap-2.5 px-3.5 py-2 text-ds-sm transition-colors text-left',
                  item.disabled
                    ? 'text-grey-100 cursor-not-allowed'
                    : item.danger
                      ? 'text-error-400 hover:bg-error-50'
                      : 'text-grey-500 hover:bg-white-100',
                ].join(' ')}
              >
                {item.type === 'checkbox' && (
                  <div
                    className={[
                      'w-[18px] h-[18px] rounded border-2 flex items-center justify-center flex-shrink-0',
                      item.checked
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-white border-grey-100',
                    ].join(' ')}
                  >
                    {item.checked && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}

                {item.type === 'radio' && (
                  <div
                    className={[
                      'w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      item.checked
                        ? 'border-primary-500'
                        : 'border-grey-100',
                    ].join(' ')}
                  >
                    {item.checked && <div className="w-[9px] h-[9px] rounded-full bg-primary-500" />}
                  </div>
                )}

                {item.icon && <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
