'use client';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const PrivateLayout = dynamic(() => import('@/components/layouts/private-layout'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const PublicLayout = dynamic(() => import('@/components/layouts/public-layout'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function AuthLayout({ children }: PropsWithChildren) {
  const token = getCookie('accessToken');
  const LayoutCpn = token ? PrivateLayout : PublicLayout;

  return <LayoutCpn>{children}</LayoutCpn>;
}
