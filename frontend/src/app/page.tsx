import LiveClockUpdate from "@/components/LiveClockUpdate/LiveClockUpdate";
import SplineScene from "@/components/SplineScene/SplineScene";
import { getGlobalSettings } from "@/lib/strapi";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Développeur Web & Applications | Besançon & Franche-Comté",
  description:
    "Concepteur développeur web indépendant en Bourgogne-Franche-Comté. Création d'applications métier, SaaS et sites sur-mesure performants à Besançon, Dijon et Belfort. Parlons de votre projet.",
  alternates: {
    canonical: "https://yulianguinand.fr",
  },
  openGraph: {
    title:
      "Développeur Web & Applications | Besançon & Franche-Comté — Yulian Guinand",
    description:
      "Concepteur développeur web indépendant en Bourgogne-Franche-Comté. Création d'applications métier, SaaS et sites sur-mesure performants à Besançon, Dijon et Belfort.",
    url: "https://yulianguinand.fr",
  },
};

export default async function Home() {
  const global = await getGlobalSettings();

  const heroTitle =
    global?.heroTitle ||
    "Développeur Web & Concepteur d'Applications en Bourgogne-Franche-Comté";
  const heroSubtitle =
    global?.heroSubtitle ||
    "Création de sites internet sur-mesure, refonte et plateformes SaaS à Besançon, Dijon et Belfort";

  return (
    <>
      <div className="home-hero-wrap">
        <SplineScene sceneUrl="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />

        <header className="hero-header">
          <h1>{heroTitle}</h1>
          <p className="hero-subtitle">{heroSubtitle}</p>
        </header>

        <div className="live-clock" aria-label="Heure locale en direct">
          <LiveClockUpdate />
        </div>
      </div>

      <div className="container home-content">
        <section
          id="services"
          className="home-section"
          aria-labelledby="services-title"
        >
          <h2 id="services-title" className="home-section-title">
            Des architectures web pensées pour la croissance de votre entreprise
          </h2>
          <div className="home-services-grid">
            <article className="home-service-card">
              <h3>Création &amp; Refonte de Sites Internet</h3>
              <p>
                Conception de sites vitrines et plateformes d&apos;entreprise
                taillés pour convertir vos visiteurs en prospects qualifiés.
                Code propre, temps de chargement ultra-rapides et optimisation
                SEO naturelle pour surpasser vos concurrents sur Besançon et la
                Bourgogne-Franche-Comté.
              </p>
            </article>

            <article className="home-service-card">
              <h3>Applications Métier &amp; Solutions SaaS</h3>
              <p>
                Digitalisation de vos processus internes, portails clients
                interactifs et tableaux de bord analytiques. Des architectures
                fiables (Next.js, TypeScript, Golang, PostgreSQL) capables
                d&apos;évoluer avec votre activité sans dette technique.
              </p>
            </article>

            <article className="home-service-card">
              <h3>Renfort Technique &amp; Collaboration Agences</h3>
              <p>
                Intervention en marque blanche ou en binôme technique aux côtés
                des équipes marketing et agences de communication de Besançon,
                Dijon, Montbéliard et Belfort.
              </p>
            </article>
          </div>
        </section>

        <section className="home-section" aria-labelledby="local-title">
          <h2 id="local-title" className="home-section-title">
            Un accompagnement technique de proximité au cœur du Doubs
          </h2>
          <div className="home-local-box">
            <p>
              Collaborer avec un développeur indépendant en
              Bourgogne-Franche-Comté, c&apos;est l&apos;assurance
              d&apos;échanges directs, fluides et transparents. Implanté dans le
              bassin bisontin, j&apos;interviens auprès des entreprises,
              startups et porteurs de projet pour auditer vos besoins, cadrer
              vos spécifications techniques et vous rencontrer lors des étapes
              clés de vos réalisations.
            </p>
            <p>
              Chaque solution est développée sur-mesure pour allier excellence
              visuelle, vélocité technique et positionnement organique pérenne
              sur vos mots-clés stratégiques.
            </p>

            <div
              className="home-local-tags"
              aria-label="Zone d'intervention géographique"
            >
              <span className="home-local-tag">Besançon (25000)</span>
              <span className="home-local-tag">Dijon (21000)</span>
              <span className="home-local-tag">Belfort &amp; Montbéliard</span>
              <span className="home-local-tag">Bourgogne-Franche-Comté</span>
            </div>

            <div className="home-cta-wrap">
              <Link href="/work" className="home-cta-btn primary">
                <span>Découvrir les réalisations</span>
                <FaArrowRight size="11px" />
              </Link>
              <a
                href="mailto:yulianguinand@etik.com"
                className="home-cta-btn secondary"
                aria-label="Contacter Yulian Guinand par email pour un projet web"
              >
                <FaEnvelope size="12px" />
                <span>Échanger sur votre projet</span>
              </a>
            </div>
          </div>
        </section>

        <div className="white-space" aria-hidden="true"></div>
      </div>
    </>
  );
}
