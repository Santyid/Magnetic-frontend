import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';
import backgroundImage from '../assets/images/magnetic-background.webp';
import magneticLogo from '../assets/images/powered-by-magnetic-logo.svg';

interface PasswordValidation {
  minLength: boolean;
  hasSpecialChar: boolean;
  hasNumber: boolean;
  hasUpperCase: boolean;
  passwordsMatch: boolean;
}

export default function Register() {
  const t = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasUpperCase: false,
    passwordsMatch: false,
  });

  // Validación en tiempo real de la contraseña
  useEffect(() => {
    setValidation({
      minLength: password.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      passwordsMatch: password === confirmPassword && password !== '' && confirmPassword !== '',
    });
  }, [password, confirmPassword]);

  const isFormValid = () => {
    return (
      email &&
      firstName &&
      lastName &&
      validation.minLength &&
      validation.hasSpecialChar &&
      validation.hasNumber &&
      validation.hasUpperCase &&
      validation.passwordsMatch &&
      acceptTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error(t.register.errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      await authAPI.register({
        email,
        firstName,
        lastName,
        password,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className={isValid ? 'text-grey-400' : 'text-grey-300'}>{text}</span>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <img
          src={backgroundImage}
          alt="Magnetic Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md relative z-10">
          <svg
            className="w-16 h-16 text-success mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl font-bold text-grey-500 mb-2">{t.register.successTitle}</h2>
          <p className="text-grey-300">{t.register.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={backgroundImage}
          alt="Magnetic Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Language Selector */}
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-grey-500 mb-3">{t.register.title}</h1>
            <p className="text-grey-300">{t.register.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                {t.register.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder={t.auth.emailPlaceholder}
                required
              />
            </div>

            {/* First Name Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                {t.register.nameLabel}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder={t.auth.firstNamePlaceholder}
                required
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                {t.register.lastNameLabel}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder={t.auth.lastNamePlaceholder}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                {t.register.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder={t.auth.passwordPlaceholder}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-100 hover:text-grey-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                {t.register.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder={t.auth.confirmPasswordPlaceholder}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-100 hover:text-grey-300"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.66667}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Password Validation */}
            <div className="bg-white-700 p-4 rounded-lg space-y-2 border border-grey-50">
              <ValidationItem
                isValid={validation.minLength}
                text={t.register.validation.minLength}
              />
              <ValidationItem
                isValid={validation.hasSpecialChar}
                text={t.register.validation.hasSpecialChar}
              />
              <ValidationItem
                isValid={validation.hasNumber}
                text={t.register.validation.hasNumber}
              />
              <ValidationItem
                isValid={validation.hasUpperCase}
                text={t.register.validation.hasUpperCase}
              />
              <ValidationItem
                isValid={validation.passwordsMatch}
                text={t.register.validation.passwordsMatch}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary-500 border-grey-50 rounded focus:ring-primary-500"
              />
              <label htmlFor="terms" className="text-sm text-grey-400">
                {t.register.termsLabel}{' '}
                <button
                  type="button"
                  onClick={() => window.open('/terms', '_blank')}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  {t.register.termsOfService}
                </button>{' '}
                y{' '}
                <button
                  type="button"
                  onClick={() => window.open('/privacy', '_blank')}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  {t.register.privacyPolicy}
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.register.registering : t.register.registerButton}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-grey-300">
              {t.auth.alreadyHaveAccount}{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                {t.auth.signIn}
              </button>
            </p>
          </div>

          {/* Powered by */}
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-center">
              <img
                src={magneticLogo}
                alt="Powered by Magnetic"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
