import { useEffect, useRef, useState, type JSX } from 'react';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

interface StatsProps {
  language: LandingLanguage;
}

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: boolean = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

interface Stat {
  value: number;
  suffix?: string;
  labelKey: 'products' | 'languages' | 'support';
  icon: JSX.Element;
}

const stats: Stat[] = [
  {
    value: 4,
    labelKey: 'products',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    value: 3,
    labelKey: 'languages',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    value: 24,
    suffix: '/7',
    labelKey: 'support',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function Stats({ language }: StatsProps) {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Individual count hooks for each stat
  const count1 = useCountUp(stats[0].value, 1500, isVisible);
  const count2 = useCountUp(stats[1].value, 1500, isVisible);
  const count3 = useCountUp(stats[2].value, 1500, isVisible);
  const counts = [count1, count2, count3];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0058E7]/10 to-[#0a0a0f]"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0058E7]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className={`text-center ${
                isVisible ? 'animate-reveal-scale visible' : 'animate-reveal-scale'
              }`}
              style={{
                animationDelay: isVisible ? `${index * 0.15}s` : '0s'
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-white/5 text-[#0058E7]">
                  {stat.icon}
                </div>
              </div>

              {/* Number */}
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                <span className={isVisible ? 'animate-pulse-glow' : ''}>
                  {counts[index]}
                </span>
                {stat.suffix && (
                  <span className="text-[#0058E7]">{stat.suffix}</span>
                )}
              </div>

              {/* Label */}
              <p className="text-white/60 text-lg">
                {t.stats[stat.labelKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
