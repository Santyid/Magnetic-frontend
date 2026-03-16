import { useState, useEffect } from 'react';
import { useTranslation } from '../../../i18n/LanguageContext';
import { proposalsAPI } from '../../../services/api';
import type { ProposalListItem } from '../../../types';
import ProposalCard from '../../../components/proposals/ProposalCard';
import CreateProposalModal from '../../../components/proposals/CreateProposalModal';
import { Skeleton } from '../../../components/ui/Skeleton';
import toast from 'react-hot-toast';

export default function Proposals() {
  const t = useTranslation();
  const tp = t.proposals;

  const [proposals, setProposals] = useState<ProposalListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await proposalsAPI.list();
      setProposals(data);
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await proposalsAPI.delete(deleteId);
      setProposals((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success(tp.deleted);
    } catch {
      toast.error(t.common.error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCreated = (id: string) => {
    setShowCreate(false);
    load();
    // Navigate to detail for polling — optionally auto-navigate
    window.location.href = `/admin/proposals/${id}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-grey-500">{tp.title}</h1>
          <p className="text-sm text-grey-300 mt-1">{tp.subtitle}</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 4v16m8-8H4" />
          </svg>
          {tp.newProposal}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-grey-50 p-5">
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-full mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-8 rounded" />
                <Skeleton className="h-5 w-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-white-700 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-grey-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-grey-500 font-semibold mb-1">{tp.noProposals}</p>
          <p className="text-sm text-grey-300 mb-6">{tp.noProposalsHint}</p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            {tp.newProposal}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {proposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <CreateProposalModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />
      )}

      {/* Delete Confirm Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-base font-semibold text-grey-500 mb-2">{tp.deleteConfirm}</h3>
            <p className="text-sm text-grey-300 mb-6">{tp.deleteConfirmMessage}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-grey-300 border border-grey-50 rounded-lg hover:bg-white-700 transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-error hover:bg-error/90 rounded-lg transition-colors"
              >
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
