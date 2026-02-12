import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import AuthLayout from '../../components/layout/AuthLayout';
import OTPInput from '../../components/ds/OTPInput';

export default function TwoFactorEmail() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no backend integration
  };

  return (
    <AuthLayout onBack={() => navigate('/login/email')}>
      <div className="text-center">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-grey-700 mb-3"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            {t.auth2fa.title}
          </h1>
          <p className="text-grey-300 text-sm max-w-sm mx-auto">
            {t.auth2fa.emailSubtitle}
          </p>
        </div>

        {/* Code label */}
        <p className="text-sm font-medium text-grey-500 mb-4">
          {t.auth2fa.codeLabel}
        </p>

        {/* OTP Input */}
        <form onSubmit={handleConfirm}>
          <OTPInput
            value={code}
            onChange={setCode}
            length={6}
          />

          {/* Confirm button */}
          <button
            type="submit"
            disabled={code.length < 6}
            className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {t.auth2fa.confirmButton}
          </button>
        </form>

        {/* Resend code */}
        <div className="mt-4">
          <button
            type="button"
            className="text-primary-500 hover:text-primary-600 text-sm font-medium"
          >
            {t.auth2fa.resendCode}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
