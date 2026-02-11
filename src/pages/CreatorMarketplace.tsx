import { useState, useEffect, useCallback } from 'react';
import type { AxiosError } from 'axios';
import { useTranslation } from '../i18n/LanguageContext';
import { creatorsAPI } from '../services/api';
import CreatorCard from '../components/creators/CreatorCard';
import CreatorProfileModal from '../components/creators/CreatorProfileModal';
import PlatformToggle from '../components/creators/PlatformToggle';
import type { CreatorSummary, CreatorProfile, CreatorPlatform } from '../types';
import toast from 'react-hot-toast';

export default function CreatorMarketplace() {
  const t = useTranslation();

  // Platform state
  const [platform, setPlatform] = useState<CreatorPlatform>('facebook');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState<CreatorSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Profile modal state
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = useCallback(
    async (query: string, append = false) => {
      if (!query.trim()) return;

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setCursor(undefined);
      }

      try {
        const result = await creatorsAPI.search({
          q: query.trim(),
          platform,
          limit: 20,
          cursor: append ? cursor : undefined,
        });

        if (append) {
          setCreators((prev) => [...prev, ...result.creators]);
        } else {
          setCreators(result.creators);
        }

        setCursor(result.paging.cursors?.after);
        setHasNextPage(result.paging.hasNextPage);
        setHasSearched(true);
      } catch (err: unknown) {
        const message = (err as AxiosError<{ message: string }>).response?.data?.message;
        if (message === 'CREATORS_RATE_LIMIT_EXCEEDED') {
          toast.error(t.creators.rateLimitError);
        } else if (message === 'META_API_ERROR') {
          toast.error(t.creators.metaApiError);
        } else if (message === 'TIKTOK_API_ERROR') {
          toast.error(t.creators.tiktokApiError);
        } else {
          toast.error(t.creators.errorSearch);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [cursor, platform, t],
  );

  // Trigger search when debounced query or platform changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery, platform]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewProfile = async (creatorId: string) => {
    setLoadingProfile(true);
    try {
      const profile = await creatorsAPI.getProfile(creatorId, platform);
      setSelectedCreator(profile);
    } catch {
      toast.error(t.creators.errorProfile);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePlatformChange = (newPlatform: CreatorPlatform) => {
    setPlatform(newPlatform);
    setCreators([]);
    setCursor(undefined);
    setHasSearched(false);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-grey-500">{t.creators.title}</h1>
          <p className="text-sm text-grey-300 mt-1">{t.creators.subtitle}</p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.66667}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.creators.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <PlatformToggle value={platform} onChange={handlePlatformChange} />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-grey-300 mt-3">{t.creators.loading}</p>
          </div>
        )}

        {/* Initial state - no search yet */}
        {!loading && !hasSearched && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm text-grey-300">{t.creators.searchHint}</p>
          </div>
        )}

        {/* No results */}
        {!loading && hasSearched && creators.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-grey-500">{t.creators.noResults}</p>
            <p className="text-xs text-grey-300 mt-1">{t.creators.noResultsHint}</p>
          </div>
        )}

        {/* Results grid */}
        {!loading && creators.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {creators.map((creator) => (
                <CreatorCard
                  key={`${creator.platform}-${creator.id}`}
                  creator={creator}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>

            {/* Load more */}
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleSearch(debouncedQuery, true)}
                  disabled={loadingMore}
                  className="px-6 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingMore ? t.creators.loadingMore : t.creators.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Loading profile overlay */}
      {loadingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 shadow-xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-grey-500">{t.creators.loading}</span>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}
    </div>
  );
}
