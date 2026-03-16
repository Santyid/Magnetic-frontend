import { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { proposalsAPI } from '../../services/api';
import type { CreateProposalDto, ProposalPlatform } from '../../types';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  onCreated: (id: string) => void;
}

const OPTIONAL_PLATFORMS: { key: ProposalPlatform; label: string }[] = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'twitter', label: 'Twitter / X' },
];

export default function CreateProposalModal({ onClose, onCreated }: Props) {
  const t = useTranslation();
  const tp = t.proposals;

  const [companyName, setCompanyName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<ProposalPlatform[]>(['linkedin']);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const togglePlatform = (platform: ProposalPlatform) => {
    if (platform === 'linkedin') return;
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const canSubmit = !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const dto: CreateProposalDto = {
      platforms: selectedPlatforms,
      ...(companyName.trim() && { companyName: companyName.trim() }),
      ...(selectedPlatforms.includes('linkedin') && linkedinUrl && { linkedinCompanyUrl: linkedinUrl.trim() }),
      ...(selectedPlatforms.includes('facebook') && facebookUrl && { facebookUrl: facebookUrl.trim() }),
      ...(selectedPlatforms.includes('instagram') && instagramHandle && { instagramHandle: instagramHandle.trim() }),
      ...(selectedPlatforms.includes('tiktok') && tiktokHandle && { tiktokHandle: tiktokHandle.trim() }),
      ...(selectedPlatforms.includes('twitter') && twitterHandle && { twitterHandle: twitterHandle.trim() }),
    };

    setSubmitting(true);
    try {
      const proposal = await proposalsAPI.create(dto);
      toast.success(tp.form.successMessage);
      onCreated(proposal.id);
    } catch {
      toast.error(tp.form.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-grey-50">
          <h2 className="text-lg font-semibold text-grey-500">{tp.form.title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-grey-100 hover:text-grey-300 rounded-lg hover:bg-white-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nombre de empresa */}
          <div>
            <label className="block text-sm font-medium text-grey-500 mb-1.5">
              Nombre de empresa
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej: Bancolombia, Fluvip..."
              className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
            />
            <p className="text-xs text-grey-100 mt-1">Opcional si pones la URL de LinkedIn</p>
          </div>

          {/* LinkedIn (obligatorio) */}
          <div>
            <label className="block text-sm font-medium text-grey-500 mb-1.5">
              LinkedIn <span className="text-primary-600">*</span>
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder={tp.form.linkedinUrlPlaceholder}
              className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
            />
            <p className="text-xs text-grey-100 mt-1">Opcional si pones el nombre de empresa</p>
          </div>

          {/* Otras plataformas (opcionales) */}
          <div>
            <label className="block text-sm font-medium text-grey-500 mb-1.5">{tp.form.platforms}</label>
            <p className="text-xs text-grey-300 mb-3">{tp.form.platformsHint}</p>

            {OPTIONAL_PLATFORMS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => togglePlatform(key)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedPlatforms.includes(key)
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-grey-100 bg-white'
                  }`}
                >
                  {selectedPlatforms.includes(key) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-grey-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Facebook fields */}
          {selectedPlatforms.includes('facebook') && (
            <div className="pl-4 border-l-2 border-grey-50">
              <label className="block text-sm font-medium text-grey-500 mb-1.5">{tp.form.facebookUrl}</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder={tp.form.facebookUrlPlaceholder}
                className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
              />
            </div>
          )}

          {/* Instagram field */}
          {selectedPlatforms.includes('instagram') && (
            <div className="pl-4 border-l-2 border-grey-50">
              <label className="block text-sm font-medium text-grey-500 mb-1.5">{tp.form.instagramHandle}</label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder={tp.form.instagramHandlePlaceholder}
                className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
              />
            </div>
          )}

          {/* TikTok field */}
          {selectedPlatforms.includes('tiktok') && (
            <div className="pl-4 border-l-2 border-grey-50">
              <label className="block text-sm font-medium text-grey-500 mb-1.5">{tp.form.tiktokHandle}</label>
              <input
                type="text"
                value={tiktokHandle}
                onChange={(e) => setTiktokHandle(e.target.value)}
                placeholder={tp.form.tiktokHandlePlaceholder}
                className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
              />
            </div>
          )}

          {/* Twitter/X field */}
          {selectedPlatforms.includes('twitter') && (
            <div className="pl-4 border-l-2 border-grey-50">
              <label className="block text-sm font-medium text-grey-500 mb-1.5">Usuario de Twitter / X</label>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="@usuario o https://x.com/usuario"
                className="w-full px-3 py-2.5 text-sm border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 text-grey-500 placeholder-grey-100"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-grey-300 border border-grey-50 rounded-lg hover:bg-white-700 transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? tp.form.submitting : tp.form.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
