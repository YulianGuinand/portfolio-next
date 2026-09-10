"use client";
import { MdArticle } from "react-icons/md";
import Button from "../Button/Button";
import Copy from "../Copy/Copy";
import "./CTACard.css";

const CTACard = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-copy">
          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="sm">Disponibilité</p>
            </Copy>
          </div>

          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="lg">
                Actuellement en deuxième année de BTS SIO, je suis à l'écoute
                d'opportunités pour la suite de mon parcours.
              </p>
            </Copy>

            <Button
              animateOnScroll={true}
              delay={0.25}
              variant="dark"
              href="/contact"
            >
              Me contacter
            </Button>
          </div>
        </div>

        <div className="cta-card">
          <div className="cta-card-copy">
            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <h3>Ma Stack Technique</h3>
              </Copy>
            </div>

            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <p>
                  Je ne me contente pas de faire fonctionner le code. Je cherche
                  à comprendre le 'pourquoi' derrière chaque erreur.
                </p>

                <p>
                  Du cahier des charges au déploiement, j'aime avoir une vision
                  globale des projets.
                </p>
              </Copy>

              <Button
                animateOnScroll={true}
                delay={0.25}
                variant="light"
                icon={MdArticle}
                href="/studio"
              >
                Mon parcours
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTACard;
