"use client";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import "../sample-project.css";

const Page = () => {
  return (
    <div className="sample-project-page">
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">Social Impact Engineering</p>
          <h1>Engagement Leucémie</h1>

          <a
            href="https://engagement-leucemie.vercel.app"
            target="_blank"
            className="project-link"
          >
            Voir le projet <span aria-hidden="true">→</span>
          </a>
        </Copy>
      </section>

      <section className="project-banner-img">
        <div className="project-banner-img-wrapper">
          <img src="/project/engagement-leucemie/el-project-1.png" alt="" />
        </div>
      </section>

      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>
              Une application web interactive conçue pour amplifier la
              sensibilisation au don de moelle osseuse.
            </h3>
          </div>
          <div className="details">
            <h3>
              L'outil génère instantanément des certificats d'engagement
              personnalisés grâce à React, optimisés pour un partage viral sur
              les réseaux sociaux afin de créer une chaîne de solidarité
              numérique.
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
            <h3>Next.js & React & Nodemailler</h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Projet Personnel</h3>
          </div>
        </Copy>
      </section>

      <section className="project-images">
        <div className="project-images-container">
          <div className="project-img portrait">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-2.png" alt="" />
            </div>
          </div>

          <div className="project-img portrait">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-3.png" alt="" />
            </div>
          </div>

          <div className="project-img portrait">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-4.png" alt="" />
            </div>
          </div>
          {/* 
          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-5.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-6.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-7.png" alt="" />
            </div>
          </div>

          <div className="project-img">
            <div className="project-img-wrapper">
              <img src="/project/engagement-leucemie/el-project-8.png" alt="" />
            </div>
          </div> */}
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
            <h3>NextJs & Typescript & Tailwind</h3>
          </div>

          <div className="details">
            <p>Production</p>
            <h3>Vercel</h3>
          </div>

          <div className="details">
            <p>Cadre</p>
            <h3>Bénévolement pour l&apos;association Engagement Leucémie</h3>
          </div>
        </Copy>
      </section>

      <section>
        <a href="/yotion" className="next-project">
          <Copy animateOnScroll={true}>
            <p style={{ marginBottom: "1rem" }}>01 - 06</p>
            <h2>Suivant</h2>
          </Copy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <img src="/project/engagement-leucemie/next-project.jpg" alt="" />
            </div>
          </div>

          <Copy animateOnScroll={true}>
            <h3>Yotion</h3>
          </Copy>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
