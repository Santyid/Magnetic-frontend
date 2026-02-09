import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../i18n/LanguageContext';
import { useLanguage } from '../i18n/LanguageContext';
import { usersAPI, authAPI } from '../services/api';
import TopBanner from '../components/layout/TopBanner';
import FAQDrawer from '../components/help/FAQDrawer';
import ChatDrawer from '../components/ai/ChatDrawer';

export default function Profile() {
  const t = useTranslation();
  const { language } = useLanguage();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const validation = {
    minLength: newPassword.length >= 8,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasUpperCase: /[A-Z]/.test(newPassword),
    passwordsMatch: newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '',
  };

  const allValid = Object.values(validation).every(Boolean) && currentPassword.length > 0;

  const validCount = Object.values(validation).filter(Boolean).length;
  const progressPercent = (validCount / 5) * 100;

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

  const handleChangePassword = async () => {
    if (!allValid) return;
    setUpdatingPassword(true);

    try {
      await authAPI.changePassword(currentPassword, newPassword);
      toast.success(t.changePassword.successMessage);
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.changePassword.errorMessage);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPw(false);
    setShowNewPw(false);
    setShowConfirmPw(false);
  };

  const dateLocale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';

  const EyeIcon = ({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-300 hover:text-grey-400 transition-colors">
      {visible ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <TopBanner
        activeTab="profile"
        onTabChange={(tab) => { if (tab === 'dashboard') navigate('/dashboard'); }}
        onAIClick={() => setShowAI((prev) => !prev)}
        onHelpClick={() => setShowFAQ(true)}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#F5F7FA] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0061FE" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="#0061FE" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-grey-800">{t.profile.title}</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 h-12 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? t.profile.saving : t.profile.saveChanges}
          </button>
        </div>

        <form onSubmit={handleSave}>
          {/* Two cards side by side */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Left Card - Personal Info */}
            <div className="flex-1 bg-white rounded-[10px] border border-[#EDEDED] p-10">
              {/* Avatar centered */}
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40 bg-primary-500 rounded-full flex items-center justify-center text-white text-5xl font-semibold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </div>

              {/* Name fields side by side */}
              <div className="grid grid-cols-2 gap-6 mb-5">
                <div>
                  <label className="block text-sm font-medium text-grey-400 mb-2">{t.profile.name}</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 h-12 border border-grey-100 rounded-[10px] text-sm text-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-grey-400 mb-2">{t.profile.lastName}</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 h-12 border border-grey-100 rounded-[10px] text-sm text-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-grey-400 mb-2">{t.profile.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 h-12 border border-grey-100 rounded-[10px] bg-grey-50 text-grey-300 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right Card - Account Info */}
            <div className="lg:w-[49%] bg-white rounded-[10px] border border-[#ECECEC] py-10">
              {/* Estado */}
              <div className="px-10 flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-bold text-grey-800">{t.profile.status}</p>
                  <p className="text-[13px] text-grey-300 mt-2">{t.profile.statusDescription}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-success-50 text-success rounded-full text-xs font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t.profile.active}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#ECECEC] my-8 mx-10" />

              {/* Rol */}
              <div className="px-10 flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-bold text-grey-800">{t.profile.role}</p>
                  <p className="text-[13px] text-grey-300 mt-2">{t.profile.roleDescription}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 text-primary-500 rounded-full text-xs font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} fill="none" stroke="currentColor" />
                  </svg>
                  {user?.isAdmin ? t.profile.administrator : t.profile.user}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#ECECEC] my-8 mx-10" />

              {/* Miembro desde */}
              <div className="px-10 flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-bold text-grey-800">{t.profile.memberSince}</p>
                  <p className="text-[13px] text-grey-300 mt-2">{t.profile.memberSinceDescription}</p>
                </div>
                <span className="text-sm text-grey-300 whitespace-nowrap">
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

          {/* Change Password Card - Full width, solid border */}
          <div className="bg-white rounded-[10px] border border-[#ECECEC] px-8 py-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-grey-800">{t.profile.changePassword}</h3>
                <p className="text-sm text-grey-300 mt-1">{t.profile.changePasswordDescription}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="px-6 h-12 border border-grey-100 text-grey-400 hover:text-grey-500 hover:border-grey-300 text-sm font-medium rounded-lg transition-colors"
              >
                {t.profile.changePassword}
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={handleClosePasswordModal} />

          {/* Modal */}
          <div className="relative w-[527px] bg-white rounded-[40px] border border-[#ECECEC] p-12 z-10">
            {/* Header: Lock icon + Title + Close button */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-error-50 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC3E3E" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-grey-800">{t.changePassword.title}</h2>
              </div>
              <button
                type="button"
                onClick={handleClosePasswordModal}
                className="text-grey-300 hover:text-grey-500 transition-colors mt-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-grey-300 mb-8 text-center">{t.changePassword.subtitle}</p>

            {/* Current Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-grey-400 mb-2">{t.changePassword.currentPassword}</label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={t.changePassword.currentPasswordPlaceholder}
                  className="w-full px-4 h-12 border border-grey-100 rounded-[10px] text-sm text-grey-500 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                />
                <EyeIcon visible={showCurrentPw} onClick={() => setShowCurrentPw(!showCurrentPw)} />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-grey-400 mb-2">{t.changePassword.newPassword}</label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t.changePassword.newPasswordPlaceholder}
                  className="w-full px-4 h-12 border border-grey-100 rounded-[10px] text-sm text-grey-500 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                />
                <EyeIcon visible={showNewPw} onClick={() => setShowNewPw(!showNewPw)} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-grey-400 mb-2">{t.changePassword.confirmPassword}</label>
              <div className="relative">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.changePassword.confirmPasswordPlaceholder}
                  className="w-full px-4 h-12 border border-grey-100 rounded-[10px] text-sm text-grey-500 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                />
                <EyeIcon visible={showConfirmPw} onClick={() => setShowConfirmPw(!showConfirmPw)} />
              </div>
            </div>

            {/* Requirements panel */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-8">
              <p className="text-sm font-semibold text-grey-500 mb-3">{t.changePassword.requirements}</p>

              {/* Progress bar */}
              <div className="h-3 bg-[#E2E8F0] rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: progressPercent === 100 ? '#3ACE76' : '#F59E0B',
                  }}
                />
              </div>

              <ul className="space-y-2">
                {([
                  ['minLength', t.changePassword.minLength],
                  ['hasSpecialChar', t.changePassword.hasSpecialChar],
                  ['hasNumber', t.changePassword.hasNumber],
                  ['hasUpperCase', t.changePassword.hasUpperCase],
                  ['passwordsMatch', t.changePassword.passwordsMatch],
                ] as const).map(([key, label]) => (
                  <li key={key} className="flex items-center gap-2 text-sm">
                    {validation[key] ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3ACE76" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3C3C3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    <span className={validation[key] ? 'text-success' : 'text-grey-300'}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClosePasswordModal}
                className="px-6 h-10 border border-grey-100 text-grey-500 text-sm font-medium rounded-lg hover:border-grey-300 transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={!allValid || updatingPassword}
                className="px-6 h-10 bg-error text-white text-sm font-medium rounded-lg hover:bg-error-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingPassword ? t.changePassword.updating : t.changePassword.updateButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFAQ && <FAQDrawer onClose={() => setShowFAQ(false)} />}
      {showAI && <ChatDrawer onClose={() => setShowAI(false)} />}
    </div>
  );
}
