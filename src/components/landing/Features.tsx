import { useEffect, useRef, useState, type JSX } from 'react';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

interface FeaturesProps {
  language: LandingLanguage;
}

interface Feature {
  key: 'sso' | 'dashboard' | 'security' | 'multilang' | 'ai' | 'support';
  icon: JSX.Element;
  gradient: string;
}

const features: Feature[] = [
  {
    key: 'sso',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    gradient: 'from-[#0058E7] to-[#4d94ff]',
  },
  {
    key: 'dashboard',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-[#3ACE76] to-[#6ee7a0]',
  },
  {
    key: 'security',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-[#ae4a79] to-[#d06a94]',
  },
  {
    key: 'multilang',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-[#FF962C] to-[#ffb366]',
  },
  {
    key: 'ai',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-[#528BFE] to-[#80aaff]',
  },
  {
    key: 'support',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    gradient: 'from-[#EE4A79] to-[#f472a0]',
  },
];

export default function Features({ language }: FeaturesProps) {
  const t = useLandingTranslation(language);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0f]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-secondary animate-float-slow w-[300px] h-[300px] top-1/4 -left-32 opacity-10" />
        <div className="orb orb-primary animate-float w-[250px] h-[250px] bottom-1/4 -right-20 opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-reveal-up visible' : 'animate-reveal-up'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className={`group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 ${
                isVisible ? `animate-reveal-up visible` : 'animate-reveal-up'
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 0.1}s` : '0s'
              }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.features[feature.key].title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                {t.features[feature.key].description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
