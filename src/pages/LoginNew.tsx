import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { landingTranslations, detectLandingLanguage } from '../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];
import toast from 'react-hot-toast';

// Import animations CSS
import '../styles/animations.css';

// Import logo
import magneticLogo from '../assets/images/Isologo-White.png';
import poweredByLogo from '../assets/images/powered-by-magnetic-logo.svg';

export default function LoginNew() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, user, clearError } = useAuthStore();

  const [language, setLanguage] = useState<LandingLanguage>(() => detectLandingLanguage());
  const t = useLandingTranslation(language);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sync language with localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && ['es', 'en', 'pt'].includes(storedLang)) {
      setLanguage(storedLang as LandingLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: LandingLanguage) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const languages: { code: LandingLanguage; flag: string; name: string }[] = [
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary orb - blue */}
        <div
          className="orb orb-primary animate-float w-[600px] h-[600px] -top-40 -left-40 opacity-30"
          style={{ animationDelay: '0s' }}
        />
        {/* Secondary orb - pink */}
        <div
          className="orb orb-secondary animate-float-slow w-[500px] h-[500px] -bottom-40 -right-40 opacity-25"
          style={{ animationDelay: '-4s' }}
        />
        {/* Small accent orbs */}
        <div
          className="orb orb-primary animate-float w-[200px] h-[200px] top-1/4 right-1/4 opacity-15"
          style={{ animationDelay: '-2s' }}
        />
        <div
          className="orb orb-secondary animate-float-slow w-[150px] h-[150px] bottom-1/3 left-1/4 opacity-15"
          style={{ animationDelay: '-6s' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Language Selector - Fixed top right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-lg p-1 border border-white/10">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glass Card */}
        <div className="glass-light rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="form-element text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={magneticLogo} alt="Magnetic" className="h-10 filter brightness-0" />
              <span className="text-2xl font-bold text-grey-500">Magnetic</span>
            </Link>
          </div>

          {/* Header */}
          <div className="form-element text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-grey-500 mb-2">
              {t.login.title}
            </h1>
            <p className="text-grey-300">
              {t.login.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="form-element">
              <label className="block text-sm font-medium text-grey-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                required
                className="w-full px-4 py-3.5 bg-white border border-grey-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0058E7]/50 focus:border-[#0058E7] transition-all text-grey-500 placeholder:text-grey-100"
              />
            </div>

            {/* Password Input */}
            <div className="form-element">
              <label className="block text-sm font-medium text-grey-400 mb-2">
                {language === 'es' ? 'Contrasena' : language === 'en' ? 'Password' : 'Senha'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-grey-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0058E7]/50 focus:border-[#0058E7] transition-all text-grey-500 placeholder:text-grey-100 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-100 hover:text-grey-300 transition-colors"
                >
                  {showPassword ? (
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
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-element flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-grey-50 text-[#0058E7] focus:ring-[#0058E7]/50"
                />
                <span className="text-sm text-grey-300">{t.login.rememberMe}</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#0058E7] hover:text-[#0045B4] font-medium transition-colors"
              >
                {t.login.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <div className="form-element">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#0058E7] hover:bg-[#0045B4] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,88,231,0.4)] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{language === 'es' ? 'Ingresando...' : language === 'en' ? 'Signing in...' : 'Entrando...'}</span>
                  </>
                ) : (
                  t.login.submitButton
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="form-element mt-8 text-center">
            <p className="text-grey-300 text-sm">
              {t.login.noAccount}{' '}
              <Link
                to="/register"
                className="text-[#0058E7] hover:text-[#0045B4] font-semibold transition-colors"
              >
                {t.login.createAccount}
              </Link>
            </p>
          </div>

          {/* Demo Login Button */}
          <div className="form-element mt-6">
            <button
              type="button"
              onClick={() => {
                setEmail('demo@magnetic.com');
                setPassword('Demo123!');
              }}
              className="w-full py-3 bg-white/50 hover:bg-white/80 text-grey-400 font-medium rounded-xl border border-grey-50 transition-all text-sm"
            >
              {language === 'es' ? 'Usar credenciales demo' : language === 'en' ? 'Use demo credentials' : 'Usar credenciais demo'}
            </button>
          </div>
        </div>

        {/* Powered by Magnetic */}
        <div className="form-element mt-8 flex justify-center">
          <img src={poweredByLogo} alt="Powered by Magnetic" className="h-6 opacity-50" />
        </div>
      </div>
    </div>
  );
}
