import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import AuthLayout from '../../components/layout/AuthLayout';
import SocialAuthButton from '../../components/auth/SocialAuthButton';

export default function RegisterStep1() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    navigate('/register/password', { state: { firstName, email } });
  };

  return (
    <AuthLayout onBack={() => navigate('/login')}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold text-grey-700 mb-3"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          {t.register.title}
        </h1>
        <p className="text-grey-300 text-sm">
          {t.register.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-grey-500 mb-1.5">
            {t.register.nameLabel}
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-grey-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-grey-500 mb-1.5">
            {t.register.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-grey-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {t.register.registerButton}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-grey-50" />
        <span className="text-xs text-grey-300">{t.authSocial.orSignUpWith}</span>
        <div className="flex-1 h-px bg-grey-50" />
      </div>

      {/* Social buttons */}
      <div className="flex gap-3">
        <SocialAuthButton provider="google" comingSoon />
        <SocialAuthButton provider="facebook" comingSoon />
        <SocialAuthButton provider="apple" comingSoon />
      </div>

      {/* Login link */}
      <div className="mt-8 text-center">
        <p className="text-grey-300 text-sm">
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
    </AuthLayout>
  );
}
