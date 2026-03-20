import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';

interface BlurOverlayProps {
  locked: boolean;
  children: React.ReactNode;
  ctaText?: string;
}

export default function BlurOverlay({ locked, children, ctaText }: BlurOverlayProps) {
  const navigate = useNavigate();
  const t = useTranslation();

  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none" style={{ filter: 'blur(8px)' }}>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor" className="w-8 h-8 text-gray-400 mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <p className="text-sm text-gray-500 mb-3 text-center px-4">
          {ctaText || t.demo?.unlockText || 'Register to unlock full report'}
        </p>
        <button
          onClick={() => navigate('/register')}
          className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t.demo?.unlockCta || 'Register Free'}
        </button>
      </div>
    </div>
  );
}
