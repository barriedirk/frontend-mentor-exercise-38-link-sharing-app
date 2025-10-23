import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';

const testQueryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HashRouter>
      <QueryClientProvider client={testQueryClient}>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </QueryClientProvider>
    </HashRouter>
  );
}
