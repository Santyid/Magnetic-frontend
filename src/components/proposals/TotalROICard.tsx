import { useTranslation } from '../../i18n/LanguageContext';
import type { ProposalProjection, AdvocacyScoreResult } from '../../types';

interface Props {
  projections: ProposalProjection[];
  advocacyScore?: AdvocacyScoreResult;
  employeeCount?: number;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-success-500';
  if (score >= 50) return 'text-primary-600';
  if (score >= 25) return 'text-yellow-600';
  return 'text-error';
}

function getBarColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return 'bg-success-500';
  if (pct >= 50) return 'bg-primary-600';
  if (pct >= 25) return 'bg-yellow-400';
  return 'bg-error';
}

const CATEGORY_LABELS: Record<string, (t: ReturnType<typeof useTranslation>) => string> = {
  teamSize: (t) => t.proposals.advocacyScore.teamSize,
  employeeReach: (t) => t.proposals.advocacyScore.employeeReach,
  multiPlatform: (t) => t.proposals.advocacyScore.multiPlatform,
  growthOpportunity: (t) => t.proposals.advocacyScore.growthOpportunity,
  contentActivity: (t) => t.proposals.advocacyScore.contentActivity,
};

export default function TotalROICard({ projections, advocacyScore, employeeCount }: Props) {
  const t = useTranslation();
  const tp = t.proposals.totalROI;

  if (!projections || projections.length === 0) return null;

  const totalCurrentFollowers = projections.reduce((s, p) => s + (p.followers ?? 0), 0);
  const totalPotentialReach = projections.reduce((s, p) => s + (p.potentialReach ?? p.followers ?? 0), 0);
  const totalImpressions = projections.reduce((s, p) => s + (p.estimatedImpressions ?? 0), 0);
  const totalAmbassadors = projections.reduce((s, p) => s + (p.ambassadorCount ?? 0), 0);
  const avgGrowth = projections.length > 0
    ? (projections.reduce((s, p) => s + (p.growthFactor ?? 1), 0) / projections.length).toFixed(1)
    : '1.0';

  if (totalCurrentFollowers === 0) return null;

  const score = advocacyScore?.score ?? 0;

  return (
    <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{tp.title}</h3>
            <p className="text-xs text-white/70 mt-0.5">{tp.subtitle}</p>
          </div>
          {advocacyScore && (
            <div className="flex items-center gap-2.5 bg-white/15 rounded-lg px-3 py-2">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <circle
                    cx="20" cy="20" r="16" fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 100.5} 100.5`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{score}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Advocacy Score</p>
                <p className="text-[10px] text-white/60">
                  {score >= 75 ? t.proposals.advocacyScore.excellent
                    : score >= 50 ? t.proposals.advocacyScore.good
                    : score >= 25 ? t.proposals.advocacyScore.moderate
                    : t.proposals.advocacyScore.low}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-4 divide-x divide-grey-50">
        <div className="px-4 py-4 text-center">
          <p className="text-xs text-grey-300 mb-1">{tp.currentReach}</p>
          <p className="text-lg font-bold text-grey-500">{formatNum(totalCurrentFollowers)}</p>
          <p className="text-[10px] text-grey-100">{tp.followers}</p>
        </div>
        <div className="px-4 py-4 text-center">
          <p className="text-xs text-grey-300 mb-1">{tp.withAdpro}</p>
          <p className="text-lg font-bold text-primary-600">{formatNum(totalPotentialReach)}</p>
          <p className="text-[10px] text-primary-600/60">{avgGrowth}x</p>
        </div>
        <div className="px-4 py-4 text-center">
          <p className="text-xs text-grey-300 mb-1">{tp.impressions}</p>
          <p className="text-lg font-bold text-grey-500">{formatNum(totalImpressions)}</p>
          <p className="text-[10px] text-grey-100">{tp.perMonth}</p>
        </div>
        <div className="px-4 py-4 text-center">
          <p className="text-xs text-grey-300 mb-1">{tp.ambassadors}</p>
          <p className="text-lg font-bold text-grey-500">{formatNum(totalAmbassadors)}</p>
          <p className="text-[10px] text-grey-100">/ {formatNum(employeeCount ?? 0)}</p>
        </div>
      </div>

      {/* Advocacy breakdown */}
      {advocacyScore && advocacyScore.breakdown.length > 0 && (
        <div className="px-5 py-4 border-t border-grey-50">
          <div className="grid grid-cols-5 gap-4">
            {advocacyScore.breakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-grey-300 truncate">
                    {CATEGORY_LABELS[item.category]?.(t) ?? item.category}
                  </span>
                  <span className={`text-[10px] font-bold ml-1 ${getScoreColor((item.score / item.maxScore) * 100)}`}>
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <div className="h-1.5 bg-grey-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(item.score, item.maxScore)}`}
                    style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
