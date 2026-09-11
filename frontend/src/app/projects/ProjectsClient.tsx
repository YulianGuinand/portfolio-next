'use client';

import React from 'react';
import Link from 'next/link';
import { useScramble } from 'use-scramble';
import { Project } from '@/types/strapi';

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const { ref: titleRef, replay: replayTitle } = useScramble({
    text: project.title,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 5,
    seed: 0,
  });

  const { ref: copyRef, replay: replayCopy } = useScramble({
    text: project.shortDescription,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 5,
    seed: 0,
  });

  const handleMouseEnter = () => {
    replayTitle();
    replayCopy();
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      aria-label={`${project.title} — ${project.shortDescription}`}
    >
      <article className="project-item">
        <div className="project-title">
          <p ref={titleRef}>{project.title}</p>
        </div>
        <div className="project-copy">
          <p ref={copyRef}>{project.shortDescription}</p>
        </div>
        <div className="project-divider" aria-hidden="true"></div>
        <div className="project-year">
          <p>{project.year}</p>
        </div>
      </article>
    </Link>
  );
};

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects = [] }) => {
  if (projects.length === 0) {
    return (
      <div
        className="container page-projects"
        style={{
          textAlign: 'center',
          padding: '8em 1em',
          color: 'var(--dark-text-secondary)',
          minHeight: '50vh',
        }}
      >
        <h1 className="sr-only">Répertoire des Projets — Yulian Guinand</h1>
        <p>Aucun projet disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="container page-projects">
      <h1 className="sr-only">Répertoire des Projets — Yulian Guinand</h1>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ProjectsClient;
