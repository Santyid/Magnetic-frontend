import type { CreatorSummary } from '../../types';
import { useTranslation } from '../../i18n/LanguageContext';

interface CreatorCardProps {
  creator: CreatorSummary;
  onViewProfile: (creatorId: string) => void;
}

function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

export default function CreatorCard({ creator, onViewProfile }: CreatorCardProps) {
  const t = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-grey-50 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      {/* Avatar */}
      <div className="relative mb-3">
        {creator.profilePictureUrl ? (
          <img
            src={creator.profilePictureUrl}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
            {creator.name?.charAt(0) || '?'}
          </div>
        )}

        {/* Verified badge */}
        {creator.isVerified && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Name & Username */}
      <h3 className="text-sm font-medium text-grey-500 truncate w-full">{creator.name}</h3>
      <p className="text-xs text-grey-300 truncate w-full">@{creator.username}</p>

      {/* Platform badge */}
      <div className="mt-2">
        {creator.platform === 'instagram' ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-pink-50 text-pink-600">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </span>
        ) : creator.platform === 'tiktok' ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-grey-800 text-white">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.77-1.47V6.69h3.77z" />
            </svg>
            TikTok
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-50 text-blue-600">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mt-3 text-xs">
        <div>
          <p className="font-semibold text-grey-500">{formatFollowers(creator.followersCount)}</p>
          <p className="text-grey-300">{t.creators.followers}</p>
        </div>
        <div>
          <p className="font-semibold text-grey-500">{creator.engagementRate.toFixed(1)}%</p>
          <p className="text-grey-300">ER</p>
        </div>
      </div>

      {/* Categories */}
      {creator.categories && creator.categories.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 justify-center">
          {creator.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary-50 text-primary-600"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* View Profile Button */}
      <button
        onClick={() => onViewProfile(creator.id)}
        className="mt-4 w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        {t.creators.viewProfile}
      </button>
    </div>
  );
}
