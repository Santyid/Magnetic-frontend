import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

// Import logo
import magneticLogo from '../../assets/images/Isologo-White.png';

interface NavbarProps {
  language: LandingLanguage;
  onLanguageChange: (lang: LandingLanguage) => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  const t = useLandingTranslation(language);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const languages: { code: LandingLanguage; flag: string; name: string }[] = [
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={magneticLogo} alt="Magnetic" className="h-8 md:h-10" />
            <span className="text-white font-semibold text-lg hidden sm:block">
              Magnetic Suite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('products')}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.features}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    language === lang.code
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>

            <Link
              to="/login"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium px-4 py-2"
            >
              {t.nav.login}
            </Link>
            <Link
              to="/register"
              className="bg-[#0058E7] hover:bg-[#0045B4] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {t.nav.register}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.66667}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.66667}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('products')}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium text-left px-2 py-2"
              >
                {t.nav.products}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium text-left px-2 py-2"
              >
                {t.nav.features}
              </button>

              {/* Language Selector Mobile */}
              <div className="flex items-center gap-2 px-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      language === lang.code
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0058E7] hover:bg-[#0045B4] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.register}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
