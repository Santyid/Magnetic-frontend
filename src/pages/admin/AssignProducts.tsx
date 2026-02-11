import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { useTranslation } from '../../i18n/LanguageContext';
import { Skeleton } from '../../components/ui/Skeleton';
import { usersAPI, productsAPI } from '../../services/api';
import type { User, Product, UserProduct } from '../../types';

export default function AssignProducts() {
  const t = useTranslation();
  const [searchParams] = useSearchParams();
  const preselectedUserId = searchParams.get('user');

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>(preselectedUserId || '');
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Assign form state
  const [assignForm, setAssignForm] = useState({
    productId: '',
    externalUserId: '',
    customDomain: '',
  });
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersData, productsData] = await Promise.all([
          usersAPI.getAll(),
          productsAPI.getAllProducts().catch(() => [] as Product[]),
        ]);
        setUsers(usersData.filter((u) => !u.isAdmin));
        setProducts(productsData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadUserProducts(selectedUserId);
    } else {
      setUserProducts([]);
    }
  }, [selectedUserId]);

  const loadUserProducts = async (userId: string) => {
    setLoadingProducts(true);
    try {
      const data = await usersAPI.getProducts(userId);
      setUserProducts(data);
    } catch (err) {
      setUserProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };


  const assignedProductIds = userProducts.map((up) => up.product?.id || up.productId);
  const availableProducts = products.filter((p) => !assignedProductIds.includes(p.id));
  const selectedProduct = products.find((p) => p.id === assignForm.productId);
  const isAdvocates = selectedProduct?.name === 'Advocates';

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !assignForm.productId || !assignForm.externalUserId) return;

    setAssigning(true);
    try {
      await productsAPI.assignProduct(selectedUserId, {
        productId: assignForm.productId,
        externalUserId: assignForm.externalUserId,
        customDomain: isAdvocates ? assignForm.customDomain : undefined,
      });
      setAssignForm({ productId: '', externalUserId: '', customDomain: '' });
      await loadUserProducts(selectedUserId);
      toast.success(t.admin.productAssigned);
    } catch (err: unknown) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message;
      toast.error(msg || t.common.error);
    } finally {
      setAssigning(false);
    }
  };

  const handleRemove = async (userProductId: string) => {
    try {
      await productsAPI.removeUserProduct(userProductId);
      await loadUserProducts(selectedUserId);
      toast.success(t.admin.productRemoved);
    } catch (err: unknown) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message;
      toast.error(msg || t.common.error);
    }
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-56 mb-6" />
        <div className="bg-white rounded-lg border border-grey-50 p-6 mb-6">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-9 w-full max-w-md rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-grey-50">
            <div className="px-6 py-4 border-b border-grey-50">
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-grey-50">
            <div className="px-6 py-4 border-b border-grey-50">
              <Skeleton className="h-5 w-44" />
            </div>
            <div className="p-6 space-y-4">
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-grey-500">{t.admin.assignProducts}</h1>
      </div>

      {/* User selector */}
      <div className="bg-white rounded-lg border border-grey-50 p-6 mb-6">
        <label className="block text-sm font-medium text-grey-400 mb-2">{t.admin.selectUser}</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="">{t.admin.selectUser}...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Products */}
          <div className="bg-white rounded-lg border border-grey-50">
            <div className="px-6 py-4 border-b border-grey-50">
              <h2 className="text-lg font-semibold text-grey-500">{t.admin.assignedProducts}</h2>
            </div>

            {loadingProducts ? (
              <div className="p-6 text-center text-sm text-grey-300">{t.common.loading}</div>
            ) : userProducts.length === 0 ? (
              <div className="p-6 text-center text-sm text-grey-300">{t.admin.noAssignedProducts}</div>
            ) : (
              <div className="divide-y divide-grey-50">
                {userProducts.map((up) => (
                  <div key={up.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-grey-500">{up.product?.name || 'Product'}</p>
                        {up.productEmail && up.enableMetrics ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-success/20 text-success">{t.metrics.connected}</span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white-700 text-grey-300">{t.metrics.disconnected}</span>
                        )}
                      </div>
                      <p className="text-xs text-grey-300">ID: {up.externalUserId}</p>
                      {up.customDomain && (
                        <p className="text-xs text-secondary-500">{up.customDomain}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(up.id)}
                      className="px-3 py-1.5 text-xs font-medium text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      {t.admin.remove}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assign New Product */}
          <div className="bg-white rounded-lg border border-grey-50">
            <div className="px-6 py-4 border-b border-grey-50">
              <h2 className="text-lg font-semibold text-grey-500">{t.admin.availableProducts}</h2>
            </div>

            {availableProducts.length === 0 ? (
              <div className="p-6 text-center text-sm text-grey-300">
                {t.admin.noAssignedProducts === t.admin.noAssignedProducts ? 'All products assigned' : ''}
              </div>
            ) : (
              <form onSubmit={handleAssign} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.products}</label>
                  <select
                    value={assignForm.productId}
                    onChange={(e) => setAssignForm({ ...assignForm, productId: e.target.value })}
                    className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    required
                  >
                    <option value="">-- {t.admin.products} --</option>
                    {availableProducts.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.externalUserId}</label>
                  <input
                    type="text"
                    value={assignForm.externalUserId}
                    onChange={(e) => setAssignForm({ ...assignForm, externalUserId: e.target.value })}
                    className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="user-external-id-123"
                    required
                  />
                </div>

                {isAdvocates && (
                  <div>
                    <label className="block text-sm font-medium text-grey-400 mb-1">{t.admin.customDomain}</label>
                    <input
                      type="text"
                      value={assignForm.customDomain}
                      onChange={(e) => setAssignForm({ ...assignForm, customDomain: e.target.value })}
                      className="w-full px-3 py-2 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      placeholder="empresa.advocates.com"
                    />
                    <p className="text-xs text-grey-100 mt-1">{t.admin.customDomainHint}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={assigning || !assignForm.productId || !assignForm.externalUserId}
                  className="w-full px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
                >
                  {assigning ? t.common.loading : t.admin.assign}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
