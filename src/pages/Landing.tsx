import { useState, useEffect } from 'react';
import { detectLandingLanguage } from '../i18n/landingTranslations';

// Import animations CSS
import '../styles/animations.css';

// Import components
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProductsShowcase from '../components/landing/ProductsShowcase';
import Features from '../components/landing/Features';
import Stats from '../components/landing/Stats';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

type LandingLanguage = 'es' | 'en' | 'pt';

export default function Landing() {
  const [language, setLanguage] = useState<LandingLanguage>(() => detectLandingLanguage());

  // Sync with existing language context if available
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] dark-scrollbar">
      {/* Navbar */}
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero language={language} />

        {/* Products Showcase */}
        <ProductsShowcase language={language} />

        {/* Features */}
        <Features language={language} />

        {/* Stats */}
        <Stats language={language} />

        {/* CTA Section */}
        <CTASection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} onLanguageChange={handleLanguageChange} />
    </div>
  );
}
