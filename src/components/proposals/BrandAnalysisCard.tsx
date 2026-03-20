import { useTranslation } from '../../i18n/LanguageContext';
import type { CompetitorBrandAnalysis } from '../../types';

interface Props {
  analysis: CompetitorBrandAnalysis;
}

export default function BrandAnalysisCard({ analysis }: Props) {
  const t = useTranslation();
  const tb = t.proposals.brandAnalysis;

  return (
    <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-grey-50">
        <h3 className="text-sm font-semibold text-grey-500">{tb.title}</h3>
        <p className="text-xs text-grey-300 mt-0.5">{tb.subtitle}</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Brand Position */}
        <div className="bg-primary-600/5 rounded-lg p-4">
          <p className="text-sm text-grey-500 leading-relaxed">{analysis.brandPosition}</p>
        </div>

        {/* SWOT-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Strengths */}
          <div>
            <h4 className="text-xs font-semibold text-success-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {tb.strengths}
            </h4>
            <ul className="space-y-1.5">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="text-xs text-grey-400 leading-relaxed flex gap-1.5">
                  <span className="text-success-500 mt-0.5 shrink-0">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="text-xs font-semibold text-error uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              {tb.weaknesses}
            </h4>
            <ul className="space-y-1.5">
              {analysis.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-grey-400 leading-relaxed flex gap-1.5">
                  <span className="text-error mt-0.5 shrink-0">-</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.66667} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              {tb.opportunities}
            </h4>
            <ul className="space-y-1.5">
              {analysis.opportunities.map((o, i) => (
                <li key={i} className="text-xs text-grey-400 leading-relaxed flex gap-1.5">
                  <span className="text-primary-600 mt-0.5 shrink-0">*</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitor Insights */}
        {analysis.competitorInsights?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-2">
              {tb.competitorInsights}
            </h4>
            <div className="space-y-2">
              {analysis.competitorInsights.map((ci, i) => (
                <div key={i} className="flex gap-2 bg-grey-50/50 rounded-lg px-3 py-2">
                  <span className="text-xs font-semibold text-grey-500 shrink-0">{ci.name}:</span>
                  <span className="text-xs text-grey-400">{ci.verdict}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="border-t border-grey-50 pt-4">
          <h4 className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-2">
            {tb.recommendation}
          </h4>
          <p className="text-sm text-grey-500 leading-relaxed">{analysis.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
