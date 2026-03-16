import { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { proposalsAPI } from '../../services/api';
import type { ProposalAIAnalysisResult } from '../../types';

interface Props {
  proposalId: string;
}

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  linkedin:  { label: 'LinkedIn',    color: '#0A66C2' },
  instagram: { label: 'Instagram',   color: '#C13584' },
  facebook:  { label: 'Facebook',    color: '#1877F2' },
  tiktok:    { label: 'TikTok',      color: '#010101' },
  twitter:   { label: 'Twitter / X', color: '#14171A' },
};

function PlatformIcon({ platform, size = 20 }: { platform: string; size?: number }) {
  const s = size;
  if (platform === 'linkedin') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  if (platform === 'instagram') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
  if (platform === 'facebook') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
  if (platform === 'tiktok') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
    </svg>
  );
  // twitter/X
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ProposalAIAnalysis({ proposalId }: Props) {
  const t = useTranslation();
  const ta = t.proposals.aiAnalysis;

  const [analysis, setAnalysis] = useState<ProposalAIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchAnalysis = async () => {
      try {
        const data = await proposalsAPI.getAiAnalysis(proposalId);
        if (!cancelled) setAnalysis(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAnalysis();
    return () => { cancelled = true; };
  }, [proposalId]);

  return (
    <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-grey-50">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#0058E7,#6366f1)' }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-grey-500">{ta.title}</h2>
          <p className="text-xs text-grey-100">{ta.subtitle}</p>
        </div>
        <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg,#0058E7,#6366f1)' }}>
          {ta.badge}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Loading */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-14 bg-grey-50 rounded-lg" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-0 rounded-lg overflow-hidden border border-grey-50 h-20">
                <div className="w-14 bg-grey-50 shrink-0" />
                <div className="flex-1 p-3 space-y-2">
                  <div className="h-3 bg-grey-50 rounded w-24" />
                  <div className="h-3 bg-grey-50 rounded w-full" />
                  <div className="h-3 bg-grey-50 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center py-8 text-sm text-grey-300">{ta.error}</p>
        )}

        {/* Content */}
        {analysis && !loading && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="rounded-lg p-4" style={{ background: 'linear-gradient(135deg,#EBF0FD,#EDE9FE)' }}>
              <p className="text-sm font-medium text-primary-700 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Platform insights — horizontal cards, 1 column, always aligned */}
            {analysis.platformInsights?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-grey-300 uppercase tracking-widest mb-3">{ta.platformInsights}</p>
                <div className="space-y-2.5">
                  {analysis.platformInsights.map((pi, i) => {
                    const platformKey = pi.platform.toLowerCase();
                    const meta = PLATFORM_META[platformKey] ?? { label: pi.platform, color: '#374151' };
                    return (
                      <div key={i} className="flex rounded-lg overflow-hidden border" style={{ borderColor: `${meta.color}30` }}>
                        {/* Colored left band with icon */}
                        <div className="w-14 flex flex-col items-center justify-center gap-1.5 py-4 shrink-0" style={{ background: meta.color }}>
                          <span style={{ color: '#ffffff' }}>
                            <PlatformIcon platform={platformKey} size={20} />
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 px-4 py-3" style={{ background: `${meta.color}08` }}>
                          <p className="text-xs font-bold mb-1" style={{ color: meta.color }}>{meta.label}</p>
                          <p className="text-xs text-grey-400 leading-relaxed mb-2">{pi.insight}</p>
                          <div className="flex items-start gap-1.5">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: '#1a7f4b', flexShrink: 0, marginTop: 1 }}>
                              <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-xs font-semibold leading-relaxed" style={{ color: '#1a7f4b' }}>{pi.opportunity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key benefits */}
            {analysis.keyBenefits?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-grey-300 uppercase tracking-widest mb-3">{ta.keyBenefits}</p>
                <div className="space-y-2">
                  {analysis.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg px-4 py-3 bg-white-700">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg,#0058E7,#6366f1)' }}>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-sm text-grey-400 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to action */}
            {analysis.callToAction && (
              <div className="rounded-lg px-6 py-5 text-center" style={{ background: 'linear-gradient(135deg,#0058E7,#6366f1)' }}>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  "{analysis.callToAction}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
