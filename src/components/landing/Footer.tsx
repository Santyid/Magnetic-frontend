import { Link } from 'react-router-dom';
import { landingTranslations } from '../../i18n/landingTranslations';

type LandingLanguage = 'es' | 'en' | 'pt';
const useLandingTranslation = (lang: LandingLanguage) => landingTranslations[lang];

// Import logo
import magneticLogo from '../../assets/images/Isologo-White.png';

interface FooterProps {
  language: LandingLanguage;
  onLanguageChange: (lang: LandingLanguage) => void;
}

const products = [
  { name: 'SocialGest', url: 'https://socialgest.net/es' },
  { name: 'Tikket', url: 'https://www.tikket.net/es' },
  { name: 'AdvocatesPro', url: 'https://magneticsuite.com/advocatespro' },
  { name: 'Quantico', url: 'https://quantico.ai/' },
];

export default function Footer({ language, onLanguageChange }: FooterProps) {
  const t = useLandingTranslation(language);

  const languages: { code: LandingLanguage; flag: string; name: string }[] = [
    { code: 'es', flag: '🇪🇸', name: 'Espanol' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'pt', flag: '🇧🇷', name: 'Portugues' },
  ];

  return (
    <footer className="bg-[#050508] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={magneticLogo} alt="Magnetic" className="h-8" />
              <span className="text-white font-semibold">Magnetic</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/magnetic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/magnetic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.products}</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Language Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="mailto:hello@magnetic.com"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  hello@magnetic.com
                </a>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    language === lang.code
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#3ACE76] animate-pulse" />
            <span>{language === 'es' ? 'Todos los sistemas operativos' : language === 'en' ? 'All systems operational' : 'Todos os sistemas operacionais'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
