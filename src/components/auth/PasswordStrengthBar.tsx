import { useMemo } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';

interface PasswordStrengthBarProps {
  password: string;
}

export default function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const t = useTranslation();

  const validations = useMemo(() => ({
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    minLength: password.length >= 8,
  }), [password]);

  const passedCount = Object.values(validations).filter(Boolean).length;

  const strength = useMemo(() => {
    if (passedCount <= 1) return { label: t.changePassword.strengthWeak, color: 'bg-error-400', percentage: 25 };
    if (passedCount <= 2) return { label: t.changePassword.strengthWeak, color: 'bg-warning-400', percentage: 40 };
    if (passedCount <= 3) return { label: t.changePassword.strengthMedium, color: 'bg-warning-400', percentage: 65 };
    return { label: t.changePassword.strengthStrong, color: 'bg-success-400', percentage: 100 };
  }, [passedCount, t]);

  if (!password) return null;

  const items = [
    { key: 'hasLowerCase', label: t.changePassword.hasLowerCase, valid: validations.hasLowerCase },
    { key: 'hasUpperCase', label: t.changePassword.hasUpperCase, valid: validations.hasUpperCase },
    { key: 'hasNumber', label: t.changePassword.hasNumber, valid: validations.hasNumber },
    { key: 'minLength', label: t.changePassword.minLength, valid: validations.minLength },
  ];

  return (
    <div className="space-y-3">
      {/* Strength bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-grey-500">{t.changePassword.strengthTitle}</span>
        </div>
        <div className="w-full h-2 bg-white-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${strength.percentage}%` }}
          />
        </div>
        <span className="text-xs text-grey-300 mt-1 block">{strength.label}</span>
      </div>

      {/* Validation checklist */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-2 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${item.valid ? 'bg-success-400' : 'bg-grey-100'}`} />
            <span className={item.valid ? 'text-grey-400' : 'text-grey-300'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
