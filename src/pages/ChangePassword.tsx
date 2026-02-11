import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { useTranslation } from '../i18n/LanguageContext';
import api from '../services/api';

export default function ChangePassword() {
  const t = useTranslation();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [validation, setValidation] = useState({
    minLength: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasUpperCase: false,
    passwordsMatch: false,
  });

  useEffect(() => {
    setValidation({
      minLength: newPassword.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '',
    });
  }, [newPassword, confirmPassword]);

  const allValid = Object.values(validation).every(Boolean) && currentPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;

    setSaving(true);

    try {
      await api.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      toast.success(t.changePassword.successMessage);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const code = (err as AxiosError<{ message: string }>).response?.data?.message;
      toast.error(t.errorCodes[code as keyof typeof t.errorCodes] || t.changePassword.errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const EyeIcon = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-100 hover:text-grey-300"
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

  const ValidationItem = ({ valid, text }: { valid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${valid ? 'text-success' : 'text-grey-100'}`}>
      {valid ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      {text}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Simple top bar */}
      <header className="bg-white border-b border-grey-50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-grey-300 hover:text-grey-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 19l-7-7 7-7" />
              </svg>
              {t.profile.title}
            </button>
            <h1 className="text-sm font-semibold text-grey-500">{t.changePassword.title}</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-grey-500 mb-1">{t.changePassword.title}</h2>
          <p className="text-grey-300">{t.changePassword.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="bg-white rounded-lg border border-grey-50 p-6">
            <h3 className="text-lg font-semibold text-grey-500 mb-4">{t.changePassword.currentPassword}</h3>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                placeholder={t.changePassword.currentPasswordPlaceholder}
                required
              />
              <EyeIcon show={showCurrent} toggle={() => setShowCurrent(!showCurrent)} />
            </div>
          </div>

          {/* New Password */}
          <div className="bg-white rounded-lg border border-grey-50 p-6">
            <h3 className="text-lg font-semibold text-grey-500 mb-4">{t.changePassword.newPassword}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grey-400 mb-1">{t.changePassword.newPassword}</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2.5 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    placeholder={t.changePassword.newPasswordPlaceholder}
                    required
                  />
                  <EyeIcon show={showNew} toggle={() => setShowNew(!showNew)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-400 mb-1">{t.changePassword.confirmPassword}</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2.5 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    placeholder={t.changePassword.confirmPasswordPlaceholder}
                    required
                  />
                  <EyeIcon show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
                </div>
              </div>

              {/* Validation rules */}
              <div className="bg-white-700 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-grey-300 mb-2">{t.changePassword.requirements}</p>
                <ValidationItem valid={validation.minLength} text={t.changePassword.minLength} />
                <ValidationItem valid={validation.hasSpecialChar} text={t.changePassword.hasSpecialChar} />
                <ValidationItem valid={validation.hasNumber} text={t.changePassword.hasNumber} />
                <ValidationItem valid={validation.hasUpperCase} text={t.changePassword.hasUpperCase} />
                <ValidationItem valid={validation.passwordsMatch} text={t.changePassword.passwordsMatch} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-4 py-2.5 text-sm font-medium text-grey-400 hover:text-grey-500 transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={!allValid || saving}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? t.changePassword.updating : t.changePassword.updateButton}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
