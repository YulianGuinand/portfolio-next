import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Urbanist, JetBrains_Mono } from 'next/font/google';
import Dock from '@/components/Dock/Dock';
import PageTransition from '@/components/PageTransition/PageTransition';
import { getGlobalSettings, getStrapiMediaUrl } from '@/lib/strapi';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#131313',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalSettings();
  const siteName = global?.siteName || 'Yulian Guinand';
  const defaultTitle = global?.defaultSeoTitle || `${siteName} — Développement Web & Solutions Digitales`;
  const defaultDescription =
    global?.defaultSeoDescription ||
    'Portfolio officiel de Yulian Guinand. Concepteur développeur web & architectures fullstack (Next.js, TypeScript, Golang, PHP, C#). BTS SIO option SLAM.';
  const ogImageUrl = global?.defaultOgImage
    ? getStrapiMediaUrl(global.defaultOgImage)
    : 'https://portfolio.yulianguinand.com/site-icon.png';

  return {
    metadataBase: new URL('https://portfolio.yulianguinand.com'),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: [
      siteName,
      'Développeur Web',
      'Développeur FullStack',
      'Next.js',
      'TypeScript',
      'Golang',
      'PostgreSQL',
      'BTS SIO',
      'SLAM',
      'Portfolio Développeur',
      'Architecture Web',
      'Solutions Digitales',
      'France',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://portfolio.yulianguinand.com',
      siteName: `${siteName} — Portfolio`,
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} Portfolio Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: ogImageUrl,
      apple: ogImageUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobalSettings();
  const siteName = global?.siteName || 'Yulian Guinand';
  const siteBrand = global?.siteBrand || 'Y. Guinand';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    jobTitle: 'Développeur Web Fullstack & Architecte Logiciel',
    url: 'https://portfolio.yulianguinand.com',
    sameAs: [
      'https://github.com/YulianGuinand',
      'https://www.linkedin.com/in/yulian-guinand/',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Golang',
      'PHP',
      'PostgreSQL',
      'C#',
      'Web Architecture',
      'Strapi',
    ],
  };

  return (
    <html lang="fr" className={`${urbanist.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Link
          href="/"
          className="site-brand"
          aria-label={`${siteBrand} — Accueil`}
        >
          {siteBrand}
        </Link>
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Dock items={global?.dockLinks || []} />
      </body>
    </html>
  );
}
