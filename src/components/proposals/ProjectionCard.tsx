import { useTranslation } from '../../i18n/LanguageContext';
import type { ProposalProjection, ProposalClassification } from '../../types';

interface Props {
  projection: ProposalProjection;
  employeeCount?: number;
}

const CLASSIFICATION_STYLES: Record<ProposalClassification, { badge: string; bar: string }> = {
  HIGH: { badge: 'bg-success-500/10 text-success-500', bar: 'bg-success-500' },
  MEDIUM: { badge: 'bg-yellow-50 text-yellow-700', bar: 'bg-yellow-400' },
  LOW: { badge: 'bg-error/10 text-error', bar: 'bg-error' },
};

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'Twitter / X',
};

// Tasa de alcance orgánico promedio por plataforma (industria)
const ORGANIC_REACH_RATE: Record<string, number> = {
  linkedin: 0.10,
  instagram: 0.08,
  facebook: 0.03,
  twitter: 0.08,
  tiktok: 0.25,
};


function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

export default function ProjectionCard({ projection, employeeCount }: Props) {
  const t = useTranslation();
  const tp = t.proposals;

  const { badge, bar } = CLASSIFICATION_STYLES[projection.classification];
  const classLabel = tp.classification[projection.classification];
  const classHint = tp.classification[`${projection.classification}Hint` as keyof typeof tp.classification];

  const organicRate = ORGANIC_REACH_RATE[projection.platform] ?? 0.08;
  const potentialReach = projection.potentialReach ?? (projection.followers + (projection.ambassadorFollowers ?? 0));
  const impressionsWith = Math.round(potentialReach * organicRate);
  // projectedLikes ya incluye growthFactor; +20% estima comentarios y reposts
  const estimatedReactions = Math.round(projection.projectedLikes * 1.2);

  return (
    <div className="bg-white rounded-lg border border-grey-50 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-grey-500">
          {PLATFORM_LABELS[projection.platform] ?? projection.platform}
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}>
          {classLabel}
        </span>
      </div>

      {/* Growth bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-grey-300 mb-1.5">
          <span>{tp.projection.growthFactor}</span>
          <span className="font-semibold text-grey-500">{projection.growthFactor.toFixed(1)}x</span>
        </div>
        <div className="h-2 bg-grey-50 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${bar}`}
            style={{ width: `${Math.min((projection.growthFactor / 8) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-grey-100 mt-1">{classHint}</p>
      </div>

      {/* Metrics row — 3 columnas */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {/* Seguidores actuales */}
        <div className="bg-white-700 rounded-lg p-3">
          <p className="text-xs text-grey-300 mb-0.5">{tp.projection.followers}</p>
          <p className="text-sm font-bold text-grey-500">{formatNumber(projection.followers)}</p>
        </div>
        {/* Impresiones Estimadas */}
        <div className="bg-white-700 rounded-lg p-3">
          <p className="text-xs text-grey-300 mb-0.5">{tp.projection.impressionsWith}</p>
          <p className="text-sm font-bold text-grey-500">{formatNumber(impressionsWith)}</p>
        </div>
        {/* Reacciones Estimadas */}
        <div className="bg-white-700 rounded-lg p-3">
          <p className="text-xs text-grey-300 mb-0.5">{tp.projection.estimatedReactions}</p>
          <p className="text-sm font-bold text-grey-500">{formatNumber(estimatedReactions)}</p>
        </div>
      </div>

      {/* Employees row */}
      <div className="flex items-center justify-between py-2 px-3 bg-white-700 rounded-lg mb-4">
        <p className="text-xs text-grey-300">{tp.projection.employees}</p>
        <p className="text-sm font-semibold text-grey-500">{employeeCount ?? projection.ambassadorCount}</p>
      </div>

      {/* Recommendations */}
      {projection.recommendations?.length > 0 && (
        <div>
          <p className="text-xs font-medium text-grey-300 mb-2">{tp.projection.recommendations}</p>
          <ul className="space-y-1">
            {projection.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-grey-300">
                <span className="w-1 h-1 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
