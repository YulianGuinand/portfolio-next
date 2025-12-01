"use client";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Architecture Hybride</p>
          <h1>Association Manager</h1>

          <a
            href="/project/associations-manager/AP3-CDC.pdf"
            target="_blank"
            className="project-link"
          >
            Voir le cahier des charges <span aria-hidden="true">→</span>
          </a>

          <a
            href="/project/associations-manager/AP3-CDF.pdf"
            target="_blank"
            className="project-link"
          >
            Voir le cahier des charges fonctionnel{" "}
            <span aria-hidden="true">→</span>
          </a>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/competia/competia-project-1.png" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Une solution de gestion centralisée pour associations combinant la
              puissance d'une application lourde et la flexibilité du web.
            </h3>
          </div>
          <div className="details">
            <h3>
              Le dashboard desktop permet le pilotage administratif, tandis que
              l'API dédiée gère la persistance des données et l'automatisation
              des formulaires complexes.
            </h3>
          </div>

          <div className="details">
            <p>Cycle</p>
            <h3>2025</h3>
          </div>

          <div className="details">
            <p>Forme</p>
            <h3>Application Lourde & API</h3>
          </div>

          <div className="details">
            <p>Technologies</p>
            <h3>C# / WPF / ASP.NET / Laravel </h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Projet Académique (BTS SIO)</h3>
          </div>
        </Copy>
      </section>

      <section className="project-images">
        <div className="project-images-container">
          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-2.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-3.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-4.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-5.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-6.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-7.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/competia/competia-project-8.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Développement Fullstack</p>
            <h3>Yulian Guinand</h3>
          </div>

          <div className="details">
            <p>Interface</p>
            <h3>NextJs & Typescript / Golang & Postgres</h3>
          </div>

          <div className="details">
            <p>Production</p>
            <h3>Fullstack REST-API</h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Auto-Entreprise</h3>
          </div>
        </Copy>
      </section>

      <section>
        <a href="/engagement-leucemie" className="next-project">
          <Copy animateOnScroll={true}>
            <p style={{ marginBottom: "1rem" }}>06 - 06</p>
            <h2>Suivant</h2>
          </Copy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <img src="/project/competia/next-project.jpg" alt="" />
            </div>
          </div>

          <Copy animateOnScroll={true}>
            <h3>Engagement Leucémie</h3>
          </Copy>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
