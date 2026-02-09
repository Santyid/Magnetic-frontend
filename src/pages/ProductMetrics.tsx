import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from '../i18n/LanguageContext';
import { productsAPI, dashboardAPI } from '../services/api';
import { SkeletonStatCard } from '../components/ui/Skeleton';
import TopBanner from '../components/layout/TopBanner';
import ChatDrawer from '../components/ai/ChatDrawer';
import FAQDrawer from '../components/help/FAQDrawer';
import ConnectProductModal from '../components/dashboard/ConnectProductModal';
import type { UserProduct, MetricsItem } from '../types';

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toLocaleString();
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$ ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$ ${(value / 1_000).toFixed(2)}K`;
  return `$ ${value.toLocaleString()}`;
}

function pct(a: number, b: number): number {
  return b > 0 ? Math.round((a / b) * 100) : 0;
}

// ── Hero Card (top KPIs with gradient) ──────────────────────────────────────
function HeroCard({ icon, value, label, gradient }: { icon: React.ReactNode; value: string; label: string; gradient: string }) {
  return (
    <div className={`rounded-xl p-6 text-white shadow-md ${gradient}`}>
      <div className="flex items-center gap-3 mb-3 opacity-90">{icon}<span className="text-sm font-medium">{label}</span></div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

// ── Stat Card (individual metric) ───────────────────────────────────────────
function StatCard({ icon, value, label, accent, sub }: { icon: React.ReactNode; value: string; label: string; accent: string; sub?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-grey-50 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-grey-300 mb-1">{label}</p>
          <p className="text-2xl font-bold text-grey-500">{value}</p>
          {sub && <div className="mt-2">{sub}</div>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent}`}>{icon}</div>
      </div>
    </div>
  );
}

// ── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const p = pct(value, max);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-grey-300 mb-1">
        <span>{label}</span>
        <span className="font-medium text-grey-400">{p}%</span>
      </div>
      <div className="h-2 bg-white-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.min(p, 100)}%` }} />
      </div>
    </div>
  );
}

// ── Donut Chart (CSS only) ──────────────────────────────────────────────────
function DonutChart({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  let cumulative = 0;
  const gradientParts: string[] = [];
  segments.forEach((seg) => {
    const start = (cumulative / total) * 360;
    cumulative += seg.value;
    const end = (cumulative / total) * 360;
    gradientParts.push(`${seg.color} ${start}deg ${end}deg`);
  });

  return (
    <div className="flex items-center gap-6">
      <div
        className="rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradientParts.join(', ')})`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - 14px), #fff calc(100% - 13px))`,
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 14px), #fff calc(100% - 13px))`,
        }}
      />
      <div className="flex flex-col gap-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-grey-300">{seg.label}</span>
            <span className="font-semibold text-grey-500">{formatNumber(seg.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reach Comparison Bar ────────────────────────────────────────────────────
function ReachBar({ potential, estimated, potentialLabel, estimatedLabel }: { potential: number; estimated: number; potentialLabel: string; estimatedLabel: string }) {
  const ratio = pct(estimated, potential);
  return (
    <div className="bg-white rounded-xl border border-grey-50 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-grey-400">
          <svg className="w-4 h-4 inline-block mr-1.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>
          {potentialLabel} vs {estimatedLabel}
        </h3>
        <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{ratio}%</span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-grey-300 mb-1"><span>{potentialLabel}</span><span className="font-semibold text-grey-500">{formatNumber(potential)}</span></div>
          <div className="h-3 bg-violet-100 rounded-full" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-grey-300 mb-1"><span>{estimatedLabel}</span><span className="font-semibold text-grey-500">{formatNumber(estimated)}</span></div>
          <div className="h-3 bg-white-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(ratio, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SVG Icons ───────────────────────────────────────────────────────────────
const icons = {
  dollar: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  heart: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
  doc: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  flag: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
  chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  fire: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
  box: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  news: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
  check: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  group: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  person: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  pen: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
};

// ═════════════════════════════════════════════════════════════════════════════
export default function ProductMetrics() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const t = useTranslation();

  const [products, setProducts] = useState<UserProduct[]>([]);
  const [metricsItem, setMetricsItem] = useState<MetricsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [activeTab, setActiveTab] = useState(slug || 'dashboard');

  const currentProduct = products.find((p) => p.product.slug === slug);
  const isConnected = currentProduct?.productEmail && currentProduct?.enableMetrics;

  useEffect(() => { loadData(); }, [slug]);

  const loadData = async () => {
    setLoading(true);
    try {
      const prods = await productsAPI.getMyProducts();
      setProducts(prods);
      const current = prods.find((p) => p.product.slug === slug);
      if (current?.productEmail && current?.enableMetrics) {
        const response = await dashboardAPI.getMetrics();
        const item = response.metrics.find((m) => m.productSlug === slug);
        setMetricsItem(item || null);
      }
    } catch { toast.error('Error loading data'); }
    finally { setLoading(false); }
  };

  const handleSync = async () => {
    if (!currentProduct) return;
    setSyncing(true);
    try {
      const updated = await dashboardAPI.syncProduct(currentProduct.id);
      setMetricsItem(updated);
      toast.success(t.metrics.connected);
    } catch { toast.error(t.metrics.connectionError); }
    finally { setSyncing(false); }
  };

  const handleSSO = async () => {
    if (!slug) return;
    try { const { redirectUrl } = await productsAPI.getAccessToken(slug); window.open(redirectUrl, '_blank'); }
    catch { toast.error('Error accessing product'); }
  };

  // Data extraction
  const data = metricsItem?.metrics?.data || metricsItem?.metrics || {};
  const getVal = (key: string): number => {
    const v = data[key];
    if (v == null) return 0;
    return typeof v === 'string' ? parseFloat(v) : v;
  };

  // Derived values
  const totalCampaigns = getVal('totalCampaigns');
  const activeCampaigns = getVal('activeCampaigns');
  const totalContent = getVal('totalContent');
  const avgContent = totalCampaigns > 0 ? Math.round(totalContent / totalCampaigns) : 0;
  const totalChallenges = getVal('totalChallenges');
  const activeChallenges = getVal('totalActiveChallenges');
  const totalBonus = getVal('totalBonus');
  const approved = getVal('totalBonusApproved');
  const pending = getVal('totalBonusPending');
  const totalAmbassadors = getVal('totalAmbassadors');
  const participating = getVal('ambassadorsParticipating');
  const potential = getVal('totalPotentialReach');
  const estimated = getVal('totalEstimatedReach');

  const hasMetrics = !!metricsItem?.metrics;

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, j) => <SkeletonStatCard key={j} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white-700">
      <TopBanner
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); if (tab === 'dashboard') navigate('/dashboard'); }}
        onAIClick={() => setShowChat((prev) => !prev)}
        onHelpClick={() => setShowFAQ(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 text-grey-100 hover:text-grey-300 rounded-lg hover:bg-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-grey-500">
              {t.metrics.metricsTitle} — {currentProduct?.product.name || slug}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isConnected && (
              <>
                <button onClick={handleSSO} className="px-4 py-2 text-sm font-medium text-grey-400 bg-white border border-grey-50 hover:bg-white-700 rounded-lg transition-colors">{t.metrics.openProduct}</button>
                <button onClick={handleSync} disabled={syncing} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg disabled:opacity-50 transition-colors">{syncing ? t.metrics.syncing : t.metrics.syncNow}</button>
              </>
            )}
          </div>
        </div>

        {/* Not connected */}
        {!isConnected ? (
          <div className="bg-white rounded-xl border border-grey-50 p-12 text-center">
            <svg className="w-16 h-16 text-grey-100 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            <p className="text-grey-300 mb-6">{t.metrics.noMetrics}</p>
            <button onClick={() => setShowConnect(true)} className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">{t.metrics.connect}</button>
          </div>
        ) : metricsItem?.error ? (
          <div className="bg-error/10 rounded-xl border border-error/30 p-12 text-center">
            <p className="text-error mb-4">{t.metrics.connectionError}</p>
            <button onClick={() => setShowConnect(true)} className="px-6 py-2.5 text-sm font-medium text-white bg-danger-500 hover:bg-danger-600 rounded-lg transition-colors">{t.metrics.reconnect}</button>
          </div>
        ) : hasMetrics && (
          <div className="space-y-8">

            {/* ── 1. HERO KPIs ─────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <HeroCard gradient="bg-gradient-to-br from-emerald-400 to-emerald-500" icon={icons.dollar} value={formatCurrency(getVal('acumulateValuation'))} label={`${t.metrics.accumulatedValue} COP`} />
              <HeroCard gradient="bg-gradient-to-br from-rose-400 to-pink-400" icon={icons.heart} value={formatNumber(getVal('totalEngagement'))} label={t.metrics.totalInteractions} />
              <HeroCard gradient="bg-gradient-to-br from-primary-400 to-indigo-400" icon={icons.doc} value={formatNumber(totalContent)} label={t.metrics.totalContent} />
            </div>

            {/* ── 2. REACH COMPARISON ──────────────────────────────────── */}
            <ReachBar potential={potential} estimated={estimated} potentialLabel={t.metrics.potentialReach} estimatedLabel={t.metrics.estimatedReach} />

            {/* ── 3. CAMPAIGNS ─────────────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-grey-500 mb-3">{t.metrics.campaigns}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard accent="bg-primary-50 text-primary-600" icon={icons.flag} value={formatNumber(activeCampaigns)} label={t.metrics.activeCampaigns}
                  sub={<ProgressBar value={activeCampaigns} max={totalCampaigns} color="bg-primary-500" label={`${activeCampaigns} / ${totalCampaigns}`} />}
                />
                <StatCard accent="bg-white-700 text-grey-300" icon={icons.flag} value={formatNumber(totalCampaigns)} label={t.metrics.createdCampaigns} />
                <StatCard accent="bg-indigo-50 text-indigo-600" icon={icons.chart} value={formatNumber(avgContent)} label={t.metrics.avgContentPerCampaign} />
              </div>
            </div>

            {/* ── 4. CHALLENGES ────────────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-grey-500 mb-3">{t.metrics.challenges}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard accent="bg-orange-50 text-orange-600" icon={icons.fire} value={formatNumber(activeChallenges)} label={t.metrics.activeChallenges}
                  sub={<ProgressBar value={activeChallenges} max={totalChallenges} color="bg-orange-500" label={`${activeChallenges} / ${totalChallenges}`} />}
                />
                <StatCard accent="bg-white-700 text-grey-300" icon={icons.fire} value={formatNumber(totalChallenges)} label={t.metrics.createdChallenges} />
                <StatCard accent="bg-teal-50 text-teal-600" icon={icons.box} value={formatNumber(getVal('totalContentsChallenges'))} label={t.metrics.contentForChallenges} />
              </div>
            </div>

            {/* ── 5. CONTENTS  (cards + donut) ─────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-grey-500 mb-3">{t.metrics.contents}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* 3 stat cards */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard accent="bg-purple-50 text-secondary-500" icon={icons.news} value={formatNumber(totalBonus)} label={t.metrics.totalContents} />
                  <StatCard accent="bg-green-50 text-success" icon={icons.check} value={formatNumber(approved)} label={t.metrics.approvedContents}
                    sub={<ProgressBar value={approved} max={totalBonus} color="bg-success" label={`${pct(approved, totalBonus)}% ${t.metrics.approvedContents.toLowerCase()}`} />}
                  />
                  <StatCard accent="bg-yellow-50 text-yellow-600" icon={icons.clock} value={formatNumber(pending)} label={t.metrics.pendingContents} />
                </div>
                {/* Donut chart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-grey-50 shadow-sm p-6 flex items-center justify-center">
                  <DonutChart segments={[
                    { value: approved, color: '#22c55e', label: t.metrics.approvedContents },
                    { value: pending, color: '#eab308', label: t.metrics.pendingContents },
                  ]} />
                </div>
              </div>
            </div>

            {/* ── 6. GROUPS & AMBASSADORS ──────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-grey-500 mb-3">{t.metrics.groups}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard accent="bg-cyan-50 text-cyan-600" icon={icons.group} value={formatNumber(getVal('totalGroups'))} label={t.metrics.totalGroups} />
                <StatCard accent="bg-sky-50 text-sky-600" icon={icons.person} value={formatNumber(totalAmbassadors)} label={t.metrics.totalAmbassadors} />
                <StatCard accent="bg-fuchsia-50 text-fuchsia-600" icon={icons.pen} value={formatNumber(participating)} label={t.metrics.ambassadorsCreating}
                  sub={<ProgressBar value={participating} max={totalAmbassadors} color="bg-fuchsia-500" label={`${pct(participating, totalAmbassadors)}% activos`} />}
                />
              </div>
            </div>

          </div>
        )}
      </main>

      {showChat && <ChatDrawer onClose={() => setShowChat(false)} />}
      {showFAQ && <FAQDrawer onClose={() => setShowFAQ(false)} />}
      {showConnect && currentProduct && (
        <ConnectProductModal userProduct={currentProduct} onClose={() => setShowConnect(false)} onSuccess={loadData} />
      )}
    </div>
  );
}
