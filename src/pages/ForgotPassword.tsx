import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { authAPI } from '../services/api';
import { useTranslation } from '../i18n/LanguageContext';
import AuthLayout from '../components/layout/AuthLayout';

export default function ForgotPassword() {
  const t = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authAPI.forgotPassword(email);
      navigate('/forgot-password/sent');
    } catch (err: unknown) {
      const code = (err as AxiosError<{ message: string }>).response?.data?.message;
      toast.error(t.errorCodes[code as keyof typeof t.errorCodes] || t.forgotPassword.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout onBack={() => navigate('/login')}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold text-grey-700 mb-3"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          {t.forgotPassword.title}
        </h1>
        <p className="text-grey-300 text-sm max-w-sm mx-auto">
          {t.forgotPassword.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-grey-500 mb-1.5">
            {t.forgotPassword.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-grey-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-sm"
            placeholder={t.forgotPassword.emailPlaceholder}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? t.forgotPassword.sending : t.forgotPassword.sendButton}
        </button>
      </form>
    </AuthLayout>
  );
}
