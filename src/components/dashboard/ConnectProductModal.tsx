import { useState } from 'react';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { useTranslation } from '../../i18n/LanguageContext';
import { dashboardAPI } from '../../services/api';
import type { UserProduct } from '../../types';
import SocialAuthButton from '../auth/SocialAuthButton';

// Product imagotipos (logo + name)
import SocialGestLogo from '../../assets/images/SocialGest-Imagotipo-Blue.png';
import TikketLogo from '../../assets/images/Tikket-Imagotipo-Blue.png';
import AdvocatesLogo from '../../assets/images/Advocates-Imagotipo-Blue.png';
import QuanticoLogo from '../../assets/images/Quantico-Imagotipo-Blue.png';

const productLogos: Record<string, string> = {
  socialgest: SocialGestLogo,
  tikket: TikketLogo,
  advocates: AdvocatesLogo,
  quantico: QuanticoLogo,
};

interface ConnectProductModalProps {
  userProduct: UserProduct;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConnectProductModal({ userProduct, onClose, onSuccess }: ConnectProductModalProps) {
  const t = useTranslation();
  const [productEmail, setProductEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomain, setSubdomain] = useState(userProduct.customDomain?.replace(/\..*/, '') || '');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const slug = userProduct.product.slug;
  const isAdvocates = slug === 'advocates';
  const logo = productLogos[slug];

  // Social buttons config per product
  const socialConfig: Record<string, Array<'google' | 'facebook' | 'apple'>> = {
    socialgest: ['google', 'facebook', 'apple'],
    advocates: ['google'],
  };
  const socialButtons = socialConfig[slug] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dashboardAPI.connectProduct(userProduct.id, {
        productEmail,
        password,
        ...(isAdvocates && subdomain ? { subdomain } : {}),
      });
      toast.success(t.metrics.connected);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message;
      if (msg === 'INVALID_PRODUCT_CREDENTIALS') {
        toast.error(t.metrics.connectionError);
      } else {
        toast.error(msg || t.metrics.connectionError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative bg-white w-[512px] max-w-[calc(100%-32px)] overflow-hidden border border-grey-50"
        style={{ borderRadius: '40px', padding: '40px', gap: '40px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient orbs background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -bottom-20 -left-20 w-[300px] h-[300px] opacity-40"
            style={{ background: 'radial-gradient(56.02% 56.02% at 50% 50%, #B0CEFF 0%, rgba(255, 255, 255, 0) 100%)' }}
          />
          <div
            className="absolute -top-10 -right-16 w-[280px] h-[280px] opacity-40"
            style={{ background: 'radial-gradient(56.02% 56.02% at 50% 50%, #E1CAF6 0%, rgba(255, 255, 255, 0) 100%)' }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-[300px] h-[300px] opacity-35"
            style={{ background: 'radial-gradient(56.02% 56.02% at 50% 50%, #FCD6C1 0%, rgba(255, 255, 255, 0) 100%)' }}
          />
        </div>

        {/* Product imagotipo */}
        <div className="relative flex justify-center mb-6">
          {logo && (
            <img src={logo} alt={userProduct.product.name} className="h-10" />
          )}
        </div>

        {/* Title + subtitle */}
        <div className="relative text-center mb-8">
          <h2
            className="text-grey-800"
            style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: '21px', lineHeight: '38px', letterSpacing: '-0.02em' }}
          >{t.metrics.connectTitle}</h2>
          <p
            className="text-grey-500 mt-2"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '-0.02em' }}
          >{t.metrics.connectSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div>
            <label className="block text-sm font-medium text-grey-800 mb-1.5">{t.metrics.emailLabel}</label>
            <input
              type="text"
              value={productEmail}
              onChange={(e) => setProductEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-grey-50 rounded-input text-sm text-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-800 mb-1.5">{t.metrics.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 border border-grey-50 rounded-input text-sm text-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-grey-100 hover:text-grey-300 transition-colors"
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

          {isAdvocates && (
            <div>
              <label className="block text-sm font-medium text-grey-800 mb-1.5">{t.metrics.subdomainLabel}</label>
              <input
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder={t.metrics.subdomainHelp}
                className="w-full px-3.5 py-2.5 border border-grey-50 rounded-input text-sm text-grey-500 placeholder:text-grey-100 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-primary-500 transition-colors"
                required
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-grey-400 border border-grey-50 hover:bg-white-100 rounded-lg transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? t.metrics.connecting : t.metrics.connect}
            </button>
          </div>

          {/* Social connect - per product config */}
          {socialButtons.length > 0 && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 pt-6">
                <div className="flex-1 h-px bg-grey-50" />
                <span className="text-xs text-grey-300">{t.authSocial.orConnectWith}</span>
                <div className="flex-1 h-px bg-grey-50" />
              </div>

              {/* Social buttons */}
              <div className="flex gap-3 pt-2">
                {socialButtons.map((provider) => (
                  <SocialAuthButton
                    key={provider}
                    provider={provider}
                    comingSoon
                    fullWidth
                  />
                ))}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
