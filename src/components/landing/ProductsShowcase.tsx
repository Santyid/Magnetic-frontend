import { useEffect, useRef, useState } from 'react';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

// Import product logos
import socialgestLogo from '../../assets/images/SocialGest-Imagotipo-Blue.png';
import tikketLogo from '../../assets/images/Tikket-Imagotipo-Blue.png';
import advocatesLogo from '../../assets/images/Advocates-Imagotipo-Blue.png';
import quanticoLogo from '../../assets/images/Quantico-Imagotipo-Blue.png';

interface ProductsShowcaseProps {
  language: LandingLanguage;
}

interface Product {
  name: string;
  logo: string;
  url: string;
  color: string;
  descKey: 'socialgestDesc' | 'tikketDesc' | 'advocatesDesc' | 'quanticoDesc';
}

const products: Product[] = [
  {
    name: 'SocialGest',
    logo: socialgestLogo,
    url: 'https://socialgest.net/es',
    color: '#0058E7',
    descKey: 'socialgestDesc',
  },
  {
    name: 'Tikket',
    logo: tikketLogo,
    url: 'https://www.tikket.net/es',
    color: '#0058E7',
    descKey: 'tikketDesc',
  },
  {
    name: 'AdvocatesPro',
    logo: advocatesLogo,
    url: 'https://magneticsuite.com/advocatespro',
    color: '#ae4a79',
    descKey: 'advocatesDesc',
  },
  {
    name: 'Quantico',
    logo: quanticoLogo,
    url: 'https://quantico.ai/',
    color: '#0058E7',
    descKey: 'quanticoDesc',
  },
];

export default function ProductsShowcase({ language }: ProductsShowcaseProps) {
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
      id="products"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0a0a0f]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0058E7]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-reveal-up visible' : 'animate-reveal-up'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.products.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl glass hover-lift hover-glow transition-all duration-300 ${
                isVisible ? `animate-reveal-up visible reveal-delay-${index + 1}` : 'animate-reveal-up'
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 0.1}s` : '0s'
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${product.color}15 0%, transparent 70%)`
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Logo */}
                <div className="h-12 mb-6 flex items-center">
                  <img
                    src={product.logo}
                    alt={product.name}
                    className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                  {t.products[product.descKey]}
                </p>

                {/* Visit button */}
                <div className="flex items-center gap-2 text-white/40 group-hover:text-[#0058E7] transition-colors text-sm font-medium">
                  {t.products.visitSite}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.66667}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: `1px solid ${product.color}40`
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
