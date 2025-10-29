import { useEffect, useState } from 'react';
import { testApi } from '@src/services/testApi';
import Icon from '@src/components/icon/Icon';

interface BackendReadyProps {
  children: React.ReactNode;
}

const RELOAD_DELAY = 120_000; // 2 minutes
const SHOW_INACTIVITY_DELAY = 3_000; // 3 seconds
const RETRY_INTERVAL = 20_000; // 20 seconds between checks

export default function BackendReady({ children }: BackendReadyProps) {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [showInactivityMessage, setShowInactivityMessage] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let retryTimer: NodeJS.Timeout | null = null;

    const reloadTimer = setTimeout(() => {
      console.warn('Backend still not ready — reloading...');
      window.location.reload();
    }, RELOAD_DELAY);

    const inactivityTimer = setTimeout(() => {
      setShowInactivityMessage(true);
    }, SHOW_INACTIVITY_DELAY);

    async function checkBackend() {
      try {
        const message = await testApi();
        console.log('Backend ready:', message);

        if (!mounted) return;

        setIsBackendReady(true);

        clearTimeout(reloadTimer);
        clearTimeout(inactivityTimer);
        if (retryTimer) clearTimeout(retryTimer);
      } catch (error) {
        console.warn('Backend not ready yet, retrying...', error);

        if (!mounted) return;

        retryTimer = setTimeout(() => {
          setRetryCount((c) => c + 1);
          checkBackend();
        }, RETRY_INTERVAL);
      }
    }

    checkBackend();

    return () => {
      mounted = false;
      clearTimeout(reloadTimer);
      clearTimeout(inactivityTimer);
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  if (isBackendReady) {
    return <>{children}</>;
  }

  if (!showInactivityMessage) {
    return (
      <div className="flex justify-center items-center h-full text-center mt-10">
        <p className="text-preset-3-bold text-grey-950">
          Checking backend connection...
        </p>
      </div>
    );
  }

  return (
    <div className="backend-inactivity-wrapper flex justify-center items-center flex-col h-full text-center mt-5">
      <header className="auth-header">
        <Icon name="LogoDevlinksLarge" />
      </header>

      <img
        src="/assets/images/the-white-cat.png"
        className="w-auto h-[120px] mt-10"
        alt="logo The Black Cat"
      />

      <div className="mt-5 max-w-[480px] px-4">
        <h1 className="text-center text-preset-1 text-black">
          Backend is waking up
        </h1>
        <p className="text-preset-3-semibold text-grey-950 mt-5">
          This project runs on Render’s free plan. When inactive, the backend
          goes to sleep and needs up to a minute to wake up.
        </p>
        <p className="text-preset-3-semibold text-grey-950 mt-5">
          Retrying connection (attempt {retryCount + 1})...
        </p>
        <p className="text-preset-3-semibold text-grey-950 mt-5">
          Please refresh the page if it doesn’t load after a minute.
        </p>
      </div>
    </div>
  );
}
