import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { demoProposalsAPI } from '../services/api';
import type { ProposalDetail } from '../types';
import ProjectionCard from '../components/proposals/ProjectionCard';
import AdvocacyScoreCard from '../components/proposals/AdvocacyScoreCard';
import BlurOverlay from '../components/proposals/BlurOverlay';
import { Skeleton } from '../components/ui/Skeleton';

const POLL_INTERVAL = 4000;
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const proxyImg = (url?: string) =>
  url ? `${API_BASE}/proposals/image-proxy?url=${encodeURIComponent(url)}` : undefined;

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function DemoProposals() {
  const navigate = useNavigate();
  const t = useTranslation();
  const td = t.demo;

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.trim()) {
      setError(td.linkedinRequired);
      return;
    }

    setError(null);
    setLoading(true);
    setProposal(null);
    setProgress(0);
    setStatus(null);

    try {
      const result = await demoProposalsAPI.create(linkedinUrl.trim());
      setStatus('pending');
      startPolling(result.id);
    } catch (err: any) {
      const code = err.response?.data?.message;
      if (code === 'DEMO_RATE_LIMIT_EXCEEDED') {
        setError(td.rateLimitError);
      } else {
        setError(td.errorGeneric);
      }
      setLoading(false);
    }
  };

  const startPolling = (id: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const statusData = await demoProposalsAPI.getStatus(id);
        setProgress(statusData.progress);
        setStatus(statusData.status);

        if (statusData.status === 'done' || statusData.status === 'failed') {
          if (pollingRef.current) clearInterval(pollingRef.current);
          pollingRef.current = null;

          if (statusData.status === 'done') {
            const data = await demoProposalsAPI.getOne(id);
            setProposal(data);
          }
          setLoading(false);
        }
      } catch {
        if (pollingRef.current) clearInterval(pollingRef.current);
        pollingRef.current = null;
        setError(td.errorGeneric);
        setLoading(false);
      }
    }, POLL_INTERVAL);
  };

  const isProcessing = status === 'pending' || status === 'processing';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span className="font-semibold text-lg">Magnetic</span>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {td.loginLink}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero + Form */}
        {!proposal && !isProcessing && (
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{td.title}</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">{td.subtitle}</p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder={td.inputPlaceholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
                >
                  {loading ? td.analyzing : td.analyzeButton}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-error">{error}</p>
              )}
            </form>
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
              <svg className="w-8 h-8 text-primary-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{td.processingTitle}</h2>
            <p className="text-gray-500 mb-6">{td.processingHint}</p>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Failed */}
        {status === 'failed' && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor" className="w-8 h-8 text-error">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{td.errorGeneric}</h2>
            <button
              onClick={() => { setStatus(null); setLoading(false); }}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              {td.analyzeButton}
            </button>
          </div>
        )}

        {/* Results */}
        {proposal && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{td.resultTitle}</h2>

            {/* Company Header */}
            {proposal.company && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-start gap-4">
                  {proposal.company.logo && (
                    <img
                      src={proxyImg(proposal.company.logo)}
                      alt={proposal.company.name || ''}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{proposal.company.name}</h3>
                    {proposal.company.industry && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                        {proposal.company.industry}
                      </span>
                    )}
                    {proposal.company.description && (
                      <p className="mt-2 text-sm text-gray-500 line-clamp-3">{proposal.company.description}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {proposal.company.employeeCount != null && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{formatNum(proposal.company.employeeCount)}</p>
                      <p className="text-xs text-gray-500">{t.proposals.detail.employees_count}</p>
                    </div>
                  )}
                  {proposal.company.followers != null && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{formatNum(proposal.company.followers)}</p>
                      <p className="text-xs text-gray-500">{t.proposals.detail.followers}</p>
                    </div>
                  )}
                  {proposal.company.headquarters && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">{proposal.company.headquarters}</p>
                      <p className="text-xs text-gray-500">{t.proposals.detail.headquarters}</p>
                    </div>
                  )}
                  {proposal.company.website && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <a href={proposal.company.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary-600 hover:underline truncate block">
                        {proposal.company.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </a>
                      <p className="text-xs text-gray-500">{t.proposals.detail.website}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LinkedIn Projection — VISIBLE */}
            {proposal.projections?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.proposals.detail.sectionProjections}</h3>
                <div className="grid gap-4">
                  {proposal.projections.map((p) => (
                    <ProjectionCard key={p.platform} projection={p} employeeCount={proposal.company?.employeeCount} />
                  ))}
                </div>
              </div>
            )}

            {/* Advocacy Score — PARTIAL */}
            {proposal.advocacyScore && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.proposals.advocacyScore.title}</h3>
                {proposal.advocacyScore.breakdown ? (
                  <AdvocacyScoreCard advocacyScore={proposal.advocacyScore} />
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50">
                        <span className="text-2xl font-bold text-primary-600">{proposal.advocacyScore.score}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.proposals.advocacyScore.outOf}</p>
                        <p className="text-sm font-medium text-gray-700">
                          {proposal.advocacyScore.score >= 70 ? t.proposals.advocacyScore.excellent
                            : proposal.advocacyScore.score >= 50 ? t.proposals.advocacyScore.good
                            : proposal.advocacyScore.score >= 30 ? t.proposals.advocacyScore.moderate
                            : t.proposals.advocacyScore.low}
                        </p>
                      </div>
                    </div>
                    <BlurOverlay locked ctaText={td.unlockText}>
                      <div className="space-y-3">
                        {['teamSize', 'employeeReach', 'multiPlatform', 'growthOpportunity', 'contentActivity'].map((cat) => (
                          <div key={cat} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{cat}</span>
                            <div className="w-32 h-2 bg-gray-200 rounded-full">
                              <div className="h-full bg-primary-400 rounded-full" style={{ width: '60%' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </BlurOverlay>
                  </div>
                )}
              </div>
            )}

            {/* Blurred sections */}
            <div className="space-y-6 mb-8">
              {/* Total ROI */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.proposals.totalROI.title}</h3>
                <BlurOverlay locked ctaText={td.unlockText}>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">$12,500</p>
                        <p className="text-xs text-gray-500">{t.proposals.totalROI.perMonth}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">850K</p>
                        <p className="text-xs text-gray-500">{t.proposals.totalROI.impressions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">125</p>
                        <p className="text-xs text-gray-500">{t.proposals.totalROI.ambassadors}</p>
                      </div>
                    </div>
                  </div>
                </BlurOverlay>
              </div>

              {/* Competitors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.proposals.competitors.title}</h3>
                <BlurOverlay locked ctaText={td.unlockText}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200" />
                          <div>
                            <p className="font-medium text-gray-900">Competitor {i}</p>
                            <p className="text-xs text-gray-500">Technology</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-gray-50 rounded text-center">
                            <p className="text-sm font-bold">45.2K</p>
                            <p className="text-xs text-gray-500">Followers</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded text-center">
                            <p className="text-sm font-bold">2.8%</p>
                            <p className="text-xs text-gray-500">ER</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </BlurOverlay>
              </div>

              {/* Employees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.proposals.detail.employees}</h3>
                <BlurOverlay locked ctaText={td.unlockText}>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Employee Name {i}</p>
                            <p className="text-xs text-gray-500">Senior Role at Company</p>
                          </div>
                          <span className="ml-auto text-sm text-gray-500">5.2K followers</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlurOverlay>
              </div>
            </div>

            {/* CTA Final */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{td.unlockTitle}</h3>
              <p className="text-primary-100 mb-1">{td.unlockText}</p>
              <p className="text-primary-200 text-sm mb-6">{td.unlockPlatforms}</p>
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                {td.unlockCta}
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton for initial state */}
        {loading && !isProcessing && !proposal && (
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        )}
      </main>
    </div>
  );
}
