import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../i18n/LanguageContext';
import { useLanguage } from '../i18n/LanguageContext';
import { usersAPI } from '../services/api';

export default function Profile() {
  const t = useTranslation();
  const { language } = useLanguage();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    try {
      await usersAPI.update(user.id, { firstName, lastName });
      toast.success(t.profile.savedSuccess);
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.profile.savedError);
    } finally {
      setSaving(false);
    }
  };

  const dateLocale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';

  return (
    <div className="min-h-screen bg-white">
      {/* Simple top bar */}
      <header className="bg-white border-b border-grey-50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-grey-300 hover:text-grey-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </button>
            <h1 className="text-sm font-semibold text-grey-500">{t.profile.title}</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-grey-500">{user?.firstName} {user?.lastName}</h2>
            <p className="text-grey-300">{user?.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-lg border border-grey-50 p-6">
            <h3 className="text-lg font-semibold text-grey-500 mb-4">{t.profile.personalInfo}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-grey-400 mb-1">{t.profile.name}</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-grey-400 mb-1">{t.profile.lastName}</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-grey-400 mb-1">{t.profile.emailLabel}</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2.5 border border-grey-50 rounded-lg bg-white-700 text-grey-300 cursor-not-allowed"
              />
              <p className="text-xs text-grey-100 mt-1">{t.profile.emailDisabled}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg border border-grey-50 p-6">
            <h3 className="text-lg font-semibold text-grey-500 mb-4">{t.profile.account}</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-grey-500">{t.profile.status}</p>
                  <p className="text-xs text-grey-300">{t.profile.statusDescription}</p>
                </div>
                <span className="px-2.5 py-1 bg-success/20 text-success text-xs font-medium rounded-full">
                  {t.profile.active}
                </span>
              </div>

              <div className="border-t border-grey-50" />

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-grey-500">{t.profile.role}</p>
                  <p className="text-xs text-grey-300">{t.profile.roleDescription}</p>
                </div>
                <span className="px-2.5 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                  {user?.isAdmin ? t.profile.administrator : t.profile.user}
                </span>
              </div>

              <div className="border-t border-grey-50" />

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-grey-500">{t.profile.memberSince}</p>
                  <p className="text-xs text-grey-300">{t.profile.memberSinceDescription}</p>
                </div>
                <span className="text-sm text-grey-300">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(dateLocale, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Security shortcut */}
          <div className="bg-white rounded-lg border border-grey-50 p-6">
            <h3 className="text-lg font-semibold text-grey-500 mb-4">{t.profile.security}</h3>
            <button
              type="button"
              onClick={() => navigate('/change-password')}
              className="flex items-center justify-between w-full py-2 group"
            >
              <div className="text-left">
                <p className="text-sm font-medium text-grey-500">{t.profile.changePassword}</p>
                <p className="text-xs text-grey-300">{t.profile.changePasswordDescription}</p>
              </div>
              <svg className="w-5 h-5 text-grey-100 group-hover:text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? t.profile.saving : t.profile.saveChanges}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
