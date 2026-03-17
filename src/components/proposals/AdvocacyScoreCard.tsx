import { useTranslation } from '../../i18n/LanguageContext';
import type { AdvocacyScoreResult } from '../../types';

interface Props {
  advocacyScore: AdvocacyScoreResult;
}

const CATEGORY_LABELS: Record<string, (t: ReturnType<typeof useTranslation>) => string> = {
  teamSize: (t) => t.proposals.advocacyScore.teamSize,
  employeeReach: (t) => t.proposals.advocacyScore.employeeReach,
  multiPlatform: (t) => t.proposals.advocacyScore.multiPlatform,
  growthOpportunity: (t) => t.proposals.advocacyScore.growthOpportunity,
  contentActivity: (t) => t.proposals.advocacyScore.contentActivity,
};

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-success-500';
  if (score >= 50) return 'text-primary-600';
  if (score >= 25) return 'text-yellow-600';
  return 'text-error';
}

function getScoreLabel(score: number, t: ReturnType<typeof useTranslation>): string {
  if (score >= 75) return t.proposals.advocacyScore.excellent;
  if (score >= 50) return t.proposals.advocacyScore.good;
  if (score >= 25) return t.proposals.advocacyScore.moderate;
  return t.proposals.advocacyScore.low;
}

function getBarColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return 'bg-success-500';
  if (pct >= 50) return 'bg-primary-600';
  if (pct >= 25) return 'bg-yellow-400';
  return 'bg-error';
}

export default function AdvocacyScoreCard({ advocacyScore }: Props) {
  const t = useTranslation();
  const tp = t.proposals.advocacyScore;

  return (
    <div className="bg-white rounded-lg border border-grey-50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-grey-500">{tp.title}</h3>
          <p className="text-xs text-grey-100 mt-0.5">{tp.subtitle}</p>
        </div>
      </div>

      {/* Score circle */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#F3F4F6" strokeWidth="6" />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(advocacyScore.score / 100) * 213.6} 213.6`}
              className={getScoreColor(advocacyScore.score)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${getScoreColor(advocacyScore.score)}`}>
              {advocacyScore.score}
            </span>
          </div>
        </div>
        <div>
          <p className={`text-lg font-bold ${getScoreColor(advocacyScore.score)}`}>
            {getScoreLabel(advocacyScore.score, t)}
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {advocacyScore.breakdown.map((item) => (
          <div key={item.category}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-grey-300">
                {CATEGORY_LABELS[item.category]?.(t) ?? item.category}
              </span>
            </div>
            <div className="h-1.5 bg-grey-50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getBarColor(item.score, item.maxScore)}`}
                style={{ width: `${(item.score / item.maxScore) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-grey-100 mt-0.5">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
