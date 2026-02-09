import React, { useEffect, useRef } from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export type ModalType = 'info' | 'success' | 'warning' | 'error';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type?: ModalType;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

// ─── STYLE MAPS ────────────────────────────────────────────────────────────────

const modalSizes: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-[699px]',
};

const typeIconBg: Record<ModalType, string> = {
  info: 'bg-primary-50',
  success: 'bg-success-50',
  warning: 'bg-warning-50',
  error: 'bg-error-50',
};

const typeIconColor: Record<ModalType, string> = {
  info: 'text-primary-500',
  success: 'text-success-400',
  warning: 'text-warning-400',
  error: 'text-error-400',
};

const typeConfirmButton: Record<ModalType, string> = {
  info: 'bg-primary-500 hover:bg-primary-600 text-white',
  success: 'bg-success-400 hover:bg-success-500 text-white',
  warning: 'bg-warning-400 hover:bg-warning-500 text-white',
  error: 'bg-error-400 hover:bg-error-500 text-white',
};

// ─── ICONS ─────────────────────────────────────────────────────────────────────

const typeIcons: Record<ModalType, React.ReactNode> = {
  info: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  success: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  ),
};

// ─── MODAL COMPONENT ───────────────────────────────────────────────────────────

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  className = '',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (closeOnOverlay && e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={[
          'bg-white rounded-lg w-full mx-4 shadow-ds-modal animate-in fade-in zoom-in-95',
          modalSizes[size],
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}

// ─── MODAL SUB-COMPONENTS ──────────────────────────────────────────────────────

export function ModalHeader({ children, onClose, className = '' }: { children: React.ReactNode; onClose?: () => void; className?: string }) {
  return (
    <div className={['flex items-center justify-between px-6 py-4 border-b border-grey-50', className].join(' ')}>
      <h3 className="text-ds-lg font-semibold text-grey-500">{children}</h3>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-grey-300 hover:text-grey-500 rounded-lg hover:bg-white-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['px-6 py-4', className].join(' ')}>{children}</div>;
}

export function ModalFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['flex items-center justify-end gap-3 px-6 py-4 border-t border-grey-50', className].join(' ')}>{children}</div>;
}

// ─── ALERT MODAL ───────────────────────────────────────────────────────────────

export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  type = 'info',
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6 text-center">
        <div className={['inline-flex items-center justify-center w-14 h-14 rounded-[28px] mb-4', typeIconBg[type]].join(' ')}>
          <span className={typeIconColor[type]}>{typeIcons[type]}</span>
        </div>

        <h3 className="text-ds-lg font-semibold text-grey-500 mb-2">{title}</h3>
        <p className="text-ds-sm text-grey-300 mb-6">{message}</p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 min-w-[81px] px-4 text-ds-sm font-medium text-grey-500 bg-white border border-grey-50 rounded-lg hover:bg-white-200 transition-colors"
          >
            {cancelLabel}
          </button>
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={[
                'h-10 min-w-[81px] px-4 text-ds-sm font-medium rounded-lg transition-colors disabled:opacity-50',
                typeConfirmButton[type],
              ].join(' ')}
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : confirmLabel}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
