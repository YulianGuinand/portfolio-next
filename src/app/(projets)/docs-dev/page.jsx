"use client";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Collaboration Temps Réel</p>
          <h1>Doc's Dev</h1>

          <a
            href="https://google-doc-ecru.vercel.app"
            target="_blank"
            className="project-link"
          >
            Voir le projet <span aria-hidden="true">→</span>
          </a>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/docs/docs-project-1.png" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Un éditeur de texte collaboratif permettant l'écriture simultanée.
              Le défi technique central repose sur la synchronisation
              instantanée des états entre les clients grâce à Liveblocks et la
              persistance des données.
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
            <h3>NextJs / Typescript / React / PostgreSQL</h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Projet Personnel</h3>
          </div>
        </Copy>
      </section>

      <section className="project-images">
        <div className="project-images-container">
          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/docs/docs-project-2.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/docs/docs-project-3.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/docs/docs-project-4.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/docs/docs-project-5.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/docs/docs-project-6.png" alt="" />
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
            <h3>Maquette Google Doc</h3>
          </div>

          <div className="details">
            <p>Supervision</p>
            <h3>Yulian Guinand</h3>
          </div>
        </Copy>
      </section>

      <section>
        <a href="/send-it" className="next-project">
          <Copy animateOnScroll={true}>
            <p style={{ marginBottom: "1rem" }}>03 - 06</p>
            <h2>Suivant</h2>
          </Copy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <img src="/project/docs/next-project.jpg" alt="" />
            </div>
          </div>

          <Copy animateOnScroll={true}>
            <h3>Send-It</h3>
          </Copy>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
