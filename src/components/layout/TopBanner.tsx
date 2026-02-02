import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../i18n/LanguageContext';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Language } from '../../i18n/translations';
import { useState, useRef, useEffect } from 'react';
import type { UserProduct } from '../../types';

import magneticIsologo from '../../assets/images/Isologo-Black.png';

const languages: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

interface TopBannerProps {
  products: UserProduct[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProductClick: (slug: string) => void;
  onAIClick?: () => void;
  onHelpClick?: () => void;
}

export default function TopBanner({ products, activeTab, onTabChange, onProductClick, onAIClick, onHelpClick }: TopBannerProps) {
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
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reports', label: 'Reportes', comingSoon: true },
    { id: 'release-notes', label: 'Release Notes', comingSoon: true },
  ];

  return (
    <header className="bg-white border-b-2 border-primary-500 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo + Brand */}
          <div className="flex items-center flex-shrink-0">
            <img src={magneticIsologo} alt="Magnetic" className="h-6" />
          </div>

          {/* Center: Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 h-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (!tab.comingSoon) {
                    if (tab.id === 'dashboard') {
                      onTabChange('dashboard');
                    } else {
                      onProductClick(tab.id);
                    }
                  }
                }}
                className={`relative flex items-center gap-2 px-4 h-14 text-sm font-medium transition-colors ${
                  tab.comingSoon
                    ? 'text-grey-100 cursor-default'
                    : activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-grey-300 hover:text-grey-500'
                }`}
              >
                {tab.label}
                {tab.comingSoon && (
                  <span className="text-[10px] font-medium text-grey-100 bg-white-700 px-1.5 py-0.5 rounded-full">
                    Próximamente
                  </span>
                )}
                {activeTab === tab.id && !tab.comingSoon && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary-600 rounded-t" />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* AI Button */}
            {onAIClick && (
              <button
                onClick={onAIClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI
              </button>
            )}

            {/* Notification Bell */}
            <button className="relative p-2 text-grey-100 hover:text-grey-300 rounded-lg hover:bg-white-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Help */}
            <button
              onClick={onHelpClick}
              className="p-2 text-grey-100 hover:text-grey-300 rounded-lg hover:bg-white-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Language Selector - compact */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-grey-300 hover:text-grey-500 rounded-lg hover:bg-white-700 transition-colors"
              >
                {language.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-grey-50 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-white-700 ${
                        language === lang.code ? 'text-primary-600 font-medium' : 'text-grey-400'
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
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-white-700 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-grey-50 py-1 z-50">
                  <div className="px-4 py-3 border-b border-grey-50">
                    <p className="text-sm font-medium text-grey-500">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-grey-300">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-grey-400 hover:bg-white-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t.dashboardExtra.myProfile}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {t.auth.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: product tabs as horizontal scroll */}
      <div className="md:hidden border-t border-grey-50 overflow-x-auto">
        <div className="flex items-center gap-1 px-4 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (!tab.comingSoon) {
                  if (tab.id === 'dashboard') {
                    onTabChange('dashboard');
                  } else {
                    onProductClick(tab.id);
                  }
                }
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                tab.comingSoon
                  ? 'text-grey-100 cursor-default'
                  : activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-grey-300 hover:text-grey-500'
              }`}
            >
              {tab.label}
              {tab.comingSoon && (
                <span className="text-[9px] font-medium text-grey-100 bg-white-700 px-1 py-0.5 rounded-full">
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
