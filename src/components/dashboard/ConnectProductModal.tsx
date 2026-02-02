import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from '../../i18n/LanguageContext';
import { dashboardAPI } from '../../services/api';
import type { UserProduct } from '../../types';

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

  const isAdvocates = userProduct.product.slug === 'advocates';

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
    } catch (err: any) {
      const msg = err.response?.data?.message;
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
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-grey-50">
          <h2 className="text-lg font-semibold text-grey-500">{t.metrics.connectTitle}</h2>
          <p className="text-sm text-grey-300 mt-1">{t.metrics.connectSubtitle} — {userProduct.product.name}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-grey-400 mb-1">{t.metrics.emailLabel}</label>
            <input
              type="text"
              value={productEmail}
              onChange={(e) => setProductEmail(e.target.value)}
              className="w-full px-3 py-2 border border-grey-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-400 mb-1">{t.metrics.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-grey-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-grey-100 hover:text-grey-300"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isAdvocates && (
            <div>
              <label className="block text-sm font-medium text-grey-400 mb-1">{t.metrics.subdomainLabel}</label>
              <input
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder={t.metrics.subdomainHelp}
                className="w-full px-3 py-2 border border-grey-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-grey-400 hover:bg-white-700 rounded-lg transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? t.metrics.connecting : t.metrics.connect}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
