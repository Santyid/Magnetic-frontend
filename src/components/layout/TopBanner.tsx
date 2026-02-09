import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../i18n/LanguageContext';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Language } from '../../i18n/translations';
import { useState, useRef, useEffect } from 'react';

import magneticLogo from '../../assets/images/Isologo-Blue.png';

const languages: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

interface TopBannerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAIClick?: () => void;
  onHelpClick?: () => void;
}

export default function TopBanner({ activeTab, onTabChange, onAIClick, onHelpClick }: TopBannerProps) {
  const t = useTranslation();
  const { user, logout } = useAuthStore();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login-new');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reports', label: 'Reportes', comingSoon: true },
    { id: 'release-notes', label: t.releaseNotes.title },
  ];

  return (
    <header className="bg-white border-b border-[#ECECEC] sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <img src={magneticLogo} alt="Magnetic" className="h-8" />
          </div>

          {/* Center: Navigation Tabs — Urbanist Bold 16px per design */}
          <nav className="hidden md:flex items-center gap-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (!tab.comingSoon) {
                    onTabChange(tab.id);
                  }
                }}
                className={[
                  'flex items-center gap-2.5 font-urbanist text-[16px] leading-[100%] transition-colors',
                  tab.comingSoon
                    ? 'text-[#A6A6A6] cursor-default font-bold'
                    : activeTab === tab.id
                      ? 'text-primary-500 font-bold'
                      : 'text-[#7D7D7D] font-bold hover:text-[#222222]',
                ].join(' ')}
              >
                {tab.label}
                {tab.comingSoon && (
                  <span className="text-[10px] font-medium text-[#A6A6A6] bg-[#F3F4F6] px-2.5 py-0.5 rounded-[10px]">
                    Próximamente
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* AI Button — gradient border #00AAFF → #004AC2 */}
            <button
              onClick={onAIClick}
              className="relative flex items-center gap-2 px-5 h-[42px] bg-white rounded-lg text-[15px] font-semibold text-primary-500 transition-shadow hover:shadow-md"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #00AAFF, #004AC2)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              {/* Sparkle icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00AAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" />
                <path d="M20 6v4" />
                <path d="M22 8h-4" />
                <path d="M6 18v2" />
                <path d="M7 19H5" />
              </svg>
              AI
            </button>

            {/* Notification Bell with red dot */}
            <button className="relative p-1 text-[#222222] hover:text-[#000000] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0.5 right-0.5 w-[9px] h-[9px] bg-[#E30613] rounded-full" />
            </button>

            {/* Help */}
            <button
              onClick={onHelpClick}
              className="p-1 text-[#222222] hover:text-[#000000] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm font-medium text-[#222222] hover:text-[#000000] transition-colors"
              >
                {language.toUpperCase()}
                <svg className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-[#ECECEC] py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[#F3F4F6] ${
                        language === lang.code ? 'text-primary-500 font-medium' : 'text-grey-400'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar / Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center"
              >
                <div className="w-[51px] h-[51px] bg-primary-500 rounded-full flex items-center justify-center text-white text-base font-semibold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-5 z-50">
                  {/* Triangle arrow */}
                  <div className="absolute -top-[10px] right-5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white" style={{ filter: 'drop-shadow(0 -2px 2px rgba(0,0,0,0.04))' }} />
                  <div className="w-[260px] bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
                    {/* Profile section */}
                    <div className="flex items-center gap-3.5 px-7 pt-7 pb-6">
                      <div className="w-[42px] h-[42px] bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </div>
                      <span className="text-[17px] font-semibold text-[#232323] leading-tight">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>

                    {/* Perfil link */}
                    <button
                      onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}
                      className="w-full text-left px-7 py-4 text-[14px] font-medium text-[#232323] hover:bg-[#F5F7FA] flex items-center gap-3 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t.dashboardExtra.myProfile}
                    </button>

                    {/* Divider with spacing */}
                    <div className="py-2">
                      <div className="mx-7 border-t border-[#EDEDED]" />
                    </div>

                    {/* Cerrar sesión */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-7 py-4 pb-5 text-[14px] font-medium text-[#FC3E3E] hover:bg-error-50 flex items-center gap-3 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t.auth.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: tabs as horizontal scroll */}
      <div className="md:hidden border-t border-[#ECECEC] overflow-x-auto">
        <div className="flex items-center gap-6 px-6 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (!tab.comingSoon) onTabChange(tab.id);
              }}
              className={[
                'flex-shrink-0 flex items-center gap-2 text-xs font-medium transition-colors',
                tab.comingSoon
                  ? 'text-[#A6A6A6] cursor-default'
                  : activeTab === tab.id
                    ? 'text-[#222222] font-semibold'
                    : 'text-[#7D7D7D]',
              ].join(' ')}
            >
              {tab.label}
              {tab.comingSoon && (
                <span className="text-[9px] text-[#A6A6A6] bg-[#F3F4F6] px-1.5 py-0.5 rounded-[10px]">
                  Próximamente
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
