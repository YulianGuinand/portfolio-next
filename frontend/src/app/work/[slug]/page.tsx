import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { notFound } from 'next/navigation';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaFilePdf,
  FaArrowRight,
} from 'react-icons/fa';
import {
  getProjects,
  getProjectBySlug,
  getNextProject,
  getStrapiMediaUrl,
} from '@/lib/strapi';
import StrapiBlocks from '@/components/StrapiBlocks/StrapiBlocks';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const allProjects = await getProjects();
  return allProjects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Projet introuvable',
    };
  }

  const coverUrl = getStrapiMediaUrl(project.coverImage);
  const canonicalUrl = `https://portfolio.yulianguinand.com/work/${project.slug}`;

  return {
    title: `${project.title} — ${project.category}`,
    description: project.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — ${project.category} | Yulian Guinand`,
      description: project.shortDescription,
      url: canonicalUrl,
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1200,
              height: 630,
              alt: project.coverImage?.alternativeText || project.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${project.category}`,
      description: project.shortDescription,
      images: coverUrl ? [coverUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const nextProject = await getNextProject(project.slug);
  const coverUrl = getStrapiMediaUrl(project.coverImage);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://portfolio.yulianguinand.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projets',
            item: 'https://portfolio.yulianguinand.com/work',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `https://portfolio.yulianguinand.com/work/${project.slug}`,
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.title,
        description: project.shortDescription,
        image: coverUrl || undefined,
        creator: {
          '@type': 'Person',
          name: 'Yulian Guinand',
          url: 'https://portfolio.yulianguinand.com',
        },
        genre: project.category,
        keywords: project.stack?.join(', '),
        dateCreated: project.year,
        url: `https://portfolio.yulianguinand.com/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container page-post">
        <header className="post-header">
          <div className="post-info">
            <h1>{project.title}</h1>
            <p>
              {project.category} · {project.year}
            </p>
            <div className="post-meta-tags">
              <span className="post-tag">{project.forme}</span>
              <span className="post-tag">{project.cadre}</span>
              {project.role && <span className="post-tag">{project.role}</span>}
            </div>
          </div>

          <div className="post-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="post-link"
                title="Voir le projet en ligne"
                aria-label={`Accéder au site de ${project.title}`}
              >
                <FaExternalLinkAlt size="13px" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="post-link"
                title="Code source GitHub"
                aria-label={`Code source GitHub de ${project.title}`}
              >
                <FaGithub size="15px" />
              </a>
            )}
          </div>
        </header>

        <section className="post-content">
          {project.fullDescription && project.fullDescription.length > 0 ? (
            <StrapiBlocks blocks={project.fullDescription} />
          ) : (
            <p>{project.shortDescription}</p>
          )}

          {coverUrl && (
            <div className="post-img post-img-1">
              <OptimizedImage
                src={coverUrl}
                alt={project.coverImage?.alternativeText || `${project.title} - Aperçu principal`}
                width={1200}
                height={700}
                priority
                style={{ width: '100%', height: 'auto', display: 'block' }}
                sizes="(max-width: 900px) 100vw, 850px"
              />
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div style={{ margin: '1.5em 0' }}>
              <p style={{ marginBottom: '0.5em', color: 'var(--dark-text-secondary)' }}>
                Environnement &amp; Technologies :
              </p>
              <div className="post-meta-tags">
                {project.stack.map((tech, idx) => (
                  <span key={idx} className="post-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.pdfLinks && project.pdfLinks.length > 0 && (
            <div className="post-pdf-section">
              <p style={{ color: 'var(--dark-text-secondary)', marginBottom: '0.25em' }}>
                Documents et livrables associés :
              </p>
              {project.pdfLinks.map((pdf, idx) => {
                const pdfHref = pdf.file ? getStrapiMediaUrl(pdf.file) : pdf.url || '#';
                return (
                  <a
                    key={idx}
                    href={pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-pdf-link"
                  >
                    <FaFilePdf style={{ color: 'hsl(0 0% 60%)' }} />
                    <span>{pdf.title}</span>
                  </a>
                );
              })}
            </div>
          )}

          {project.galleryImages &&
            project.galleryImages.map((img, index) => {
              const galleryUrl = getStrapiMediaUrl(img);
              if (!galleryUrl) return null;
              return (
                <div key={img.id || index} className="post-img">
                  <OptimizedImage
                    src={galleryUrl}
                    alt={img.alternativeText || `${project.title} - Capture d'écran ${index + 2}`}
                    width={1200}
                    height={700}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes="(max-width: 900px) 100vw, 850px"
                  />
                </div>
              );
            })}
        </section>

        <footer className="next-project-footer">
          <Link href="/work" className="next-project-link">
            ← Retour à tous les projets
          </Link>
          {nextProject && (
            <Link href={`/work/${nextProject.slug}`} className="next-project-link">
              Projet suivant : <strong>{nextProject.title}</strong>{' '}
              <FaArrowRight size="11px" style={{ display: 'inline', marginLeft: '4px' }} />
            </Link>
          )}
        </footer>

        <div className="white-space" aria-hidden="true"></div>
      </article>
    </>
  );
}
