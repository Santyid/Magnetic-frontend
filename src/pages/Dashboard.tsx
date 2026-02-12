import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Skeleton } from '../components/ui/Skeleton';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../i18n/LanguageContext';
import TopBanner from '../components/layout/TopBanner';
import FAQDrawer from '../components/help/FAQDrawer';
import ChatDrawer from '../components/ai/ChatDrawer';
import ConnectProductModal from '../components/dashboard/ConnectProductModal';
import type { UserProduct } from '../types';
import { Chip, IconSuccess } from '../components/ds';

// Product imagotipos (logo + text)
import socialgestImagotipo from '../assets/images/SocialGest-Imagotipo-Blue.png';
import tikketImagotipo from '../assets/images/Tikket-Imagotipo-Blue.png';
import advocatesImagotipo from '../assets/images/Advocates-Imagotipo-Blue.png';
import quanticoImagotipo from '../assets/images/Quantico-Imagotipo-Blue.png';

// Greeting icon
import waveHand from '../assets/images/wave-hand.svg';

// Product card images (extracted from design)
import cardQuantico from '../assets/images/dashboard/card-quantico.png';
import cardAdvocates from '../assets/images/dashboard/card-advocates.png';
import cardTikket from '../assets/images/dashboard/card-tikket.png';
import cardSocialgest from '../assets/images/dashboard/card-socialgest.png';

const productCatalog: Record<string, { imagotipo: string; preview: string; brandColor: string; logoWidth: number; logoHeight: number; connLogoWidth: number; connLogoHeight: number }> = {
  SocialGest: { imagotipo: socialgestImagotipo, preview: cardSocialgest, brandColor: '#F47A37', logoWidth: 137, logoHeight: 26, connLogoWidth: 106, connLogoHeight: 20 },
  Tikket: { imagotipo: tikketImagotipo, preview: cardTikket, brandColor: '#65A610', logoWidth: 100, logoHeight: 26, connLogoWidth: 106, connLogoHeight: 20 },
  Advocates: { imagotipo: advocatesImagotipo, preview: cardAdvocates, brandColor: '#E84B8A', logoWidth: 215, logoHeight: 26, connLogoWidth: 170, connLogoHeight: 22 },
  Quantico: { imagotipo: quanticoImagotipo, preview: cardQuantico, brandColor: '#9E54E2', logoWidth: 137, logoHeight: 26, connLogoWidth: 106, connLogoHeight: 20 },
};

// Fixed display order: Quantico, AdvocatesPro, Tikket, SocialGest
const PRODUCT_ORDER: Record<string, number> = {
  Quantico: 0,
  Advocates: 1,
  Tikket: 2,
  SocialGest: 3,
};

// Background: two radial gradients — left peach, right purple, white center
const backgroundStyle: React.CSSProperties = {
  background: [
    'radial-gradient(ellipse 50% 80% at 0% 50%, #FCD6C1, transparent)',
    'radial-gradient(ellipse 50% 80% at 100% 50%, #E1CAF6, transparent)',
    '#FFFFFF',
  ].join(', '),
};

export default function Dashboard() {
  const t = useTranslation();
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [connectProduct, setConnectProduct] = useState<UserProduct | null>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getMyProducts();
      setProducts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, userProduct: UserProduct) => {
    e.stopPropagation();
    const isConnected = userProduct.productEmail && userProduct.enableMetrics;
    if (isConnected) {
      navigate(`/dashboard/metrics/${userProduct.product.slug}`);
    } else {
      setConnectProduct(userProduct);
    }
  };

  const getDescription = (productName: string): string => {
    const key = `${productName.toLowerCase()}Description` as keyof typeof t.dashboardExtra;
    return (t.dashboardExtra[key] as string) || '';
  };

  const getDescriptionLong = (productName: string): string => {
    const key = `${productName.toLowerCase()}DescriptionLong` as keyof typeof t.dashboardExtra;
    return (t.dashboardExtra[key] as string) || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-20 bg-white border-b border-[#ECECEC]" />
        <main className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="bg-white rounded-[24px] p-14">
            <div className="grid grid-cols-2 gap-x-20 gap-y-[60px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-28 mb-5" />
                  <Skeleton className="h-[178px] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4 mt-5" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <TopBanner
        onAIClick={() => setShowAI((prev) => !prev)}
        onHelpClick={() => setShowFAQ(true)}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
            {/* Greeting Section */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#F5F7FA] rounded-full flex items-center justify-center flex-shrink-0">
                <img src={waveHand} alt="wave" className="w-6 h-6" />
              </div>
              <h1 className="text-[28px] font-bold text-grey-900">
                {t.dashboardExtra.welcome}, {user?.firstName}
              </h1>
            </div>

            {/* Products Container */}
            {products.length > 0 && (
              <div className="rounded-[20px] p-6" style={backgroundStyle}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[...products].sort((a, b) => (PRODUCT_ORDER[a.product.name] ?? 99) - (PRODUCT_ORDER[b.product.name] ?? 99)).map((userProduct) => {
                    const catalog = productCatalog[userProduct.product.name];
                    const isConnected = userProduct.productEmail && userProduct.enableMetrics;

                    return (
                      <div
                        key={userProduct.id}
                        className="group relative bg-white rounded-[16px] overflow-hidden shadow-[2px_5px_27px_0px_rgba(0,0,0,0.05)] cursor-pointer h-[318px]"
                        onClick={() => {
                          if (isConnected) {
                            navigate(`/dashboard/metrics/${userProduct.product.slug}`);
                          } else {
                            setConnectProduct(userProduct);
                          }
                        }}
                      >
                        {/* Shared image layer — shrinks inward to left half */}
                        <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:top-3 group-hover:left-3 group-hover:bottom-3 group-hover:right-1/2 group-hover:rounded-[16px]">
                          <img
                            src={catalog?.preview}
                            alt={userProduct.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* ── DEFAULT: Logo + tagline overlay on top of image ── */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 transition-opacity duration-200 ease-out group-hover:opacity-0 group-hover:pointer-events-none">
                          {/* Logo + Connected badge */}
                          <div className="flex items-center justify-between">
                            <img
                              src={catalog?.imagotipo}
                              alt={userProduct.product.name}
                              style={{ width: catalog?.connLogoWidth ?? 106, height: catalog?.connLogoHeight ?? 20 }}
                            />
                            {isConnected && (
                              <Chip variant="success" size="md" leftIcon={<IconSuccess size="sm" />}>
                                {t.metrics.connected}
                              </Chip>
                            )}
                          </div>

                          {/* Spacer to push tagline to bottom */}
                          <div className="flex-1" />

                          {/* Tagline */}
                          <p className="text-[20px] font-semibold text-grey-800 leading-[normal] bg-white pt-5">
                            {getDescription(userProduct.product.name)}
                          </p>
                        </div>

                        {/* White overlay to cover image in default state (behind logo/tagline) */}
                        <div className="absolute inset-0 bg-white transition-opacity duration-200 ease-out group-hover:opacity-0" style={{ clipPath: 'inset(0 0 0 0)', top: 0, left: 0, right: 0, bottom: 0 }}>
                          <div className="p-6 flex flex-col gap-6 h-full">
                            <div className="flex items-center justify-between flex-shrink-0">
                              <img
                                src={catalog?.imagotipo}
                                alt={userProduct.product.name}
                                style={{ width: catalog?.connLogoWidth ?? 106, height: catalog?.connLogoHeight ?? 20 }}
                              />
                              {isConnected && (
                                <Chip variant="success" size="md" leftIcon={<IconSuccess size="sm" />}>
                                  {t.metrics.connected}
                                </Chip>
                              )}
                            </div>
                            <div className="flex-1 rounded-[16px] overflow-hidden min-h-0">
                              <img
                                src={catalog?.preview}
                                alt={userProduct.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-[20px] font-semibold text-grey-800 leading-[normal] flex-shrink-0">
                              {getDescription(userProduct.product.name)}
                            </p>
                          </div>
                        </div>

                        {/* ── HOVER: Right panel content ── */}
                        <div className="absolute top-0 right-0 bottom-0 w-1/2 p-6 flex flex-col justify-between z-10 opacity-0 translate-x-6 transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto">
                          <img
                            src={catalog?.imagotipo}
                            alt={userProduct.product.name}
                            className="self-start"
                            style={{ width: catalog?.logoWidth ?? 137, height: catalog?.logoHeight ?? 26 }}
                          />

                          <p className="text-[16px] font-normal text-grey-800 leading-[150%]">
                            {getDescriptionLong(userProduct.product.name)}
                          </p>

                          <button
                            onClick={(e) => handleButtonClick(e, userProduct)}
                            className="w-full h-10 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold text-[15px] transition-colors cursor-pointer"
                          >
                            {isConnected ? t.metrics.enter : t.metrics.connect}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state */}
            {products.length === 0 && !loading && (
              <div className="bg-white rounded-[24px] px-14 py-20 text-center">
                <div className="w-16 h-16 bg-[#F5F7FA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-grey-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-grey-500 mb-2">{t.dashboard.noProducts}</h3>
                <p className="text-sm text-grey-300 max-w-md mx-auto">{t.dashboardExtra.contactAdmin}</p>
              </div>
            )}
      </main>

      {showAI && <ChatDrawer onClose={() => setShowAI(false)} />}
      {showFAQ && <FAQDrawer onClose={() => setShowFAQ(false)} />}
      {connectProduct && (
        <ConnectProductModal
          userProduct={connectProduct}
          onClose={() => setConnectProduct(null)}
          onSuccess={loadProducts}
        />
      )}
    </div>
  );
}
