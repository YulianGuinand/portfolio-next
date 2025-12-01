"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import "./Spotlight.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Spotlight = () => {
  const spotlightRef = useRef(null);
  const [randomImages, setRandomImages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Configuration des lignes (Texte et position du texte)
  const rowsConfig = [
    { id: "marquee-1", text: "Fullstack", textPos: 1 },
    { id: "marquee-2", text: "React.js", textPos: 3 },
    { id: "marquee-3", text: "Vue.js", textPos: 1 },
    { id: "marquee-4", text: "Golang", textPos: 3 },
  ];

  // Génération des images aléatoires au montage (Client-side only)
  useEffect(() => {
    // 4 lignes * 4 images par ligne = 16 images nécessaires
    const images = Array.from(
      { length: 16 },
      () => Math.floor(Math.random() * 6) + 1
    );
    setRandomImages(images);
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted) return; // Attendre que le DOM soit prêt avec les images

      const scrollTriggerInstances = [];

      const initSpotlight = () => {
        // Réinitialiser le texte splitté s'il existe déjà
        document
          .querySelectorAll(".marquee-text-item h2 .char")
          .forEach((c) => {
            const parent = c.parentElement;
            parent.innerText = parent.innerText; // Reset simple
          });

        new SplitType(".marquee-text-item h2", { types: "chars" });

        document
          .querySelectorAll(".marquee-container")
          .forEach((container, index) => {
            const marquee = container.querySelector(".marquee");
            const chars = container.querySelectorAll(".char");

            const marqueeTrigger = gsap.to(marquee, {
              x: index % 2 === 0 ? "5%" : "-15%",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
              },
              force3D: true,
            });

            const charsTrigger = gsap.fromTo(
              chars,
              { fontWeight: 100 },
              {
                fontWeight: 900,
                duration: 1,
                ease: "none",
                stagger: {
                  each: 0.35,
                  from: index % 2 === 0 ? "end" : "start",
                  ease: "linear",
                },
                scrollTrigger: {
                  trigger: container,
                  start: "50% bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );

            if (marqueeTrigger.scrollTrigger)
              scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
            if (charsTrigger.scrollTrigger)
              scrollTriggerInstances.push(charsTrigger.scrollTrigger);
          });

        ScrollTrigger.refresh();
      };

      // Petit délai pour assurer la stabilité du layout
      const timer = setTimeout(initSpotlight, 100);

      return () => {
        clearTimeout(timer);
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef, dependencies: [isMounted] }
  );

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="marquees">
        {rowsConfig.map((row, rowIndex) => (
          <div className="marquee-container" id={row.id} key={row.id}>
            <div className="marquee">
              {/* On génère 5 items par ligne pour garder la structure */}
              {Array.from({ length: 5 }).map((_, itemIndex) => {
                // Vérifie si c'est la position du texte
                if (itemIndex === row.textPos) {
                  return (
                    <div
                      className="marquee-img-item marquee-text-item"
                      key={`text-${rowIndex}`}
                    >
                      <h2>{row.text}</h2>
                    </div>
                  );
                }

                // Récupération de l'ID aléatoire (utilisation d'un index global)
                // On utilise un modulo pour éviter les erreurs d'index si on change la taille
                const imgGlobalIndex = rowIndex * 4 + itemIndex;
                const imgNum =
                  randomImages[imgGlobalIndex % randomImages.length] || 1;

                return (
                  <div
                    className="marquee-img-item"
                    key={`img-${rowIndex}-${itemIndex}`}
                  >
                    {isMounted && (
                      <img
                        src={`/spotlight/work-${imgNum}.jpg`}
                        alt="Project showcase"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
