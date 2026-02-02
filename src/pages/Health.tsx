import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';
import { healthAPI } from '../services/api';
import magneticLogo from '../assets/images/Isologo-Blue.png';

interface BackendHealth {
  status: string;
  timestamp: string;
  service: string;
  uptime: number;
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

export default function Health() {
  const t = useTranslation();
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [backendError, setBackendError] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkHealth = useCallback(async () => {
    setChecking(true);
    setBackendError(false);
    try {
      const data = await healthAPI.check();
      setBackendHealth(data);
    } catch {
      setBackendError(true);
      setBackendHealth(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const StatusBadge = ({ ok, loading }: { ok: boolean; loading: boolean }) => {
    if (loading) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white-700 text-grey-300">
          <span className="w-2 h-2 rounded-full bg-grey-100 animate-pulse" />
          {t.health.checking}
        </span>
      );
    }
    return ok ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-success/20 text-success">
        <span className="w-2 h-2 rounded-full bg-success" />
        {t.health.operational}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-error/20 text-error">
        <span className="w-2 h-2 rounded-full bg-error" />
        {t.health.down}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white-700 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={magneticLogo} alt="Magnetic" className="h-10" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-grey-500 text-center mb-6">
          {t.health.title}
        </h1>

        {/* Cards */}
        <div className="space-y-3">
          {/* Frontend */}
          <div className="bg-white rounded-lg border border-grey-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grey-500">{t.health.frontend}</p>
              <p className="text-xs text-grey-300">Magnetic Suite</p>
            </div>
            <StatusBadge ok={true} loading={false} />
          </div>

          {/* Backend */}
          <div className="bg-white rounded-lg border border-grey-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-grey-500">{t.health.backend}</p>
                <p className="text-xs text-grey-300">
                  {backendHealth ? backendHealth.service : 'API'}
                </p>
              </div>
              <StatusBadge ok={!backendError && !!backendHealth} loading={checking} />
            </div>

            {backendHealth && (
              <div className="mt-3 pt-3 border-t border-grey-50 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-grey-300">{t.health.uptime}</p>
                  <p className="text-sm text-grey-500 font-medium">
                    {formatUptime(backendHealth.uptime)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-grey-300">{t.health.timestamp}</p>
                  <p className="text-sm text-grey-500 font-medium">
                    {new Date(backendHealth.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Refresh button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={checkHealth}
            disabled={checking}
            className="px-4 py-2 text-sm font-medium text-grey-400 bg-white border border-grey-50 hover:bg-white-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {t.health.refresh}
          </button>
        </div>
      </div>
    </div>
  );
}
