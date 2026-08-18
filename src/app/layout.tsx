import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.title}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: siteConfig.url, title: `${siteConfig.name} — ${siteConfig.title}`, description: siteConfig.description, siteName: siteConfig.name },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar /><main>{children}</main><Footer /></body></html>;
}
