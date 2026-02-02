import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
import { useAuthStore } from '../store/authStore';
import { useTranslation, useLanguage } from '../i18n/LanguageContext';
import TopBanner from '../components/layout/TopBanner';
import ChatDrawer from '../components/ai/ChatDrawer';
import FAQDrawer from '../components/help/FAQDrawer';
import ConnectProductModal from '../components/dashboard/ConnectProductModal';
import type { UserProduct } from '../types';

// Product logos
import socialgestLogo from '../assets/images/SocialGest-Isotipo-Blue.png';
import tikketLogo from '../assets/images/Tikket-Isotipo-Blue.png';
import advocatesLogo from '../assets/images/Advocates-Isotipo-Blue.png';
import quanticoLogo from '../assets/images/Quantico-Isotipo-Blue.png';

// Product imagotipos (logo + text)
import socialgestImagotipo from '../assets/images/SocialGest-Imagotipo-Blue.png';
import tikketImagotipo from '../assets/images/Tikket-Imagotipo-Blue.png';
import advocatesImagotipo from '../assets/images/Advocates-Imagotipo-Blue.png';
import quanticoImagotipo from '../assets/images/Quantico-Imagotipo-Blue.png';

const productLogos: Record<string, string> = {
  SocialGest: socialgestLogo,
  Tikket: tikketLogo,
  Advocates: advocatesLogo,
  Quantico: quanticoLogo,
};

interface RecentActivity {
  id: string;
  productName: string;
  timestamp: Date;
  action: string;
}

export default function Dashboard() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
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

      // Simular actividad reciente (en producción vendría del backend)
      const mockActivity: RecentActivity[] = data.slice(0, 3).map((p, index) => ({
        id: `activity-${index}`,
        productName: p.product.name,
        timestamp: new Date(Date.now() - Math.random() * 86400000), // Último día
        action: t.dashboardExtra.productAccess
      }));
      setRecentActivity(mockActivity);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (slug: string) => {
    try {
      const { redirectUrl } = await productsAPI.getAccessToken(slug);
      window.open(redirectUrl, '_blank');
    } catch (error) {
      console.error('Error generando token SSO:', error);
      alert('Error al acceder al producto');
    }
  };

  const getProductLogo = (name: string) => productLogos[name];

  const allProducts = [
    { name: 'SocialGest', backendName: 'SocialGest', imagotipo: socialgestImagotipo, url: 'https://socialgest.net/es', description: t.dashboardExtra.socialgestDescription, preview: 'https://files-landing.socialgest.net/images/sgheadernew.webp' },
    { name: 'Tikket', backendName: 'Tikket', imagotipo: tikketImagotipo, url: 'https://www.tikket.net/es', description: t.dashboardExtra.tikketDescription, preview: 'https://files-landing.tikket.net/images/hometikket/tikketimageinbox.png' },
    { name: 'AdvocatesPro', backendName: 'Advocates', imagotipo: advocatesImagotipo, url: 'https://magneticsuite.com/advocatespro', description: t.dashboardExtra.advocatesDescription, preview: 'https://magneticsuite.com/hubfs/Comp%201-1.gif' },
    { name: 'Quantico', backendName: 'Quantico', imagotipo: quanticoImagotipo, url: 'https://quantico.ai/', description: t.dashboardExtra.quanticoDescription, preview: 'https://quantico.ai/wp-content/uploads/2020/09/RRSS.gif' },
  ];

  const userProductNames = products.map((p) => p.product.name);
  const missingProducts = allProducts.filter((p) => !userProductNames.includes(p.backendName));

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-16 bg-white-700 animate-pulse" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-grey-50">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-12" />
              </div>
            ))}
          </div>
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <TopBanner
        products={products}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProductClick={handleProductClick}
        onAIClick={() => setShowChat(true)}
        onHelpClick={() => setShowFAQ(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-grey-500 mb-1">
            {t.dashboardExtra.welcome}, {user?.firstName}
          </h2>
          <p className="text-grey-300">{t.dashboard.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-grey-50 hover:border-grey-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-grey-300 mb-1">{t.dashboardExtra.productsAvailable}</p>
                <p className="text-3xl font-bold text-grey-500">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-grey-50 hover:border-grey-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-grey-300 mb-1">{t.dashboardExtra.accessesToday}</p>
                <p className="text-3xl font-bold text-grey-500">{recentActivity.length}</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-grey-50 hover:border-grey-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-grey-300 mb-1">{t.dashboardExtra.accountActive}</p>
                <p className="text-2xl font-bold text-success">{t.dashboardExtra.verified}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* My Products */}
            {products.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-grey-500">{t.dashboardExtra.myProducts}</h3>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                    {products.length} {products.length === 1 ? t.dashboardExtra.product : t.dashboardExtra.products}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((userProduct) => {
                    const productInfo = allProducts.find((p) => p.backendName === userProduct.product.name);
                    const isConnected = userProduct.productEmail && userProduct.enableMetrics;
                    return (
                      <div
                        key={userProduct.id}
                        className="group relative bg-white rounded-lg border border-grey-50 hover:border-primary-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                      >
                        <div className="h-36 bg-white-700 overflow-hidden relative">
                          <img
                            src={productInfo?.preview}
                            alt={userProduct.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Connection status badge */}
                          <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            isConnected
                              ? 'bg-success/20 text-success'
                              : 'bg-white-700 text-grey-300'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-grey-100'}`} />
                            {isConnected ? t.metrics.connected : t.metrics.disconnected}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={productInfo?.imagotipo || getProductLogo(userProduct.product.name)}
                              alt={userProduct.product.name}
                              className="h-6"
                            />
                          </div>
                          <p className="text-sm text-grey-300 mb-4 line-clamp-2 min-h-[40px]">
                            {productInfo?.description || userProduct.product.description}
                          </p>

                          {userProduct.customDomain && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-50 text-secondary-500 text-xs font-medium rounded-full mb-4">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              {userProduct.customDomain}
                            </div>
                          )}

                          {isConnected ? (
                            <div className="space-y-2">
                              <button
                                onClick={() => navigate(`/dashboard/metrics/${userProduct.product.slug}`)}
                                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                              >
                                {t.dashboard.accessProduct}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleProductClick(userProduct.product.slug)}
                                className="w-full text-center text-xs text-grey-100 hover:text-primary-600 transition-colors"
                              >
                                {t.metrics.openProduct}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConnectProduct(userProduct)}
                              className="w-full flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2.5 rounded-lg transition-colors"
                            >
                              {t.metrics.connect}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Add Products - shows missing products or all if user has none */}
            {missingProducts.length > 0 && (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-grey-500">{t.dashboardExtra.addProducts}</h3>
                  <p className="text-grey-300 mt-1">{t.dashboardExtra.addProductsDescription}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {missingProducts.map((product) => (
                    <a
                      key={product.name}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-lg border border-grey-50 hover:border-primary-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className="h-36 bg-white-700 overflow-hidden">
                        <img
                          src={product.preview}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={product.imagotipo}
                            alt={product.name}
                            className="h-6"
                          />
                        </div>
                        <p className="text-sm text-grey-300 mb-4">
                          {product.description}
                        </p>
                        <span className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                          {t.dashboardExtra.visitWebsite}
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-grey-50">
              <h3 className="text-lg font-bold text-grey-500 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.dashboardExtra.recentActivity}
              </h3>

              {recentActivity.length === 0 ? (
                <p className="text-sm text-grey-300 text-center py-4">{t.dashboardExtra.noRecentActivity}</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-white-700 rounded-lg hover:bg-white-700 transition-colors">
                      <img
                        src={getProductLogo(activity.productName)}
                        alt={activity.productName}
                        className="w-8 h-8 rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-grey-500 truncate">{activity.productName}</p>
                        <p className="text-xs text-grey-300">{activity.action}</p>
                        <p className="text-xs text-grey-100 mt-1">
                          {new Date(activity.timestamp).toLocaleString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-grey-50">
              <h3 className="text-lg font-bold text-grey-500 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t.dashboardExtra.quickActions}
              </h3>

              <div className="space-y-2">
                <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-white-700 transition-colors group">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-500">{t.dashboardExtra.myProfile}</p>
                    <p className="text-xs text-grey-300">{t.dashboardExtra.viewPersonalInfo}</p>
                  </div>
                </button>

                <button onClick={() => navigate('/change-password')} className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-white-700 transition-colors group">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center group-hover:bg-success/30 transition-colors">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-500">{t.dashboardExtra.changePassword}</p>
                    <p className="text-xs text-grey-300">{t.dashboardExtra.updateSecurity}</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-white-700 transition-colors group">
                  <div className="w-8 h-8 bg-secondary-50 rounded-lg flex items-center justify-center group-hover:bg-secondary-100 transition-colors">
                    <svg className="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-500">{t.dashboardExtra.support}</p>
                    <p className="text-xs text-grey-300">{t.dashboardExtra.helpAndAssistance}</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-primary-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">{t.dashboardExtra.needHelp}</h3>
              <p className="text-sm text-primary-100 mb-4">
                {t.dashboardExtra.needHelpDescription}
              </p>
              <button className="w-full bg-white text-primary-600 font-semibold py-2 rounded-lg hover:bg-primary-50 transition-colors">
                {t.dashboardExtra.contactSupport}
              </button>
            </div>
          </div>
        </div>
      </main>
      {showChat && <ChatDrawer onClose={() => setShowChat(false)} />}
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
