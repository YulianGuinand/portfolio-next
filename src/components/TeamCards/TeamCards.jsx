"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import "./TeamCards.css";
import { teamMembers } from "./teamMembers.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TeamCards() {
  const stickyRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        let scrollTriggerInstance = null;

        const stickySection = stickyRef.current;
        const stickyHeader = headerRef.current;
        const cards = cardsRef.current;

        if (!stickySection || !stickyHeader || !cards || cards.length === 0) {
          return () => {};
        }

        let stickyHeight = 0;
        let maxTranslate = 0;
        let cardWidth = 325;
        let cardHeight = 500;
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;
        let cardStartX = 25;
        let cardEndX = -650;

        const measure = () => {
          stickyHeight = window.innerHeight * 5;
          const headerWidth = stickyHeader ? stickyHeader.offsetWidth : 0;
          maxTranslate = Math.max(0, headerWidth - window.innerWidth);
          viewportWidth = window.innerWidth;
          viewportHeight = window.innerHeight;
          if (cards && cards.length > 0 && cards[0]) {
            const cardRect = cards[0].getBoundingClientRect();
            cardWidth = cardRect.width || 325;
            cardHeight = cardRect.height || 500;
          }

          const standardViewportWidth = 1920;
          const standardEndXPercent = -650;
          const standardTravelPixels = Math.abs(
            (standardEndXPercent / 100) * cardWidth
          );

          const viewportScale = viewportWidth / standardViewportWidth;
          const requiredTravelPixels =
            standardTravelPixels * 1.25 * Math.max(1, viewportScale);

          cardStartX = 25;
          cardEndX = -(requiredTravelPixels / cardWidth) * 100;
        };
        measure();

        const transforms = [
          [
            [10, 50, -10, 10],
            [20, -10, -45, 20],
          ],
          [
            [0, 47.5, -10, 15],
            [-25, 15, -45, 30],
          ],
          [
            [0, 52.5, -10, 5],
            [15, -5, -40, 60],
          ],
          [
            [0, 50, 30, -80],
            [20, -10, 60, 5],
          ],
          [
            [0, 55, -15, 30],
            [25, -15, 60, 95],
          ],
        ];

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: stickySection,
          start: "top top",
          end: () => `+=${stickyHeight}px`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            const translateX = -progress * maxTranslate;
            gsap.set(stickyHeader, { x: translateX });

            cards.forEach((card, index) => {
              const delay = index * 0.1125;
              const cardProgress = Math.max(
                0,
                Math.min((progress - delay) * 2, 1)
              );

              if (cardProgress > 0) {
                const yPos = transforms[index][0];
                const rotations = transforms[index][1];

                const cardX = gsap.utils.interpolate(
                  cardStartX,
                  cardEndX,
                  cardProgress
                );

                const yProgress = cardProgress * 3;
                const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
                const yInterpolation = yProgress - yIndex;
                const cardY = gsap.utils.interpolate(
                  yPos[yIndex],
                  yPos[yIndex + 1],
                  yInterpolation
                );

                const cardRotation = gsap.utils.interpolate(
                  rotations[yIndex],
                  rotations[yIndex + 1],
                  yInterpolation
                );

                gsap.set(card, {
                  xPercent: cardX,
                  yPercent: cardY,
                  rotation: cardRotation,
                  opacity: 1,
                });
              } else {
                gsap.set(card, { opacity: 0 });
              }
            });
          },
        });

        const onRefreshInit = () => measure();
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

        const handleResize = () => {
          measure();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        ScrollTrigger.refresh();

        return () => {
          if (scrollTriggerInstance) scrollTriggerInstance.kill();
          ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
          window.removeEventListener("resize", handleResize);
        };
      });

      mm.add("(max-width: 999px)", () => {
        const stickySection = stickyRef.current;
        const stickyHeader = headerRef.current;
        if (stickySection) gsap.set(stickySection, { clearProps: "all" });
        if (stickyHeader) gsap.set(stickyHeader, { clearProps: "all" });
        cardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: "all", opacity: 1 });
        });

        ScrollTrigger.refresh();

        const refreshHandler = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("orientationchange", refreshHandler);
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad, { passive: true });

        return () => {
          window.removeEventListener("orientationchange", refreshHandler);
          window.removeEventListener("load", onLoad);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: stickyRef }
  );

  return (
    <>
      {/* desktop animated section */}
      <section className="sticky team-desktop" ref={stickyRef}>
        <div className="sticky-header" ref={headerRef}>
          <h1>
            Compétences <br />
            Services
          </h1>
        </div>
        {teamMembers.map((m, idx) => (
          <div
            className="card"
            id={m.id}
            key={m.id}
            ref={(el) => (cardsRef.current[idx] = el)}
          >
            <div className="card-img">
              <img src={m.img} alt={m.alt} />
            </div>
            <div className="card-content">
              <div className="card-title">
                <h2>{m.name}</h2>
              </div>
              <div className="card-description">
                <p>{m.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* mobile static section */}
      <section className="team-mobile">
        <div className="mobile-header">
          <h1>Minds at Work</h1>
        </div>
        {teamMembers.map((m) => (
          <div className="card" id={m.id} key={`m-${m.id}`}>
            <div className="card-img">
              <img src={m.img} alt={m.alt} />
            </div>
            <div className="card-content">
              <div className="card-title">
                <h2>{m.name}</h2>
              </div>
              <div className="card-description">
                <p>{m.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
