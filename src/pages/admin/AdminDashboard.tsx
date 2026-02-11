import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { Skeleton, SkeletonStatCard } from '../../components/ui/Skeleton';
import { usersAPI, productsAPI } from '../../services/api';
import type { User, Product } from '../../types';

export default function AdminDashboard() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersData, productsData] = await Promise.all([
          usersAPI.getAll(),
          productsAPI.getAllProducts().catch(() => [] as Product[]),
        ]);
        setUsers(usersData);
        setProducts(productsData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const nonAdminUsers = users.filter((u) => !u.isAdmin);
  const activeUsers = users.filter((u) => u.isActive);
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        <div className="bg-white rounded-lg border border-grey-50">
          <div className="px-6 py-4 border-b border-grey-50">
            <Skeleton className="h-6 w-40" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-3 border-b border-grey-50 last:border-0">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-grey-500">{t.admin.overview}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-grey-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grey-300 mb-1">{t.admin.totalUsers}</p>
              <p className="text-3xl font-bold text-grey-500">{nonAdminUsers.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-grey-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grey-300 mb-1">{t.admin.activeProducts}</p>
              <p className="text-3xl font-bold text-grey-500">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-grey-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grey-300 mb-1">{t.admin.status}</p>
              <p className="text-3xl font-bold text-success">{activeUsers.length} {t.admin.active.toLowerCase()}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg border border-grey-50">
        <div className="px-6 py-4 border-b border-grey-50 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-grey-500">{t.admin.recentUsers}</h2>
          <button
            onClick={() => navigate('/admin/users')}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {t.admin.userList} →
          </button>
        </div>
        <div className="divide-y divide-grey-50">
          {recentUsers.map((user) => (
            <div key={user.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-grey-500">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-grey-300">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user.isAdmin ? 'bg-secondary-50 text-secondary-500' : 'bg-white-700 text-grey-300'
                }`}>
                  {user.isAdmin ? t.admin.admin : t.admin.user}
                </span>
                <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-success' : 'bg-grey-100'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
