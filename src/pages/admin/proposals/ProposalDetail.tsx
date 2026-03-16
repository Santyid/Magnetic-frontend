import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../i18n/LanguageContext';
import { proposalsAPI } from '../../../services/api';
import type { ProposalDetail as ProposalDetailType } from '../../../types';
import ProjectionCard from '../../../components/proposals/ProjectionCard';
import ProposalAIAnalysis from '../../../components/proposals/ProposalAIAnalysis';
import { Skeleton } from '../../../components/ui/Skeleton';

const POLL_INTERVAL = 4000;
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const proxyImg = (url?: string) =>
  url ? `${API_BASE}/proposals/image-proxy?url=${encodeURIComponent(url)}` : undefined;

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const t = useTranslation();
  const tp = t.proposals;

  const [proposal, setProposal] = useState<ProposalDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'twitter'>('linkedin');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleExport = async () => {
    if (!proposal || !id) return;
    setExporting(true);
    try {
      const analysis = await proposalsAPI.getAiAnalysis(id);
      const { generateProposalPdf } = await import('../../../utils/generateProposalPdf');
      await generateProposalPdf(proposal, analysis, API_BASE);
    } catch (err) {
      console.error('[PDF export error]', err);
    } finally {
      setExporting(false);
    }
  };

  const load = async () => {
    if (!id) return;
    try {
      const data = await proposalsAPI.getOne(id);
      setProposal(data);
      return data.status;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    load().then((status) => {
      setLoading(false);
      if (status === 'pending' || status === 'processing') {
        startPolling();
      }
    });
    return () => stopPolling();
  }, [id]);

  // Auto-select first available tab when proposal loads
  useEffect(() => {
    if (!proposal) return;
    const c = proposal.company;
    const available: typeof activeTab[] = [
      ...(c?.linkedinPosts?.length ? ['linkedin' as const] : []),
      ...(c?.facebookData ? ['facebook' as const] : []),
      ...(c?.instagramData ? ['instagram' as const] : []),
      ...(c?.tiktokData ? ['tiktok' as const] : []),
      ...(c?.twitterData ? ['twitter' as const] : []),
    ];
    if (available.length && !available.includes(activeTab)) {
      setActiveTab(available[0]);
    }
  }, [proposal]);

  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = setInterval(async () => {
      if (!id) return;
      try {
        const { status } = await proposalsAPI.getStatus(id);
        if (status === 'done' || status === 'failed') {
          stopPolling();
          load();
        }
      } catch {
        stopPolling();
      }
    }, POLL_INTERVAL);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="bg-white rounded-lg border border-grey-50 p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 rounded-lg" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="text-center py-24 text-grey-300">No encontrado</div>
    );
  }

  const isProcessing = proposal.status === 'pending' || proposal.status === 'processing';
  const isFailed = proposal.status === 'failed';
  const company = proposal.company;

  const hasLinkedin = !!(company?.linkedinPosts && company.linkedinPosts.length > 0);
  const hasFacebook = !!company?.facebookData;
  const hasInstagram = !!company?.instagramData;
  const hasTiktok = !!company?.tiktokData;
  const hasTwitter = !!company?.twitterData;
  const hasTabs = hasLinkedin || hasFacebook || hasInstagram || hasTiktok || hasTwitter;

  const tabs = [
    hasLinkedin && { key: 'linkedin' as const, label: 'LinkedIn' },
    hasFacebook && { key: 'facebook' as const, label: 'Facebook' },
    hasInstagram && { key: 'instagram' as const, label: 'Instagram' },
    hasTiktok && { key: 'tiktok' as const, label: 'TikTok' },
    hasTwitter && { key: 'twitter' as const, label: 'Twitter / X' },
  ].filter(Boolean) as { key: 'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'twitter'; label: string }[];

  return (
    <div className="space-y-6">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/proposals')}
          className="p-2 text-grey-300 hover:text-grey-500 hover:bg-white-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-grey-500">
            {company?.name ?? tp.detail.company}
          </h1>
          <p className="text-xs text-grey-100 mt-0.5">
            {tp.createdAt}: {new Date(proposal.createdAt).toLocaleString()}
            {proposal.completedAt && (
              <> · {tp.completedAt}: {new Date(proposal.completedAt).toLocaleString()}</>
            )}
          </p>
        </div>
        {proposal.status === 'done' && proposal.projections?.length > 0 && (
          <button
            onClick={handleExport}
            disabled={exporting}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#0058E7,#6366f1)' }}
          >
            {exporting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
            {exporting ? tp.exporting : tp.downloadProposal}
          </button>
        )}
      </div>

      {/* Processing banner */}
      {isProcessing && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-primary-600 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-primary-600">{tp.detail.processingTitle}</p>
            <p className="text-xs text-primary-500">{tp.detail.processingHint}</p>
          </div>
          <span className="ml-auto text-xs text-primary-400">{tp.pollingHint}</span>
        </div>
      )}

      {/* Failed banner */}
      {isFailed && (
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <p className="text-sm font-medium text-error">{tp.detail.failedTitle}</p>
          {proposal.errorMessage && (
            <p className="text-xs text-error/70 mt-1">{proposal.errorMessage}</p>
          )}
        </div>
      )}

      {/* Company card */}
      {company && (
        <div className="bg-white rounded-lg border border-grey-50 p-6">
          <h2 className="text-sm font-semibold text-grey-300 uppercase tracking-wide mb-4">{tp.detail.company}</h2>
          <div className="flex items-start gap-4 mb-5">
            {company.logo && (
              <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl object-contain border border-grey-50" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-grey-500">{company.name}</h3>
              {company.industry && <p className="text-sm text-grey-300">{company.industry}</p>}
              {company.description && (
                <p className="text-xs text-grey-300 mt-2 line-clamp-3">{company.description}</p>
              )}
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium shrink-0 flex items-center gap-1"
              >
                {company.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Social media stats — one row per platform */}
          {(hasLinkedin || hasFacebook || hasInstagram || hasTiktok) && (
            <div className="mt-4 space-y-2">

              {/* LinkedIn */}
              {hasLinkedin && (
                <a href={proposal.linkedinCompanyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white-700 rounded-lg px-4 py-3 hover:ring-2 hover:ring-[#0A66C2]/20 transition-shadow">
                  {/* LinkedIn logo */}
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-grey-300">Cuenta</p>
                      <p className="text-sm font-bold text-grey-500 truncate">
                        {proposal.linkedinCompanyUrl
                          ? proposal.linkedinCompanyUrl.replace(/\/$/, '').split('/').pop()
                          : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-300">Seguidores</p>
                      <p className="text-sm font-bold text-grey-500">{formatNum(company.followers ?? 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-300">Empleados</p>
                      <p className="text-sm font-bold text-grey-500">{formatNum(company.employeeCount ?? 0)}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-grey-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {/* Facebook */}
              {hasFacebook && (() => {
                const fb = company!.facebookData!;
                const posts = Array.isArray(fb.posts) ? fb.posts : [];
                return (
                  <a href={fb.pageUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white-700 rounded-lg px-4 py-3 hover:ring-2 hover:ring-[#1877F2]/20 transition-shadow">
                    {/* Facebook logo */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                    </svg>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-grey-300">Cuenta</p>
                        <p className="text-sm font-bold text-grey-500 truncate">{fb.name ?? '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Seguidores</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(fb.followers ?? 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Posts</p>
                        <p className="text-sm font-bold text-grey-500">{posts.length}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-grey-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              })()}

              {/* Instagram */}
              {hasInstagram && (() => {
                const ig = company!.instagramData!;
                const posts = Array.isArray(ig.posts) ? ig.posts : [];
                const avgLikes = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0) / posts.length) : 0;
                const avgComments = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.comments ?? 0), 0) / posts.length) : 0;
                const er = ig.followers > 0 ? ((avgLikes + avgComments) / ig.followers * 100).toFixed(2) : '0.00';
                return (
                  <a href={`https://www.instagram.com/${ig.username}/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white-700 rounded-lg px-4 py-3 hover:ring-2 hover:ring-pink-400/20 transition-shadow">
                    {/* Instagram logo */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
                      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" />
                      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" fill="none" />
                      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                    </svg>
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-grey-300">Cuenta</p>
                        <p className="text-sm font-bold text-grey-500 truncate">@{ig.username}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Seguidores</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(ig.followers)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Publicaciones</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(ig.mediaCount)}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-grey-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              })()}

              {/* TikTok */}
              {hasTiktok && (() => {
                const tt = company!.tiktokData!;
                return (
                  <a href={`https://www.tiktok.com/@${tt.username ?? ''}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white-700 rounded-lg px-4 py-3 hover:ring-2 hover:ring-grey-300/30 transition-shadow">
                    {/* TikTok logo */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                    </svg>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-grey-300">Cuenta</p>
                        <p className="text-sm font-bold text-grey-500 truncate">@{tt.username ?? '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Seguidores</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(tt.followers ?? tt.followerCount ?? 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Videos</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(tt.totalVideos ?? tt.videoCount ?? tt.posts?.length ?? 0)}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-grey-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              })()}

              {/* Twitter/X */}
              {hasTwitter && (() => {
                const tw = company!.twitterData!;
                return (
                  <a href={`https://x.com/${tw.username ?? ''}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white-700 rounded-lg px-4 py-3 hover:ring-2 hover:ring-grey-300/30 transition-shadow">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-grey-300">Cuenta</p>
                        <p className="text-sm font-bold text-grey-500 truncate">@{tw.username ?? '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Seguidores</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(tw.followers ?? 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-grey-300">Tweets</p>
                        <p className="text-sm font-bold text-grey-500">{formatNum(tw.totalTweets ?? tw.posts?.length ?? 0)}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-grey-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              })()}

            </div>
          )}
        </div>
      )}

      {/* Projections */}
      {proposal.projections?.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-grey-300 uppercase tracking-wide mb-4">
            {tp.detail.projections}
          </h2>
          <div className={`grid gap-4 ${
            proposal.projections.length === 1 ? 'grid-cols-1' :
            proposal.projections.length === 2 ? 'grid-cols-2' :
            proposal.projections.length === 3 ? 'grid-cols-3' :
            'grid-cols-4'
          }`}>
            {proposal.projections.map((proj) => (
              <ProjectionCard key={proj.id} projection={proj} employeeCount={proposal.company?.employeeCount} />
            ))}
          </div>
        </div>
      )}

      {!isProcessing && proposal.projections?.length === 0 && !isFailed && (
        <div className="text-center py-12 text-grey-300 text-sm">{tp.detail.noProjections}</div>
      )}

      {/* AI Analysis */}
      {proposal.status === 'done' && proposal.projections?.length > 0 && (
        <ProposalAIAnalysis proposalId={proposal.id} />
      )}

      {/* Social analysis tabs */}
      {hasTabs && (
        <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-grey-50">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-grey-300 hover:text-grey-500'
                }`}
              >
                {tab.key === 'linkedin' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {tab.key === 'facebook' && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                )}
                {tab.key === 'instagram' && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                )}
                {tab.key === 'tiktok' && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                  </svg>
                )}
                {tab.key === 'twitter' && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">

            {/* LinkedIn tab */}
            {activeTab === 'linkedin' && hasLinkedin && (
              <div>
                <p className="text-xs text-grey-100 mb-4">
                  Últimos {Math.min(company!.linkedinPosts!.length, 9)} posts · {company!.linkedinPosts!.length} totales
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {company!.linkedinPosts!.slice(0, 9).map((post, i) => (
                    <a key={i} href={post.url} target="_blank" rel="noopener noreferrer" className="bg-white-700 rounded-lg overflow-hidden block hover:ring-2 hover:ring-primary-600/30 transition-shadow">
                      {post.imageUrl && post.contentType !== 'document' && post.contentType !== 'video' && (
                        <img src={post.imageUrl} alt="" className="w-full h-40 object-cover" loading="lazy" />
                      )}
                      {post.contentType === 'document' && (
                        post.coverImageUrl ? (
                          <div className="relative">
                            <img src={post.coverImageUrl} alt={post.documentTitle ?? ''} className="w-full h-40 object-cover" loading="lazy" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 flex items-end justify-between">
                              <div className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {post.documentTitle && (
                                  <p className="text-xs text-white font-medium line-clamp-1">{post.documentTitle}</p>
                                )}
                              </div>
                              {post.documentPageCount != null && (
                                <span className="text-xs text-white/80 shrink-0">{post.documentPageCount} pág.</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 bg-primary-50 flex flex-col items-center justify-center gap-1.5 border-b border-grey-50">
                            <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {post.documentTitle && (
                              <p className="text-xs font-medium text-primary-600 px-3 text-center line-clamp-1">{post.documentTitle}</p>
                            )}
                          </div>
                        )
                      )}
                      {post.contentType === 'video' && (
                        post.imageUrl ? (
                          <div className="relative w-full h-40">
                            <img src={post.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                                <svg className="w-4 h-4 text-grey-500 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-24 bg-white-700 flex items-center justify-center border-b border-grey-50">
                            <svg className="w-7 h-7 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )
                      )}
                      <div className="p-2.5">
                        {post.text && (
                          <p className="text-xs text-grey-400 line-clamp-2 mb-2">{post.text}</p>
                        )}
                        <div className="flex items-center justify-between gap-1">
                          {post.date_published && (
                            <span className="text-xs text-grey-100">
                              {new Date(post.date_published).toLocaleDateString()}
                            </span>
                          )}
                          <div className="flex items-center gap-2 shrink-0 text-xs">
                            <span className="flex items-center gap-0.5">
                              <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              <span className="font-semibold text-grey-500">{formatNum(post.likes)}</span>
                            </span>
                            <span className="flex items-center gap-0.5">
                              <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="font-semibold text-grey-500">{formatNum(post.comments)}</span>
                            </span>
                            <span className="flex items-center gap-0.5">
                              <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <span className="font-semibold text-grey-500">{formatNum(post.reposts)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Employees — only in LinkedIn tab */}
                {proposal.employees?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-grey-300 uppercase tracking-wide mb-3">
                      {tp.detail.employees} ({proposal.employees.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[...proposal.employees]
                        .sort((a, b) => b.linkedinFollowers - a.linkedinFollowers)
                        .slice(0, 18)
                        .map((emp) => (
                        <a
                          key={emp.id}
                          href={emp.linkedinUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-2.5 bg-white-700 rounded-lg hover:ring-2 hover:ring-primary-600/20 transition-shadow"
                        >
                          <div className="w-8 h-8 rounded-full shrink-0 relative">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold">
                              {emp.name?.charAt(0) ?? '?'}
                            </div>
                            {emp.avatar && (
                              <img src={emp.avatar} alt="" className="w-8 h-8 rounded-full object-cover absolute inset-0" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-grey-500 truncate leading-tight">{emp.name ?? '—'}</p>
                            <p className="text-xs text-grey-300 truncate leading-tight mt-0.5">{emp.title ?? ''}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-xs font-bold text-grey-500">{formatNum(emp.linkedinFollowers)}</p>
                            <p className="text-xs text-grey-100 leading-tight">seg.</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Facebook tab */}
            {activeTab === 'facebook' && hasFacebook && (() => {
              const fb = company!.facebookData!;
              const posts = Array.isArray(fb.posts) ? fb.posts : [];
              const avgLikes = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0) / posts.length) : 0;
              const avgComments = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.comments ?? 0), 0) / posts.length) : 0;
              const avgReactions = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.reactions_count ?? 0), 0) / posts.length) : 0;
              return (
                <div>
                  {posts.length > 0 && (
                    <>
                      <p className="text-xs text-grey-100 mb-4">
                        Últimos {posts.length} posts
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {posts.map((p: any, i: number) => {
                          const card = (
                            <div className="bg-white-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#1877F2]/30 transition-shadow">
                              {p.thumbnailUrl ? (
                                <img src={proxyImg(p.thumbnailUrl)} alt="" className="w-full h-40 object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              ) : (
                                <div className="w-full h-40 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1877F2 0%, #0c5fd4 60%, #0a4ab5 100%)' }}>
                                  {/* Fondo decorativo */}
                                  <div className="absolute inset-0 opacity-10">
                                    <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white" />
                                    <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white" />
                                  </div>
                                  {/* Logo + label */}
                                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                    <svg className="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                                    </svg>
                                    <span className="text-xs text-white/60 font-medium tracking-wide">Publicación de texto</span>
                                  </div>
                                </div>
                              )}
                              <div className="p-2.5">
                                {p.caption && (
                                  <p className="text-xs text-grey-400 line-clamp-2 mb-2">{p.caption}</p>
                                )}
                                <div className="flex items-center justify-between gap-1">
                                  {p.timestamp && (
                                    <span className="text-xs text-grey-100">
                                      {new Date(p.timestamp * 1000).toLocaleDateString()}
                                    </span>
                                  )}
                                  <div className="flex items-center gap-2 shrink-0 text-xs">
                                    <span className="flex items-center gap-0.5">
                                      <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                      </svg>
                                      <span className="font-semibold text-grey-500">{formatNum(p.likes ?? 0)}</span>
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                      </svg>
                                      <span className="font-semibold text-grey-500">{formatNum(p.comments ?? 0)}</span>
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                      </svg>
                                      <span className="font-semibold text-grey-500">{formatNum(p.reactions_count ?? 0)}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                          return p.postUrl ? (
                            <a key={i} href={p.postUrl} target="_blank" rel="noopener noreferrer" className="block">
                              {card}
                            </a>
                          ) : (
                            <div key={i}>{card}</div>
                          );
                        })}
                      </div>

                      {/* Avg stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white-700 rounded-lg p-3 text-center">
                          <p className="text-xs text-grey-300 mb-0.5">Avg. Likes</p>
                          <p className="text-base font-bold text-grey-500">{formatNum(avgLikes)}</p>
                        </div>
                        <div className="bg-white-700 rounded-lg p-3 text-center">
                          <p className="text-xs text-grey-300 mb-0.5">Avg. Comentarios</p>
                          <p className="text-base font-bold text-grey-500">{formatNum(avgComments)}</p>
                        </div>
                        <div className="bg-white-700 rounded-lg p-3 text-center">
                          <p className="text-xs text-grey-300 mb-0.5">Avg. Reacciones</p>
                          <p className="text-base font-bold text-grey-500">{formatNum(avgReactions)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            {/* Instagram tab */}
            {activeTab === 'instagram' && hasInstagram && (() => {
              const ig = company!.instagramData!;
              const posts = Array.isArray(ig.posts) ? ig.posts : [];
              const avgLikes = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0) / posts.length) : 0;
              const avgComments = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.comments ?? 0), 0) / posts.length) : 0;
              const er = ig.followers > 0 ? ((avgLikes + avgComments) / ig.followers * 100).toFixed(2) : '0.00';
              return (
                <div>
                  {/* Posts grid */}
                  {posts.length > 0 && (
                    <>
                      <p className="text-xs text-grey-100 mb-4">
                        Últimos {Math.min(posts.length, 9)} posts · {ig.mediaCount} totales
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {posts.slice(0, 9).map((p: any, i: number) => {
                          const card = (
                            <div className="bg-white-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-600/30 transition-shadow">
                              {/* Thumbnail */}
                              {p.thumbnailUrl ? (
                                <div className="relative w-full h-40">
                                  <img src={p.thumbnailUrl} alt="" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                                  {/* Video overlay */}
                                  {p.isVideo && (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-grey-500 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                  {/* Carousel badge */}
                                  {p.isCarousel && !p.isVideo && (
                                    <div className="absolute top-2 right-2">
                                      <svg className="w-4 h-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2 6h14v12H2V6zm16-2v16H4v2h16V4h-2zm2-2v16H6v2h16V2H20z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="w-full h-24 bg-grey-50 flex items-center justify-center border-b border-grey-50">
                                  <svg className="w-7 h-7 text-grey-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.66667">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                  </svg>
                                </div>
                              )}
                              {/* Info */}
                              <div className="p-2.5">
                                {p.caption && (
                                  <p className="text-xs text-grey-400 line-clamp-2 mb-2">{p.caption}</p>
                                )}
                                <div className="flex items-center justify-between gap-1">
                                  {p.timestamp && (
                                    <span className="text-xs text-grey-100">
                                      {new Date(p.timestamp * 1000).toLocaleDateString()}
                                    </span>
                                  )}
                                  <div className="flex items-center gap-2 shrink-0 text-xs">
                                    <span className="flex items-center gap-0.5">
                                      <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                      </svg>
                                      <span className="font-semibold text-grey-500">{formatNum(p.likes ?? 0)}</span>
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <svg className="w-3 h-3 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                      </svg>
                                      <span className="font-semibold text-grey-500">{formatNum(p.comments ?? 0)}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                          return p.postUrl ? (
                            <a key={i} href={p.postUrl} target="_blank" rel="noopener noreferrer" className="block">
                              {card}
                            </a>
                          ) : (
                            <div key={i}>{card}</div>
                          );
                        })}
                      </div>

                      {/* Followers (ambassadors) */}
                      {Array.isArray(ig.igFollowers) && ig.igFollowers.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-grey-300 uppercase tracking-wide mb-3">
                            Seguidores ({ig.igFollowers.length})
                          </h3>
                          <div className="grid grid-cols-3 gap-2">
                            {ig.igFollowers.map((f: any) => (
                              <a
                                key={f.username}
                                href={f.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 p-2.5 bg-white-700 rounded-lg hover:ring-2 hover:ring-primary-600/20 transition-shadow"
                              >
                                <div className="w-8 h-8 rounded-full shrink-0 relative">
                                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold">
                                    {f.fullName?.charAt(0) ?? '?'}
                                  </div>
                                  {f.profilePicUrl && (
                                    <img src={proxyImg(f.profilePicUrl)} alt="" className="w-8 h-8 rounded-full object-cover absolute inset-0" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-grey-500 truncate leading-tight">{f.fullName || f.username}</p>
                                  <p className="text-xs text-grey-300 truncate leading-tight mt-0.5">@{f.username}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                  <p className="text-xs font-bold text-grey-500">{formatNum(f.followerCount ?? 0)}</p>
                                  <p className="text-xs text-grey-100 leading-tight">seg.</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })()}

            {/* TikTok tab */}
            {activeTab === 'tiktok' && hasTiktok && (() => {
              const tt = company!.tiktokData!;
              const posts = Array.isArray(tt.posts) ? tt.posts : [];
              const followers = Array.isArray(tt.ttFollowers) ? tt.ttFollowers : [];
              const avgLikes = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0) / posts.length) : 0;
              const avgComments = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.comments ?? 0), 0) / posts.length) : 0;
              const avgPlays = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.plays ?? 0), 0) / posts.length) : 0;
              return (
                <div>
                  {/* Posts grid */}
                  {posts.length > 0 && (
                    <div className="grid grid-cols-5 gap-1.5 mb-4">
                      {posts.map((p: any, i: number) => (
                        <a key={i} href={p.postUrl} target="_blank" rel="noopener noreferrer"
                          className="relative aspect-[9/16] bg-grey-50 rounded overflow-hidden group block">
                          {p.thumbnailUrl ? (
                            <img src={proxyImg(p.thumbnailUrl)} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-grey-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
                            {p.caption && <p className="text-white text-[10px] leading-tight line-clamp-2 mb-1">{p.caption}</p>}
                            <div className="flex gap-2 text-white text-[10px]">
                              <span>♥ {formatNum(p.likes ?? 0)}</span>
                              <span>▶ {formatNum(p.plays ?? 0)}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Avg stats */}
                  {posts.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Likes</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgLikes)}</p>
                      </div>
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Comentarios</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgComments)}</p>
                      </div>
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Reproducciones</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgPlays)}</p>
                      </div>
                    </div>
                  )}

                  {/* Followers */}
                  {followers.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-3">
                        Seguidores ({followers.length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {followers.map((f: any, i: number) => (
                          <a key={i} href={f.profileUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white-700 rounded-lg px-3 py-2 hover:ring-1 hover:ring-grey-200 transition-shadow min-w-0">
                            <div className="w-8 h-8 rounded-full shrink-0 relative">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold">
                                {f.fullName?.charAt(0) ?? '?'}
                              </div>
                              {f.profilePicUrl && (
                                <img src={proxyImg(f.profilePicUrl)} alt="" className="w-8 h-8 rounded-full object-cover absolute inset-0"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-grey-500 truncate">{f.fullName}</p>
                              <p className="text-[11px] text-grey-300 truncate">@{f.username}</p>
                            </div>
                            <p className="text-xs font-bold text-grey-400 shrink-0">{formatNum(f.followerCount)}<br/><span className="font-normal text-grey-300">seg.</span></p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Twitter tab */}
            {activeTab === 'twitter' && hasTwitter && (() => {
              const tw = company!.twitterData!;
              const posts = Array.isArray(tw.posts) ? tw.posts : [];
              const followers = Array.isArray(tw.twFollowers) ? tw.twFollowers : [];
              const avgLikes = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0) / posts.length) : 0;
              const avgComments = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.comments ?? 0), 0) / posts.length) : 0;
              const avgViews = posts.length ? Math.round(posts.reduce((s: number, p: any) => s + (p.views ?? 0), 0) / posts.length) : 0;
              return (
                <div>
                  {/* Posts grid */}
                  {posts.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {posts.map((p: any, i: number) => (
                        <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                          className="flex gap-3 bg-white-700 rounded-lg p-3 hover:ring-1 hover:ring-grey-200 transition-shadow block">
                          {p.thumbnailUrl && (
                            <img src={proxyImg(p.thumbnailUrl)} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          )}
                          <div className="flex-1 min-w-0">
                            {p.text && (
                              <p className="text-xs text-grey-400 line-clamp-2 mb-2">{p.text}</p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-grey-300">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="font-semibold text-grey-500">{formatNum(p.likes ?? 0)}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="font-semibold text-grey-500">{formatNum(p.comments ?? 0)}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="font-semibold text-grey-500">{formatNum(p.reposts ?? 0)}</span>
                              </span>
                              <span className="ml-auto text-grey-100">{formatNum(p.views ?? 0)} views</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Avg stats */}
                  {posts.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Likes</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgLikes)}</p>
                      </div>
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Replies</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgComments)}</p>
                      </div>
                      <div className="bg-white-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-grey-300 mb-0.5">Avg. Vistas</p>
                        <p className="text-base font-bold text-grey-500">{formatNum(avgViews)}</p>
                      </div>
                    </div>
                  )}

                  {/* Followers */}
                  {followers.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-3">
                        Seguidores ({followers.length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {followers.map((f: any, i: number) => (
                          <a key={i} href={f.profileUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white-700 rounded-lg px-3 py-2 hover:ring-1 hover:ring-grey-200 transition-shadow min-w-0">
                            <div className="w-8 h-8 rounded-full shrink-0 relative">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold">
                                {f.fullName?.charAt(0) ?? '?'}
                              </div>
                              {f.profilePicUrl && (
                                <img src={proxyImg(f.profilePicUrl)} alt="" className="w-8 h-8 rounded-full object-cover absolute inset-0"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-grey-500 truncate">{f.fullName}</p>
                              <p className="text-[11px] text-grey-300 truncate">@{f.username}</p>
                            </div>
                            <p className="text-xs font-bold text-grey-400 shrink-0">{formatNum(f.followerCount)}<br/><span className="font-normal text-grey-300">seg.</span></p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

          </div>
        </div>
      )}


    </div>
  );
}
