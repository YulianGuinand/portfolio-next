"use client";
import Copy from "@/components/Copy/Copy";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Spotlight from "@/components/Spotlight/Spotlight";
import TeamCards from "@/components/TeamCards/TeamCards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import "./studio.css";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="studio-page">
      <section className="studio-header">
        <div className="container">
          <div className="studio-header-row">
            <Copy delay={0.8}>
              <h1>Codeur</h1>
            </Copy>
          </div>

          <div className="studio-header-row">
            <Copy delay={0.95}>
              <h1>Curieux</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="studio-copy">
        <div className="container">
          <div className="studio-copy-img">
            <img src="/studio/studio-header.jpg" alt="" />
          </div>

          <Copy animateOnScroll={true}>
            <p className="lg">
              Je m'appelle Yulian Guinand. Actuellement étudiant en deuxième
              année de BTS SIO (Services Informatiques aux Organisations) au
              lycée Mont Roland à Dole. Je combine ma formation académique avec
              une expérience concrète en tant qu'alternant chez Studio-Pogo.
            </p>

            <p className="lg">
              Mon approche du développement est pragmatique : résoudre des
              problèmes complexes avec des solutions simples et maintenables. Je
              me spécialise dans l'écosystème JS en frontend et Golang en
              backend, avec une attention particulière portée à la performance
              et à l'expérience utilisateur.
            </p>
          </Copy>
        </div>
      </section>

      <TeamCards />

      <Spotlight />

      <CTACard />

      <Footer />
    </div>
  );
};

export default Page;
