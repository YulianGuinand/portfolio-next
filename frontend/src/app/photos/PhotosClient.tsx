'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { PhotoItem } from '@/types/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

const PhotoCard: React.FC<{
  photo: PhotoItem;
  onOpen: (photo: PhotoItem) => void;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  animDelay?: number;
}> = ({ photo, onOpen, priority = false, loading = 'lazy', animDelay = 0 }) => {
  const imageUrl = getStrapiMediaUrl(photo.image);
  const projectTitle = photo.project?.title || 'Projet';
  const category = photo.project?.category || 'Interface';
  const altText = photo.alt || `Capture d'interface du projet ${projectTitle}`;

  return (
    <article
      className={`photo-card ${priority ? 'photo-card-priority' : ''}`}
      style={!priority && animDelay > 0 ? { animationDelay: `${animDelay}s` } : undefined}
    >
      <div className="photo-card-img-wrap">
        {imageUrl && (
          <OptimizedImage
            src={imageUrl}
            alt={altText}
            width={800}
            height={500}
            priority={priority}
            loading={priority ? undefined : loading}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
        )}
      </div>

      <div className="photo-overlay">
        <div className="photo-overlay-info">
          <h2>{projectTitle}</h2>
          <span>{category}</span>
        </div>
        <div className="photo-overlay-action">Agrandir</div>
      </div>

      <button
        type="button"
        className="photo-card-btn"
        onClick={() => onOpen(photo)}
        aria-label={`Agrandir la capture du projet ${projectTitle}`}
      />
    </article>
  );
};

interface PhotosClientProps {
  photos: PhotoItem[];
}

const PhotosClient: React.FC<PhotosClientProps> = ({ photos = [] }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    if (!activePhoto) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto]);

  if (photos.length === 0) {
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
        <p>Aucune photo disponible pour le moment.</p>
      </div>
    );
  }

  // Répartition automatique et équitable sur 3 colonnes
  const col1: PhotoItem[] = [];
  const col2: PhotoItem[] = [];
  const col3: PhotoItem[] = [];

  photos.forEach((ph, idx) => {
    if (idx % 3 === 0) col1.push(ph);
    else if (idx % 3 === 1) col2.push(ph);
    else col3.push(ph);
  });

  const activeImageUrl = activePhoto ? getStrapiMediaUrl(activePhoto.image) : '';
  const activeTitle = activePhoto?.project?.title || 'Projet';
  const activeSlug = activePhoto?.project?.slug;

  return (
    <>
      <div className="container page-photos">
        <h1 className="sr-only">Galerie Photos &amp; Captures d&apos;Interfaces — Yulian Guinand</h1>
        <div className="photos-col">
          {col1.map((photo, itemIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onOpen={setActivePhoto}
              priority={itemIndex === 0}
              loading={itemIndex <= 1 ? 'eager' : 'lazy'}
              animDelay={itemIndex === 0 ? 0 : Math.min(itemIndex * 3 * 0.04, 0.4)}
            />
          ))}
        </div>

        <div className="photos-col">
          {col2.map((photo, itemIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onOpen={setActivePhoto}
              loading={itemIndex === 0 ? 'eager' : 'lazy'}
              animDelay={Math.min((itemIndex * 3 + 1) * 0.04, 0.4)}
            />
          ))}
        </div>

        <div className="photos-col">
          {col3.map((photo, itemIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onOpen={setActivePhoto}
              loading={itemIndex === 0 ? 'eager' : 'lazy'}
              animDelay={Math.min((itemIndex * 3 + 2) * 0.04, 0.4)}
            />
          ))}
        </div>
      </div>

      {activePhoto &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="lightbox-backdrop"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <div
              className="lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-img-wrapper" style={{ position: 'relative' }}>
                {activeImageUrl && (
                  <OptimizedImage
                    src={activeImageUrl}
                    alt={activePhoto.alt || `Capture agrandie du projet ${activeTitle}`}
                    width={1400}
                    height={900}
                    priority={true}
                    showSpinner
                    style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain' }}
                    sizes="90vw"
                  />
                )}
              </div>

              <div className="lightbox-footer">
                <div className="lightbox-info">
                  <h2 id="lightbox-title">{activeTitle}</h2>
                  {activePhoto.alt && <p>{activePhoto.alt}</p>}
                </div>

                <div className="lightbox-actions">
                  {activeSlug && (
                    <Link
                      href={`/work/${activeSlug}`}
                      className="lightbox-link-btn"
                      onClick={() => setActivePhoto(null)}
                    >
                      <span>Étude de cas</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  )}

                  <button
                    type="button"
                    className="lightbox-close-btn"
                    onClick={() => setActivePhoto(null)}
                    aria-label="Fermer la vue plein écran"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PhotosClient;
