import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { useTranslation, useLanguage } from '../../i18n/LanguageContext';
import { Skeleton, SkeletonTableRow } from '../../components/ui/Skeleton';
import { usersAPI } from '../../services/api';
import type { User, CreateUserData } from '../../types';

interface UserModalProps {
  user?: User | null;
  onClose: () => void;
  onSave: (data: CreateUserData) => Promise<void>;
  t: ReturnType<typeof useTranslation>;
}

function UserModal({ user, onClose, onSave, t }: UserModalProps) {
  const [form, setForm] = useState<CreateUserData>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
    isAdmin: user?.isAdmin || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      if (user && !payload.password) {
        const { password: _, ...rest } = payload;
        await onSave(rest as CreateUserData);
      } else {
        await onSave(payload);
      }
      onClose();
    } catch (err: unknown) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message;
      setError(msg || t.common.error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-grey-50">
          <h2 className="text-lg font-semibold text-grey-500">
            {user ? t.admin.editUser : t.admin.createUser}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-sm text-error">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.email}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              disabled={!!user}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.firstName}</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.lastName}</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-400 mb-1">
              {t.admin.password} {user && <span className="text-grey-100 font-normal">(dejar vacío para no cambiar)</span>}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required={!user}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-grey-400 hover:text-grey-500"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
            >
              {saving ? t.common.loading : t.common.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Users() {
  const t = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalUser, setModalUser] = useState<User | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (data: CreateUserData) => {
    await usersAPI.create(data);
    await loadUsers();
    toast.success(t.admin.userCreated);
  };

  const handleUpdate = async (data: CreateUserData) => {
    if (!modalUser) return;
    await usersAPI.update(modalUser.id, data);
    await loadUsers();
    toast.success(t.admin.userUpdated);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await usersAPI.delete(deleteTarget.id);
    setDeleteTarget(null);
    await loadUsers();
    toast.success(t.admin.userDeleted);
  };

  const nonAdminUsers = users.filter((u) => !u.isAdmin);
  const filtered = nonAdminUsers.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-64 rounded-lg mb-4" />
        <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-white-700 border-b border-grey-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <th key={i} className="px-6 py-3"><Skeleton className="h-3 w-16" /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonTableRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-grey-500">{t.admin.userList}</h1>
        <button
          onClick={() => setModalUser(null)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 4v16m8-8H4" />
          </svg>
          {t.admin.createUser}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.admin.searchUsers}
          className="w-full max-w-sm px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-grey-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white-700 border-b border-grey-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-grey-300 uppercase">{t.admin.firstName}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-grey-300 uppercase">{t.admin.email}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-grey-300 uppercase">{t.admin.status}</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-grey-300 uppercase">{t.admin.createdAt}</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-grey-300 uppercase">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-grey-300">
                    {t.admin.noUsers}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-white-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-grey-500">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-grey-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive ? 'bg-success/20 text-success' : 'bg-white-700 text-grey-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-success' : 'bg-grey-100'}`} />
                        {user.isActive ? t.admin.active : t.admin.inactive}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-grey-300">
                      {new Date(user.createdAt).toLocaleDateString(
                        language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/admin/products?user=${user.id}`)}
                          className="p-2 text-grey-100 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                          title={t.admin.assignProducts}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setModalUser(user)}
                          className="p-2 text-grey-100 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                          title={t.admin.editUser}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(user)}
                          className="p-2 text-grey-100 hover:text-error rounded-lg hover:bg-error/10 transition-colors"
                          title={t.admin.deleteUser}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {modalUser !== undefined && (
        <UserModal
          user={modalUser}
          onClose={() => setModalUser(undefined)}
          onSave={modalUser ? handleUpdate : handleCreate}
          t={t}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-lg w-full max-w-sm mx-4 shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-grey-500 mb-2">{t.admin.confirmDeleteUser}</h3>
            <p className="text-sm text-grey-300 mb-6">{t.admin.confirmDeleteUserMessage}</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-grey-400 hover:text-grey-500"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-danger-500 hover:bg-danger-600 text-white text-sm font-medium rounded-lg"
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
