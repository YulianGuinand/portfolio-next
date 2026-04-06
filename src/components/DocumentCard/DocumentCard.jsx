"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./DocumentCard.css";

gsap.registerPlugin(ScrollTrigger);

const DocumentCard = ({
  title,
  description,
  icon: Icon,
  color,
  href,
  index,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotation: 5,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "power4.out",
            delay: index * 0.1,
          },
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3)`,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <a
      href={href}
      ref={cardRef}
      className={`document-card document-card--${color}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="document-card-header">
        <div className="document-card-icon">{Icon && <Icon />}</div>
        <div className="document-card-badge">{color}</div>
      </div>

      <div className="document-card-content">
        <h3 className="document-card-title">{title}</h3>
        <p className="document-card-description">{description}</p>
      </div>

      <div className="document-card-footer">
        <span className="document-card-cta">
          Accéder <span className="arrow">→</span>
        </span>
      </div>
    </a>
  );
};

export default DocumentCard;
