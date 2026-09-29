import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export interface WorkItemProps {
  imgUrl: string;
  containerHeight: string | number;
  workName: string;
  workDate: string;
  type: 'blog' | 'article' | 'img';
  url: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

const WorkItem: React.FC<WorkItemProps> = ({
  imgUrl,
  containerHeight,
  workName,
  workDate,
  type,
  url,
  priority = false,
  loading = 'lazy',
}) => {
  const numericHeight = parseInt(String(containerHeight), 10) || 400;

  return (
    <div className={`work-item type-${type}`}>
      <div className={`work-item-img work-${containerHeight}`}>
        <div className="work-item-img-wrapper">
          <OptimizedImage
            src={imgUrl}
            alt={workName}
            width={800}
            height={numericHeight}
            style={{ width: '100%', height: `${numericHeight}px`, objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 33vw"
            priority={priority}
            loading={priority ? undefined : loading}
          />
        </div>

        <div className="work-item-info">
          <h2 className="work-name">{workName}</h2>
          <p className="work-date">{workDate}</p>
        </div>
      </div>
      {type !== 'img' && (
        <div className="work-item-cta">
          <Link
            href={url}
            aria-label={`Étude de cas du projet ${workName} — Architecture et développement`}
          >
            {type === 'blog' ? (
              <button type="button">Lire l&apos;étude de cas</button>
            ) : type === 'article' ? (
              <button type="button">Découvrir l&apos;étude de cas</button>
            ) : null}
          </Link>
        </div>
      )}
    </div>
  );
};

export default WorkItem;
