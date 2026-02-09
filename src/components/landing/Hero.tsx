import { Link } from 'react-router-dom';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

interface HeroProps {
  language: LandingLanguage;
}

export default function Hero({ language }: HeroProps) {
  const t = useLandingTranslation(language);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary orb - blue */}
        <div
          className="orb orb-primary animate-float w-[500px] h-[500px] -top-20 -left-20 opacity-30"
          style={{ animationDelay: '0s' }}
        />
        {/* Secondary orb - pink/purple */}
        <div
          className="orb orb-secondary animate-float-slow w-[400px] h-[400px] top-1/3 -right-20 opacity-25"
          style={{ animationDelay: '-3s' }}
        />
        {/* Accent orb - gradient */}
        <div
          className="orb orb-primary animate-float w-[300px] h-[300px] bottom-20 left-1/4 opacity-20"
          style={{ animationDelay: '-5s' }}
        />
        {/* Small accent orb */}
        <div
          className="orb orb-secondary animate-float-slow w-[200px] h-[200px] top-20 right-1/4 opacity-20"
          style={{ animationDelay: '-2s' }}
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

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Badge */}
        <div className="animate-hero-fade-in animate-hero-delay-1 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#3ACE76] animate-pulse" />
            Magnetic Suite v2.0
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-hero-fade-in animate-hero-delay-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t.hero.title}
          <br />
          <span className="gradient-text">{t.hero.titleHighlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-fade-in animate-hero-delay-3 text-lg sm:text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="animate-hero-fade-in animate-hero-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login-new"
            className="group relative px-8 py-4 bg-[#0058E7] hover:bg-[#0045B4] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,88,231,0.4)] flex items-center gap-2"
          >
            {t.hero.ctaLogin}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.66667}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <button
            onClick={scrollToProducts}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            {t.hero.ctaLearnMore}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.66667}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>

        {/* Product logos preview */}
        <div className="animate-hero-fade-in mt-16 pt-12 border-t border-white/5">
          <p className="text-white/40 text-sm mb-6">
            {language === 'es' ? 'Incluye acceso a' : language === 'en' ? 'Includes access to' : 'Inclui acesso a'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-white font-medium">SocialGest</span>
            <span className="text-white/30">|</span>
            <span className="text-white font-medium">Tikket</span>
            <span className="text-white/30">|</span>
            <span className="text-white font-medium">AdvocatesPro</span>
            <span className="text-white/30">|</span>
            <span className="text-white font-medium">Quantico</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.66667}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
