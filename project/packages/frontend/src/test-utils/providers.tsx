import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const testQueryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HashRouter>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </HashRouter>
  );
}
