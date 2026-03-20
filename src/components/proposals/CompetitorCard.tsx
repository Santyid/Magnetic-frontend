import { useTranslation } from '../../i18n/LanguageContext';
import type { CompetitorData } from '../../types';

interface Props {
  company: { name: string; logo: string; followers: number; employeeCount: number; engagement?: { avgLikes: number; avgComments: number; engagementRate: number; postsPerMonth: number } };
  competitors: CompetitorData[];
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const proxyImg = (url?: string) =>
  url ? `${API_BASE}/proposals/image-proxy?url=${encodeURIComponent(url)}` : undefined;

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatDiff(diff: number, more: string, fewer: string): string {
  const abs = Math.abs(diff);
  const formatted = formatNum(abs);
  return diff >= 0 ? `+${formatted} ${more}` : `-${formatted} ${fewer}`;
}

export default function CompetitorCard({ company, competitors }: Props) {
  const t = useTranslation();
  const tc = t.proposals.competitors;

  if (!competitors.length) return null;

  return (
    <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-grey-50">
        <h3 className="text-sm font-semibold text-grey-500">{tc.title}</h3>
        <p className="text-xs text-grey-300 mt-0.5">{tc.subtitle}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-grey-50/50 text-left text-xs text-grey-300 font-medium">
              <th className="px-5 py-2.5"></th>
              <th className="px-5 py-2.5">{tc.followers}</th>
              <th className="px-5 py-2.5">{tc.employees}</th>
              <th className="px-5 py-2.5">{tc.engagementRate}</th>
              <th className="px-5 py-2.5">{tc.avgLikes}</th>
              <th className="px-5 py-2.5">{tc.frequency}</th>
              <th className="px-5 py-2.5">{tc.vsCompany}</th>
            </tr>
          </thead>
          <tbody>
            {/* Main company (reference row) */}
            <tr className="bg-primary-600/5 border-b border-grey-50">
              <td className="px-5 py-3">
                <div className="flex items-center gap-2.5">
                  {company.logo ? (
                    <img
                      src={proxyImg(company.logo)}
                      alt={company.name}
                      className="w-8 h-8 rounded-full object-cover border border-grey-50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-600/10 flex items-center justify-center text-xs font-bold text-primary-600">
                      {company.name.charAt(0)}
                    </div>
                  )}
                  <span className="font-semibold text-grey-500">{company.name}</span>
                </div>
              </td>
              <td className="px-5 py-3 font-medium text-grey-500">{formatNum(company.followers)}</td>
              <td className="px-5 py-3 font-medium text-grey-500">{formatNum(company.employeeCount)}</td>
              <td className="px-5 py-3 font-medium text-grey-500">{company.engagement?.engagementRate ?? 0}%</td>
              <td className="px-5 py-3 font-medium text-grey-500">{formatNum(company.engagement?.avgLikes ?? 0)}</td>
              <td className="px-5 py-3 font-medium text-grey-500">{company.engagement?.postsPerMonth ?? 0}/mo</td>
              <td className="px-5 py-3 text-xs text-grey-300">&mdash;</td>
            </tr>

            {/* Competitor rows */}
            {competitors.map((comp, idx) => {
              const diff = comp.followers - company.followers;
              const diffText = formatDiff(diff, tc.moreFollowers, tc.fewerFollowers);
              const isPositive = diff >= 0;

              return (
                <tr
                  key={comp.slug}
                  className={`border-b border-grey-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-grey-50/30'}`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      {comp.logo ? (
                        <img
                          src={proxyImg(comp.logo)}
                          alt={comp.name}
                          className="w-8 h-8 rounded-full object-cover border border-grey-50"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-grey-50 flex items-center justify-center text-xs font-bold text-grey-300">
                          {comp.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-grey-500">{comp.name}</span>
                        {comp.industry && (
                          <p className="text-xs text-grey-300 mt-0.5">{comp.industry}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-grey-500">{formatNum(comp.followers)}</td>
                  <td className="px-5 py-3 text-grey-500">{formatNum(comp.employeeCount)}</td>
                  <td className="px-5 py-3 text-grey-500">{comp.engagement?.engagementRate ?? 0}%</td>
                  <td className="px-5 py-3 text-grey-500">{formatNum(comp.engagement?.avgLikes ?? 0)}</td>
                  <td className="px-5 py-3 text-grey-500">{comp.engagement?.postsPerMonth ?? 0}/mo</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? 'text-error' : 'text-success'
                      }`}
                    >
                      {diffText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
