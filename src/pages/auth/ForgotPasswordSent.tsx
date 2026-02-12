import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import AuthLayout from '../../components/layout/AuthLayout';

export default function ForgotPasswordSent() {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1
          className="text-3xl font-bold text-grey-700 mb-3"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          {t.forgotPassword.sentTitle}
        </h1>
        <p className="text-grey-300 text-sm mb-8 max-w-sm mx-auto">
          {t.forgotPassword.sentSubtitle}
        </p>

        {/* Back to login */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {t.forgotPassword.backToLogin}
        </button>
      </div>
    </AuthLayout>
  );
}
