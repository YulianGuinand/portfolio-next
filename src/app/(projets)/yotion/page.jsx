"use client";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Développement Web Fullstack</p>
          <h1>Yotion</h1>

          <a
            href="https://yotion-ten.vercel.app"
            target="_blank"
            className="project-link"
          >
            Voir le projet <span aria-hidden="true">→</span>
          </a>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/yotion/yotion-project-1.png" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Un espace de travail tout-en-un cloné de Notion. Gestion de notes
              récursives, authentification sécurisée et édition en temps réel.
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
            <h3>NextJs / React / PostgreSQL</h3>
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
              <img src="/project/yotion/yotion-project.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/yotion/yotion-project-3.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/yotion/yotion-project-4.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/yotion/yotion-project-5.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/yotion/yotion-project-6.png" alt="" />
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
            <h3>Maquette Notion</h3>
          </div>

          <div className="details">
            <p>Supervision</p>
            <h3>Yulian Guinand</h3>
          </div>
        </Copy>
      </section>

      <section>
        <a href="/docs-dev" className="next-project">
          <Copy animateOnScroll={true}>
            <p style={{ marginBottom: "1rem" }}>02 - 06</p>
            <h2>Suivant</h2>
          </Copy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <img src="/project/yotion/next-project.jpg" alt="" />
            </div>
          </div>

          <Copy animateOnScroll={true}>
            <h3>Doc&apos;s Dev</h3>
          </Copy>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
