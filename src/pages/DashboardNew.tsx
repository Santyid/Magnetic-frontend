import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { detectLandingLanguage } from '../i18n/landingTranslations';
import ChatDrawer from '../components/ai/ChatDrawer';
import FAQDrawer from '../components/help/FAQDrawer';
import ConnectProductModal from '../components/dashboard/ConnectProductModal';
import type { UserProduct } from '../types';

// Import animations CSS
import '../styles/animations.css';

// Import logo
import magneticLogo from '../assets/images/Isologo-White.png';

// Product imagotipos
import socialgestImagotipo from '../assets/images/SocialGest-Imagotipo-Blue.png';
import tikketImagotipo from '../assets/images/Tikket-Imagotipo-Blue.png';
import advocatesImagotipo from '../assets/images/Advocates-Imagotipo-Blue.png';
import quanticoImagotipo from '../assets/images/Quantico-Imagotipo-Blue.png';

type LandingLanguage = 'es' | 'en' | 'pt';

export default function DashboardNew() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [language, setLanguage] = useState<LandingLanguage>(() => detectLandingLanguage());
  const [activeTab, setActiveTab] = useState('dashboard');

  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [connectProduct, setConnectProduct] = useState<UserProduct | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Sync language with localStorage
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

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getMyProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (slug: string) => {
    try {
      const { redirectUrl } = await productsAPI.getAccessToken(slug);
      window.open(redirectUrl, '_blank');
    } catch (error) {
      console.error('Error generating SSO token:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const allProducts = [
    {
      name: 'SocialGest',
      backendName: 'SocialGest',
      imagotipo: socialgestImagotipo,
      url: 'https://socialgest.net/es',
      description: language === 'es' ? 'Gestión integral de redes sociales' : language === 'en' ? 'Comprehensive social media management' : 'Gestão integral de redes sociais',
      preview: 'https://files-landing.socialgest.net/images/sgheadernew.webp',
      gradient: 'from-[#0058E7] to-[#4d94ff]'
    },
    {
      name: 'Tikket',
      backendName: 'Tikket',
      imagotipo: tikketImagotipo,
      url: 'https://www.tikket.net/es',
      description: language === 'es' ? 'Sistema de tickets y soporte' : language === 'en' ? 'Ticket and support system' : 'Sistema de tickets e suporte',
      preview: 'https://files-landing.tikket.net/images/hometikket/tikketimageinbox.png',
      gradient: 'from-[#3ACE76] to-[#6ee7a0]'
    },
    {
      name: 'AdvocatesPro',
      backendName: 'Advocates',
      imagotipo: advocatesImagotipo,
      url: 'https://magneticsuite.com/advocatespro',
      description: language === 'es' ? 'Plataforma de employee advocacy' : language === 'en' ? 'Employee advocacy platform' : 'Plataforma de employee advocacy',
      preview: 'https://magneticsuite.com/hubfs/Comp%201-1.gif',
      gradient: 'from-[#ae4a79] to-[#d06a94]'
    },
    {
      name: 'Quantico',
      backendName: 'Quantico',
      imagotipo: quanticoImagotipo,
      url: 'https://quantico.ai/',
      description: language === 'es' ? 'Analytics y métricas avanzadas' : language === 'en' ? 'Advanced analytics and metrics' : 'Análises e métricas avançadas',
      preview: 'https://quantico.ai/wp-content/uploads/2020/09/RRSS.gif',
      gradient: 'from-[#FF962C] to-[#ffb366]'
    },
  ];

  const userProductNames = products.map((p) => p.product.name);
  const missingProducts = allProducts.filter((p) => !userProductNames.includes(p.backendName));
  const connectedProducts = products.filter((p) => p.productEmail && p.enableMetrics);

  const languages: { code: LandingLanguage; flag: string; name: string }[] = [
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
  ];

  // Translations
  const t = {
    welcome: language === 'es' ? 'Bienvenido' : language === 'en' ? 'Welcome' : 'Bem-vindo',
    subtitle: language === 'es' ? 'Gestiona todos tus productos desde un solo lugar' : language === 'en' ? 'Manage all your products from one place' : 'Gerencie todos os seus produtos em um só lugar',
    myProducts: language === 'es' ? 'Mis Productos' : language === 'en' ? 'My Products' : 'Meus Produtos',
    explore: language === 'es' ? 'Explorar Más Productos' : language === 'en' ? 'Explore More Products' : 'Explorar Mais Produtos',
    access: language === 'es' ? 'Acceder' : language === 'en' ? 'Access' : 'Acessar',
    connect: language === 'es' ? 'Conectar' : language === 'en' ? 'Connect' : 'Conectar',
    connected: language === 'es' ? 'Conectado' : language === 'en' ? 'Connected' : 'Conectado',
    notConnected: language === 'es' ? 'No conectado' : language === 'en' ? 'Not connected' : 'Não conectado',
    visitSite: language === 'es' ? 'Visitar sitio' : language === 'en' ? 'Visit site' : 'Visitar site',
    loading: language === 'es' ? 'Cargando...' : language === 'en' ? 'Loading...' : 'Carregando...',
    profile: language === 'es' ? 'Mi Perfil' : language === 'en' ? 'My Profile' : 'Meu Perfil',
    security: language === 'es' ? 'Seguridad' : language === 'en' ? 'Security' : 'Segurança',
    logout: language === 'es' ? 'Cerrar Sesión' : language === 'en' ? 'Logout' : 'Sair',
    dashboard: 'Dashboard',
    reports: language === 'es' ? 'Reportes' : language === 'en' ? 'Reports' : 'Relatórios',
    releaseNotes: 'Release Notes',
    comingSoon: language === 'es' ? 'Próximamente' : language === 'en' ? 'Coming Soon' : 'Em breve',
    totalProducts: language === 'es' ? 'Total Productos' : language === 'en' ? 'Total Products' : 'Total Produtos',
    connectedProducts: language === 'es' ? 'Conectados' : language === 'en' ? 'Connected' : 'Conectados',
    pendingConnect: language === 'es' ? 'Por conectar' : language === 'en' ? 'Pending' : 'Pendentes',
    quickActions: language === 'es' ? 'Acciones Rápidas' : language === 'en' ? 'Quick Actions' : 'Ações Rápidas',
    askAI: language === 'es' ? 'Preguntar a la IA' : language === 'en' ? 'Ask AI' : 'Perguntar à IA',
    viewFAQ: language === 'es' ? 'Ver FAQ' : language === 'en' ? 'View FAQ' : 'Ver FAQ',
    changePassword: language === 'es' ? 'Cambiar contraseña' : language === 'en' ? 'Change password' : 'Alterar senha',
    recentActivity: language === 'es' ? 'Actividad Reciente' : language === 'en' ? 'Recent Activity' : 'Atividade Recente',
    noActivity: language === 'es' ? 'No hay actividad reciente' : language === 'en' ? 'No recent activity' : 'Sem atividade recente',
    lastAccess: language === 'es' ? 'Último acceso' : language === 'en' ? 'Last access' : 'Último acesso',
    tipConnect: language === 'es'
      ? 'Conecta tus productos para ver métricas y acceder más rápido.'
      : language === 'en'
        ? 'Connect your products to see metrics and access faster.'
        : 'Conecte seus produtos para ver métricas e acessar mais rápido.',
    needHelp: language === 'es' ? '¿Necesitas ayuda?' : language === 'en' ? 'Need help?' : 'Precisa de ajuda?',
  };

  // Navigation tabs
  const tabs = [
    { id: 'dashboard', label: t.dashboard, comingSoon: false },
    { id: 'reports', label: t.reports, comingSoon: true },
    { id: 'release-notes', label: t.releaseNotes, comingSoon: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0058E7]/20 border-t-[#0058E7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] dark-scrollbar">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="orb orb-primary animate-float w-[600px] h-[600px] -top-40 -left-40 opacity-20"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="orb orb-secondary animate-float-slow w-[500px] h-[500px] -bottom-40 -right-40 opacity-15"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="orb orb-primary animate-float w-[200px] h-[200px] top-1/3 right-1/4 opacity-10"
          style={{ animationDelay: '-2s' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={magneticLogo} alt="Magnetic" className="h-8 md:h-10" />
            </Link>

            {/* Center: Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => !tab.comingSoon && setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    tab.comingSoon
                      ? 'text-white/30 cursor-not-allowed'
                      : activeTab === tab.id
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  {tab.comingSoon && (
                    <span className="text-[10px] font-medium text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                      {t.comingSoon}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* AI Button - More Prominent */}
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#0058E7] to-[#ae4a79] hover:opacity-90 text-white transition-all"
                title="AI Assistant"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">AI</span>
              </button>

              {/* FAQ Button */}
              <button
                onClick={() => setShowFAQ(true)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
                title="FAQ"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/70 hover:text-white transition-all border border-white/10"
                >
                  <span>{languages.find(l => l.code === language)?.flag}</span>
                  <span className="hidden sm:inline">{language.toUpperCase()}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#1a1a1f] rounded-xl border border-white/10 shadow-xl overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { handleLanguageChange(lang.code); setShowLangMenu(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0058E7] to-[#ae4a79] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block pr-1">
                    {user?.firstName}
                  </span>
                  <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1f] rounded-xl border border-white/10 shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-white/50 text-sm truncate">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t.profile}
                      </button>
                      <button
                        onClick={() => { navigate('/change-password'); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        {t.security}
                      </button>
                    </div>
                    <div className="border-t border-white/10 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EE4A79] hover:bg-[#EE4A79]/10 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6 animate-hero-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t.welcome}, <span className="gradient-text">{user?.firstName}</span>
          </h1>
        </div>

        {/* Tip Banner - Only show if there are products to connect */}
        {products.length > connectedProducts.length && (
          <div className="mb-6 p-4 bg-gradient-to-r from-[#0058E7]/10 to-[#ae4a79]/10 border border-[#0058E7]/20 rounded-xl animate-reveal-up visible">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0058E7]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#0058E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm">
                  {t.tipConnect}
                </p>
              </div>
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#0058E7] hover:bg-[#0058E7]/10 rounded-lg transition-colors"
              >
                {t.needHelp}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* My Products Section */}
        {products.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0058E7] to-[#4d94ff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                {t.myProducts}
              </h2>
              <span className="px-3 py-1 bg-white/5 text-white/70 rounded-full text-sm font-medium border border-white/10">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {products.map((userProduct, index) => {
                const productInfo = allProducts.find((p) => p.backendName === userProduct.product.name);
                const isConnected = userProduct.productEmail && userProduct.enableMetrics;

                return (
                  <div
                    key={userProduct.id}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 animate-reveal-up visible`}
                    style={{ animationDelay: `${(index + 5) * 0.1}s` }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={productInfo?.preview}
                        alt={userProduct.product.name}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative p-5">
                      {/* Connection Status */}
                      <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        isConnected
                          ? 'bg-[#3ACE76]/20 text-[#3ACE76]'
                          : 'bg-white/10 text-white/50'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#3ACE76] animate-pulse' : 'bg-white/30'}`} />
                        {isConnected ? t.connected : t.notConnected}
                      </div>

                      {/* Product Info */}
                      <div className="pt-12">
                        <img
                          src={productInfo?.imagotipo}
                          alt={userProduct.product.name}
                          className="h-7 mb-3 filter brightness-0 invert"
                        />
                        <p className="text-white/60 text-sm mb-5 line-clamp-2">
                          {productInfo?.description}
                        </p>

                        {userProduct.customDomain && (
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#ae4a79]/20 text-[#ae4a79] text-xs font-medium rounded-full mb-4">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {userProduct.customDomain}
                          </div>
                        )}

                        {/* Actions */}
                        {isConnected ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/dashboard/metrics/${userProduct.product.slug}`)}
                              className="flex-1 flex items-center justify-center gap-2 bg-[#0058E7] hover:bg-[#0045B4] text-white font-medium py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(0,88,231,0.3)]"
                            >
                              {t.access}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleProductClick(userProduct.product.slug)}
                              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
                              title={language === 'es' ? 'Abrir producto' : language === 'en' ? 'Open product' : 'Abrir produto'}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConnectProduct(userProduct)}
                            className="w-full flex items-center justify-center gap-2 border-2 border-[#0058E7] text-[#0058E7] hover:bg-[#0058E7] hover:text-white font-medium py-2.5 rounded-xl transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {t.connect}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Explore More Products */}
        {missingProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ae4a79] to-[#d06a94] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                {t.explore}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {missingProducts.map((product, index) => (
                <a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-xl border border-white/10 hover:border-white/20 p-4 transition-all duration-300 animate-reveal-scale visible`}
                  style={{ animationDelay: `${(products.length + index + 5) * 0.1}s` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative">
                    <img
                      src={product.imagotipo}
                      alt={product.name}
                      className="h-5 mb-3 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <p className="text-white/40 text-sm mb-3 line-clamp-2 group-hover:text-white/60 transition-colors">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#0058E7] text-sm font-medium group-hover:gap-2 transition-all">
                      {t.visitSite}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Drawers */}
      {showChat && <ChatDrawer onClose={() => setShowChat(false)} />}
      {showFAQ && <FAQDrawer onClose={() => setShowFAQ(false)} />}
      {connectProduct && (
        <ConnectProductModal
          userProduct={connectProduct}
          onClose={() => setConnectProduct(null)}
          onSuccess={loadProducts}
        />
      )}

      {/* Click outside to close menus */}
      {(showUserMenu || showLangMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowUserMenu(false); setShowLangMenu(false); }}
        />
      )}
    </div>
  );
}
