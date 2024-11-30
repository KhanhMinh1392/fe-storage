'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AuthLayout = dynamic(() => import('@/components/layouts/auth-layout'), { ssr: false });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme={'dark'}>
          <Suspense fallback="Loading...">
            <AuthLayout>{children}</AuthLayout>
          </Suspense>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
