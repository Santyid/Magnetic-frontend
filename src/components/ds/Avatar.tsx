import React from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarColor = 'primary' | 'secondary' | 'grey' | 'error' | 'warning' | 'success';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  status?: 'online' | 'offline' | 'error' | 'warning';
  className?: string;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-[18px] h-[18px] rounded-full', text: 'text-[8px]', status: 'w-1.5 h-1.5 -right-0 -bottom-0' },
  sm: { container: 'w-[26px] h-[26px] rounded-full', text: 'text-[10px]', status: 'w-2 h-2 -right-0.5 -bottom-0.5' },
  md: { container: 'w-9 h-9 rounded-full', text: 'text-ds-xs', status: 'w-2.5 h-2.5 -right-0.5 -bottom-0.5' },
  lg: { container: 'w-[50px] h-[50px] rounded-full', text: 'text-ds-lg', status: 'w-3 h-3 right-0 bottom-0' },
};

const colorStyles: Record<AvatarColor, string> = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-secondary-500 text-white',
  grey: 'bg-grey-300 text-white',
  error: 'bg-error-400 text-white',
  warning: 'bg-warning-400 text-white',
  success: 'bg-success-400 text-white',
};

const statusColors: Record<string, string> = {
  online: 'bg-primary-500',
  offline: 'bg-grey-300',
  error: 'bg-error-400',
  warning: 'bg-warning-400',
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── AVATAR COMPONENT ──────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  color = 'primary',
  status,
  className = '',
}: AvatarProps) {
  const s = sizeStyles[size];

  return (
    <div className={['relative inline-flex flex-shrink-0', className].join(' ')}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={['object-cover', s.container].join(' ')}
        />
      ) : (
        <div
          className={[
            'flex items-center justify-center font-semibold select-none',
            s.container,
            colorStyles[color],
          ].join(' ')}
        >
          <span className={s.text}>{getInitials(name)}</span>
        </div>
      )}

      {status && (
        <span
          className={[
            'absolute border-2 border-white rounded-full',
            s.status,
            statusColors[status],
          ].join(' ')}
        />
      )}
    </div>
  );
}

// ─── AVATAR GROUP ──────────────────────────────────────────────────────────────

export function AvatarGroup({ children, max = 4, size = 'md', className = '' }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleCount = Math.min(childrenArray.length, max);
  const extraCount = childrenArray.length - max;
  const s = sizeStyles[size];

  return (
    <div className={['flex items-center -space-x-2', className].join(' ')}>
      {childrenArray.slice(0, visibleCount).map((child, i) => (
        <div key={i} className="relative ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {extraCount > 0 && (
        <div
          className={[
            'flex items-center justify-center font-semibold bg-grey-50 text-grey-500 ring-2 ring-white',
            s.container,
            s.text,
          ].join(' ')}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}
