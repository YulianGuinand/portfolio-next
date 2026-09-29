import Dock from "@/components/Dock/Dock";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import PageTransition from "@/components/PageTransition/PageTransition";
import { getGlobalSettings, getStrapiMediaUrl } from "@/lib/strapi";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Urbanist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#131313",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalSettings();
  const siteName = global?.siteName || "Yulian Guinand";
  const defaultTitle =
    global?.defaultSeoTitle ||
    `${siteName} — Développeur Web & Applications | Besançon & Franche-Comté`;
  const defaultDescription =
    global?.defaultSeoDescription ||
    "Concepteur développeur web indépendant en Bourgogne-Franche-Comté. Création d'applications métier, SaaS et sites sur-mesure performants à Besançon, Dijon et Belfort.";
  const ogImageUrl = global?.defaultOgImage
    ? getStrapiMediaUrl(global.defaultOgImage)
    : "https://yulianguinand.fr/site-icon.png";

  return {
    metadataBase: new URL("https://yulianguinand.fr"),
    alternates: {
      canonical: "/",
    },
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: [
      siteName,
      "Développeur Web",
      "Développeur Web Besançon",
      "Développeur Bourgogne-Franche-Comté",
      "Création site internet Besançon",
      "Développeur FullStack",
      "Développeur Freelance Doubs",
      "Applications Web sur-mesure",
      "SaaS",
      "Next.js",
      "TypeScript",
      "Golang",
      "PostgreSQL",
      "Architecture Web",
      "Solutions Digitales",
      "Besançon",
      "Dijon",
      "Belfort",
      "Bourgogne-Franche-Comté",
      "France",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://yulianguinand.fr",
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
      card: "summary_large_image",
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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
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
  const siteName = global?.siteName || "Yulian Guinand";
  const siteBrand = global?.siteBrand || "Y. Guinand";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://yulianguinand.fr/#person",
        name: siteName,
        jobTitle: "Concepteur & Développeur Web Fullstack",
        url: "https://yulianguinand.fr",
        sameAs: [
          "https://github.com/YulianGuinand",
          "https://www.linkedin.com/in/yulian-guinand/",
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Golang",
          "PHP",
          "PostgreSQL",
          "C#",
          "Web Architecture",
          "Strapi",
          "Développement SaaS",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://yulianguinand.fr/#business",
        name: `${siteName} — Développement Web & Solutions Digitales`,
        url: "https://yulianguinand.fr",
        logo: "https://admin.yulianguinand.fr/uploads/site_icon_57a1c1153d.png",
        image: "https://admin.yulianguinand.fr/uploads/site_icon_57a1c1153d.png",
        description:
          "Création de sites internet sur-mesure, refonte et développement d'applications web et plateformes SaaS en Bourgogne-Franche-Comté (Besançon, Dijon, Belfort).",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Besançon",
          postalCode: "25000",
          addressRegion: "Bourgogne-Franche-Comté",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 47.2378,
          longitude: 6.0241,
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Bourgogne-Franche-Comté",
          },
          {
            "@type": "City",
            name: "Besançon",
          },
          {
            "@type": "City",
            name: "Dijon",
          },
          {
            "@type": "City",
            name: "Belfort",
          },
          {
            "@type": "AdministrativeArea",
            name: "Doubs",
          },
        ],
        sameAs: [
          "https://github.com/YulianGuinand",
          "https://www.linkedin.com/in/yulian-guinand/",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services de développement web et logiciel",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Création et refonte de site internet vitrine et d'entreprise",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Développement d'applications web et plateformes SaaS sur-mesure",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Architecture logicielle et développement d'APIs performantes",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${urbanist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
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
