"use client";
import Copy from "../../../components/Copy/Copy";
import Footer from "../../../components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Architecture FullStack</p>
          <h1>Competia</h1>
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
              Competia est une plateforme d’analyse de CV et d&aops;offres basée
              sur un ATS qui détecte les mots-clés manquants et propose des
              optimisations immédiates.
            </h3>
          </div>
          <div className="details">
            <h3>
              Deux portails : un pour les candidats afin d&apos;améliorer leur
              CV, un pour les coachs pour accompagner, corriger et gérer les
              offres. Simple, rapide et centralisé.
            </h3>
          </div>

          <div className="details">
            <p>Cycle</p>
            <h3>2025</h3>
          </div>

          <div className="details">
            <p>Forme</p>
            <h3>Application Web</h3>
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
