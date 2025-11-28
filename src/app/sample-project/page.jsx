"use client";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import "./sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Développement Fullstack</p>
          <h1>[Nom du Projet, ex: Intranet Pogo]</h1>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/sample-project-1.jpg" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Refonte complète de l'outil de gestion interne. Objectif :
              optimiser les flux de données et réduire le temps de chargement.
            </h3>
          </div>

          <div className="details">
            <p>Cycle</p>
            <h3>2024</h3>
          </div>

          <div className="details">
            <p>Forme</p>
            <h3>Application Web</h3>
          </div>

          <div className="details">
            <p>Technologies</p>
            <h3>Symfony / React</h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Studio-Pogo (ou "Projet École")</h3>
          </div>
        </Copy>
      </section>

      <section className="project-images">
        <div className="project-images-container">
          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-2.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-3.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-4.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-5.jpg" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/sample-project-6.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Frontend</p>
            <h3>Yulian Guinand</h3>
          </div>

          <div className="details">
            <p>Backend</p>
            <h3>Yulian Guinand</h3>
          </div>

          <div className="details">
            <p>Design</p>
            <h3>[Nom du designer ou 'Maquette fournie']</h3>
          </div>

          <div className="details">
            <p>Supervision</p>
            <h3>[Nom du tuteur]</h3>
          </div>
        </Copy>
      </section>

      <section className="next-project">
        <Copy animateOnScroll={true}>
          <p style={{ marginBottom: "1rem" }}>02 - 05</p>
          <h2>Suivant</h2>
        </Copy>

        <div className="next-project-img">
          <div className="next-project-img-wrapper">
            <img src="/project/next-project.jpg" alt="" />
          </div>
        </div>

        <Copy animateOnScroll={true}>
          <h3>[Nom du projet suivant]</h3>
        </Copy>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
