"use client";
import Copy from "../../../components/Copy/Copy";
import Footer from "../../../components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Développement Backend Natif</p>
          <h1>Send-It</h1>

          <a
            href="/project/send-it/CDCF.pdf"
            target="_blank"
            className="project-link"
          >
            Voir le cahier des charges <span aria-hidden="true">→</span>
          </a>

          <a
            href="/project/send-it/CHARTE_GRAPHIQUE.pdf"
            target="_blank"
            className="project-link"
          >
            Voir la charte graphique <span aria-hidden="true">→</span>
          </a>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/send-it/sendit-project-1.png" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Conçu comme une alternative légère à SwissTransfer, Send-it est un
              service de transfert de fichiers éphémère et sécurisé.
            </h3>
          </div>
          <div className="details">
            <h3>
              L&apos;architecture repose sur du PHP pur pour garantir une
              performance brute, sans la surcharge d&apos;un framework, avec une
              gestion stricte des expirations de fichiers.
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

          <div className="details">
            <p>Technologies</p>
            <h3>PHP / Tailwind / HTML / CSS / JS</h3>
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
              <img src="/project/send-it/sendit-project-2.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/send-it/sendit-project-3.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/send-it/sendit-project-4.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/send-it/sendit-project-5.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/send-it/sendit-project-6.png" alt="" />
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
            <h3>UI Minimaliste / Responsive</h3>
          </div>

          <div className="details">
            <p>Sécurité & Chiffrement</p>
            <h3>Gestion native des flux</h3>
          </div>

          <div className="details">
            <p>Supervision</p>
            <h3>Ethan Le-Touzic / Benoit Jeannerod</h3>
          </div>
        </Copy>
      </section>

      <section>
        <a href="/associations-manager" className="next-project">
          <Copy animateOnScroll={true}>
            <p style={{ marginBottom: "1rem" }}>04 - 06</p>
            <h2>Suivant</h2>
          </Copy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <img src="/project/send-it/next-project.jpg" alt="" />
            </div>
          </div>

          <Copy animateOnScroll={true}>
            <h3>Association Manager</h3>
          </Copy>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
