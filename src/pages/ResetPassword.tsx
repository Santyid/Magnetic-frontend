import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { authAPI } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';
import backgroundImage from '../assets/images/magnetic-background.webp';
import magneticLogo from '../assets/images/powered-by-magnetic-logo.svg';

export default function ResetPassword() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validations = {
    minLength: password.length >= 8,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /\d/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    passwordsMatch: password.length > 0 && password === confirmPassword,
  };

  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allValid || !token) return;

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

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-grey-100" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v3a1 1 0 11-2 0V7zm0 6a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
        </svg>
      )}
      <span className={isValid ? 'text-success' : 'text-grey-300'}>{text}</span>
    </div>
  );

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-grey-500 mb-4">{t.errorCodes.RESET_TOKEN_INVALID}</h1>
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {t.forgotPassword.backToLogin}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={backgroundImage} alt="Magnetic Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-grey-500 mb-3">
              {t.changePassword.title}
            </h1>
            <p className="text-grey-300">
              {t.changePassword.subtitle}
            </p>
          </div>

          {success ? (
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-sm text-success">{t.changePassword.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-grey-500 mb-2">
                  {t.changePassword.newPassword}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder={t.changePassword.newPasswordPlaceholder}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-100 hover:text-grey-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-500 mb-2">
                  {t.changePassword.confirmPassword}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder={t.changePassword.confirmPasswordPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-grey-400">{t.changePassword.requirements}</p>
                <ValidationItem isValid={validations.minLength} text={t.changePassword.minLength} />
                <ValidationItem isValid={validations.hasSpecialChar} text={t.changePassword.hasSpecialChar} />
                <ValidationItem isValid={validations.hasNumber} text={t.changePassword.hasNumber} />
                <ValidationItem isValid={validations.hasUpperCase} text={t.changePassword.hasUpperCase} />
                <ValidationItem isValid={validations.passwordsMatch} text={t.changePassword.passwordsMatch} />
              </div>

              <button
                type="submit"
                disabled={isLoading || !allValid}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t.changePassword.updating : t.changePassword.updateButton}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <button type="button" onClick={() => navigate('/login')} className="text-primary-500 hover:text-primary-600 font-medium">
              &larr; {t.forgotPassword.backToLogin}
            </button>
          </div>

          <div className="mt-16">
            <div className="flex items-center justify-center">
              <img src={magneticLogo} alt="Powered by Magnetic" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
