'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import WorkItem from './WorkItem';
import { Project } from '@/types/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

gsap.registerPlugin(useGSAP);

interface WorkClientProps {
  projects: Project[];
}

const WorkClient: React.FC<WorkClientProps> = ({ projects = [] }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (projects.length === 0) return;
      gsap.from('.col .work-item', {
        y: 35,
        stagger: 0.04,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'all',
      });
    },
    { scope: container, dependencies: [projects] }
  );

  if (projects.length === 0) {
    return (
      <div
        className="container"
        style={{
          textAlign: 'center',
          padding: '8em 1em',
          color: 'var(--dark-text-secondary)',
          minHeight: '50vh',
        }}
      >
        <p>Aucun projet disponible pour le moment.</p>
      </div>
    );
  }

  // Distribution équilibrée et dynamique sur 3 colonnes
  const col1: Project[] = [];
  const col2: Project[] = [];
  const col3: Project[] = [];

  projects.forEach((p, idx) => {
    if (idx % 3 === 0) col1.push(p);
    else if (idx % 3 === 1) col2.push(p);
    else col3.push(p);
  });

  const renderCol = (items: Project[], colIndex: number) => (
    <div className="col">
      {items.map((p, itemIndex) => {
        // Le tout premier projet (colonne 1, item 0) est l'élément LCP absolu en mobile et desktop
        const isLcpCandidate = colIndex === 0 && itemIndex === 0;
        // Les têtes des colonnes 2 et 3 en desktop sont au-dessus de la ligne de flottaison
        const isAboveTheFold = itemIndex === 0;

        return (
          <WorkItem
            key={p.slug}
            imgUrl={getStrapiMediaUrl(p.coverImage)}
            containerHeight={p.containerHeight}
            workName={p.title}
            workDate={p.year}
            type="article"
            url={`/work/${p.slug}`}
            priority={isLcpCandidate}
            loading={isLcpCandidate ? undefined : isAboveTheFold ? 'eager' : 'lazy'}
          />
        );
      })}
    </div>
  );

  return (
    <div className="container page-work" ref={container}>
      <h1 className="sr-only">Projets & Réalisations — Yulian Guinand</h1>
      {renderCol(col1, 0)}
      {renderCol(col2, 1)}
      {renderCol(col3, 2)}
    </div>
  );
};

export default WorkClient;
