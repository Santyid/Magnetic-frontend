import { useTranslation } from '../../i18n/LanguageContext';
import backgroundImage from '../../assets/images/magnetic-background.webp';
import magneticLogo from '../../assets/images/powered-by-magnetic-logo.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
}

export default function AuthLayout({ children, onBack }: AuthLayoutProps) {
  const t = useTranslation();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={backgroundImage}
          alt="Magnetic Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto">
        {/* Back button */}
        {onBack && (
          <div className="p-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-grey-500 border border-grey-50 rounded-full hover:bg-white-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t.auth.back}
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Magnetic Logo */}
        <div className="pb-8 flex items-center justify-center">
          <img
            src={magneticLogo}
            alt="Powered by Magnetic"
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}
