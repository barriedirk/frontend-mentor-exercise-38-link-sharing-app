import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';

const testQueryClient = new QueryClient();

export function AppProvidersNoRouter({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </QueryClientProvider>
  );
}
