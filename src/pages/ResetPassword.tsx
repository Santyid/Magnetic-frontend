import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { authAPI } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import AuthLayout from '../components/layout/AuthLayout';
import PasswordStrengthBar from '../components/auth/PasswordStrengthBar';

export default function ResetPassword() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValid = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password) && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || !token) return;

    setIsLoading(true);
    try {
      await authAPI.resetPassword(token, password);
      setSuccess(true);
      toast.success(t.changePassword.successMessage);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: unknown) {
      const code = (err as AxiosError<{ message: string }>).response?.data?.message;
      toast.error(t.errorCodes[code as keyof typeof t.errorCodes] || t.forgotPassword.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-grey-500 mb-4">{t.errorCodes.RESET_TOKEN_INVALID}</h1>
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {t.forgotPassword.backToLogin}
          </button>
        </div>
      </AuthLayout>
    );
  }

  const EyeIcon = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-200 hover:text-grey-400"
    >
      {show ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold text-grey-700 mb-3"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          {t.forgotPassword.resetTitle}
        </h1>
        <p className="text-grey-300 text-sm">
          {t.forgotPassword.resetSubtitle}
        </p>
      </div>

      {success ? (
        <div className="p-4 bg-success-50 border border-success-100 rounded-lg text-center">
          <p className="text-sm text-success-500">{t.changePassword.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-grey-500 mb-1.5">
              {t.changePassword.newPassword}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-grey-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-sm"
                required
              />
              <EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-500 mb-1.5">
              {t.changePassword.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-grey-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-sm"
                required
              />
              <EyeIcon show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isValid}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? t.changePassword.updating : t.common.confirm}
          </button>
        </form>
      )}

      {/* Password strength */}
      {password && !success && (
        <div className="mt-4">
          <PasswordStrengthBar password={password} />
        </div>
      )}
    </AuthLayout>
  );
}
