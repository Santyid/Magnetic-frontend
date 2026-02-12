import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import AuthLayout from '../../components/layout/AuthLayout';
import SocialAuthButton from '../../components/auth/SocialAuthButton';

export default function LoginStep1() {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      {/* Tagline */}
      <div className="mb-10 text-center">
        <h1
          className="text-3xl font-bold text-grey-700 mb-3"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          {t.authSocial.tagline}
        </h1>
        <p className="text-grey-300 text-sm">
          {t.authSocial.taglineSubtitle}
        </p>
      </div>

      {/* Method buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate('/login/email')}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-grey-50 rounded-lg text-sm font-medium text-grey-500 hover:bg-white-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          {t.authSocial.continueWithEmail}
        </button>

        <SocialAuthButton
          provider="google"
          label={t.authSocial.continueWithGoogle}
          comingSoon
          fullWidth
        />

        <SocialAuthButton
          provider="facebook"
          label={t.authSocial.continueWithFacebook}
          comingSoon
          fullWidth
        />
      </div>

      {/* Sign up link */}
      <div className="mt-8 text-center">
        <p className="text-grey-300 text-sm">
          {t.auth.dontHaveAccount}{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {t.auth.signUp}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
