import { useNavigate } from 'react-router-dom';
import type { ProposalListItem } from '../../types';

interface Props {
  proposal: ProposalListItem;
  onDelete: (id: string) => void;
}


function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'linkedin':
      return (
        <span title="LinkedIn" className="inline-flex w-5 h-5 rounded items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0A66C2' }}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </span>
      );
    case 'facebook':
      return (
        <span title="Facebook" className="inline-flex w-5 h-5 rounded items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1877F2' }}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </span>
      );
    case 'instagram':
      return (
        <span title="Instagram" className="inline-flex w-5 h-5 rounded items-center justify-center flex-shrink-0" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </span>
      );
    case 'tiktok':
      return (
        <span title="TikTok" className="inline-flex w-5 h-5 rounded items-center justify-center flex-shrink-0 bg-black">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
          </svg>
        </span>
      );
    case 'twitter':
      return (
        <span title="Twitter / X" className="inline-flex w-5 h-5 rounded items-center justify-center flex-shrink-0 bg-black">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </span>
      );
    default:
      return null;
  }
}

function CompanyAvatar({ name, logo }: { name: string; logo?: string }) {
  const initials = name
    .split(/[\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-12 h-12 rounded-lg object-contain bg-white-700 border border-grey-50"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
      <span className="text-primary-600 font-bold text-sm">{initials}</span>
    </div>
  );
}

function extractCompanyName(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('company');
    if (idx >= 0 && parts[idx + 1]) {
      return parts[idx + 1]
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  } catch {}
  return url;
}

export default function ProposalCard({ proposal, onDelete }: Props) {
  const navigate = useNavigate();

  const isClickable = proposal.status === 'done';
  const displayName = proposal.companyName || extractCompanyName(proposal.linkedinCompanyUrl ?? '');

  return (
    <div
      className={`bg-white rounded-lg border border-grey-50 p-5 transition-all ${
        isClickable ? 'cursor-pointer hover:shadow-md hover:border-grey-100' : ''
      }`}
      onClick={isClickable ? () => navigate(`/admin/proposals/${proposal.id}`) : undefined}
    >
      <div className="flex items-start gap-3">
        {/* Company avatar / logo */}
        <CompanyAvatar name={displayName} logo={proposal.companyLogo} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Top row: name + date + delete */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-grey-500 truncate leading-tight">{displayName}</p>
            <div className="flex items-center gap-1.5 shrink-0">
              <p className="text-xs text-grey-100">
                {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(proposal.id);
                }}
                className="p-1 text-grey-100 hover:text-error hover:bg-error/5 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Industry + description */}
          {proposal.companyIndustry && (
            <p className="text-xs font-medium text-grey-300 mt-0.5">{proposal.companyIndustry}</p>
          )}
          {proposal.companyDescription && (
            <p className="text-xs text-grey-100 mt-1 line-clamp-2 leading-relaxed">{proposal.companyDescription}</p>
          )}
          {!proposal.companyIndustry && !proposal.companyDescription && (
            <p className="text-xs text-grey-100 truncate mt-0.5">{proposal.linkedinCompanyUrl}</p>
          )}

          {/* Platform logos */}
          <div className="flex gap-1 mt-2.5">
            {proposal.platforms.map((p) => (
              <PlatformIcon key={p} platform={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
