import type { CreatorProfile } from '../../types';
import { useTranslation } from '../../i18n/LanguageContext';

interface CreatorProfileModalProps {
  creator: CreatorProfile;
  onClose: () => void;
}

function formatFollowers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

function formatNumber(num: number | undefined): string {
  if (!num) return '—';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export default function CreatorProfileModal({ creator, onClose }: CreatorProfileModalProps) {
  const t = useTranslation();

  const stats = [
    { label: t.creators.followers, value: formatFollowers(creator.followersCount) },
    { label: t.creators.mediaCount, value: formatNumber(creator.mediaCount) },
    { label: t.creators.avgLikes, value: formatNumber(creator.avgLikes) },
    { label: t.creators.avgComments, value: formatNumber(creator.avgComments) },
    { label: t.creators.engagementRate, value: `${creator.engagementRate.toFixed(1)}%` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-grey-50">
          <div className="flex items-start gap-4">
            {creator.profilePictureUrl ? (
              <img
                src={creator.profilePictureUrl}
                alt={creator.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold flex-shrink-0">
                {creator.name?.charAt(0) || '?'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-grey-500 truncate">{creator.name}</h2>
                {creator.isVerified && (
                  <span className="flex-shrink-0 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-sm text-grey-300">@{creator.username}</p>
              {creator.biography && (
                <p className="text-sm text-grey-400 mt-1 line-clamp-2">{creator.biography}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 text-grey-300 hover:text-grey-500 rounded-lg hover:bg-white-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Categories */}
          {creator.categories && creator.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {creator.categories.map((cat) => (
                <span key={cat} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 text-primary-600">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="px-6 py-4 border-b border-grey-50">
          <div className="grid grid-cols-5 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-semibold text-grey-500">{stat.value}</p>
                <p className="text-[10px] text-grey-300 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator Details */}
        {(creator.interests?.length || creator.gender || creator.ageBucket) && (
          <div className="px-6 py-4 border-b border-grey-50">
            <h3 className="text-sm font-semibold text-grey-500 mb-3">{t.creators.details}</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {creator.gender && (
                <div className="flex items-center gap-1.5 text-grey-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="capitalize">{creator.gender}</span>
                </div>
              )}
              {creator.ageBucket && (
                <div className="flex items-center gap-1.5 text-grey-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{creator.ageBucket}</span>
                </div>
              )}
            </div>
            {creator.interests && creator.interests.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {creator.interests.map((interest) => (
                  <span key={interest} className="px-2 py-0.5 text-xs font-medium rounded-full bg-white-700 text-grey-400">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Link */}
        {creator.profileUrl && (
          <div className="px-6 py-3 border-b border-grey-50">
            <a
              href={creator.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {t.creators.viewOnFacebook}
            </a>
          </div>
        )}

        {/* Recent Media */}
        {creator.recentMedia && creator.recentMedia.length > 0 && (
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-grey-500 mb-3">{t.creators.recentMedia}</h3>
            <div className="grid grid-cols-3 gap-2">
              {creator.recentMedia.slice(0, 9).map((media) => (
                <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden bg-white-700">
                  {media.thumbnailUrl ? (
                    <img
                      src={media.thumbnailUrl}
                      alt={media.caption || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-grey-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex items-center gap-3 text-white text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {formatNumber(media.likeCount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {formatNumber(media.commentCount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
