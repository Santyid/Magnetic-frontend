// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type StatusType = 'active' | 'inactive' | 'error' | 'warning';
export type StatusVariant = 'dot' | 'badge';

export interface StatusProps {
  type: StatusType;
  variant?: StatusVariant;
  label?: string;
  pulse?: boolean;
  className?: string;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const dotColors: Record<StatusType, string> = {
  active: 'bg-success-400',
  inactive: 'bg-grey-300',
  error: 'bg-error-400',
  warning: 'bg-warning-400',
};

const badgeStyles: Record<StatusType, string> = {
  active: 'bg-success-50 text-success-400',
  inactive: 'bg-white-200 text-grey-300',
  error: 'bg-error-50 text-error-400',
  warning: 'bg-warning-50 text-warning-400',
};

// ─── STATUS COMPONENT ──────────────────────────────────────────────────────────

export function Status({
  type,
  variant = 'dot',
  label,
  pulse = false,
  className = '',
}: StatusProps) {
  if (variant === 'badge') {
    return (
      <span
        className={[
          'inline-flex items-center gap-1.5 px-2 py-0.5 text-ds-xs font-medium rounded-full',
          badgeStyles[type],
          className,
        ].join(' ')}
      >
        <span className={['w-[6px] h-[6px] rounded-full', dotColors[type], pulse ? 'animate-pulse' : ''].join(' ')} />
        {label}
      </span>
    );
  }

  return (
    <span className={['inline-flex items-center gap-2', className].join(' ')}>
      <span
        className={[
          'w-[10px] h-[10px] rounded-full flex-shrink-0',
          dotColors[type],
          pulse ? 'animate-pulse' : '',
        ].join(' ')}
      />
      {label && <span className="text-ds-sm text-grey-500">{label}</span>}
    </span>
  );
}
