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

      {/* Facebook badge */}
      <div className="mt-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-50 text-blue-600">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </span>
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
