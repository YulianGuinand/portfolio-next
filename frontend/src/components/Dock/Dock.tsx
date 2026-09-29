'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FaHome,
  FaPalette,
  FaFolderOpen,
  FaCamera,
  FaFileAlt,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';
import { DockItemData, DockIconKey } from '@/types/strapi';

interface DockItemProps {
  IconComponent: IconType;
  path: string;
  isHovered: boolean;
  isNeighbor: boolean;
  onMouseEnter: () => void;
  external?: boolean;
  ariaLabel: string;
}

const DockItem: React.FC<DockItemProps> = ({
  IconComponent,
  path,
  isHovered,
  isNeighbor,
  onMouseEnter,
  external,
  ariaLabel,
}) => {
  const scale = isHovered ? 2.5 : isNeighbor ? 2 : 1;
  const margin = isHovered || isNeighbor ? '28px' : '4px';
  const linkStyle = { transform: `scale(${scale})`, margin: `0 ${margin}` };

  return (
    <div
      className="dock-item"
      style={linkStyle}
      onMouseEnter={onMouseEnter}
      role="menuitem"
    >
      {external ? (
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          <div className="dock-item-link-wrap">
            <IconComponent size="14px" style={{ color: 'hsl(0, 0%, 50%)' }} />
          </div>
        </a>
      ) : (
        <Link href={path} aria-label={ariaLabel}>
          <div className="dock-item-link-wrap">
            <IconComponent size="14px" style={{ color: 'hsl(0, 0%, 50%)' }} />
          </div>
        </Link>
      )}
    </div>
  );
};

export interface DockIconConfig {
  icon: IconType;
  path: string;
  ariaLabel: string;
  external?: boolean;
}

const iconMap: Record<DockIconKey, IconType> = {
  home: FaHome,
  palette: FaPalette,
  folder: FaFolderOpen,
  camera: FaCamera,
  file: FaFileAlt,
  linkedin: FaLinkedin,
  github: FaGithub,
  envelope: FaEnvelope,
};

const DEFAULT_DOCK_ITEMS: DockItemData[] = [
  { id: 1, order: 1, label: 'Accueil', path: '/', iconKey: 'home', external: false },
  { id: 2, order: 2, label: 'Projets en vedette', path: '/work', iconKey: 'palette', external: false },
  { id: 3, order: 3, label: 'Répertoire des projets', path: '/projects', iconKey: 'folder', external: false },
  { id: 4, order: 4, label: 'Galerie Photos', path: '/photos', iconKey: 'camera', external: false },
  { id: 5, order: 5, label: 'Documents', path: '/documents', iconKey: 'file', external: false },
  { id: 6, order: 6, label: 'Profil LinkedIn de Yulian Guinand', path: 'https://www.linkedin.com/in/yulian-guinand/', iconKey: 'linkedin', external: true },
  { id: 7, order: 7, label: 'Profil GitHub de Yulian Guinand', path: 'https://github.com/YulianGuinand', iconKey: 'github', external: true },
  { id: 8, order: 8, label: 'Contacter Yulian Guinand par email', path: 'mailto:yulianguinand@etik.com', iconKey: 'envelope', external: true },
];

interface DockProps {
  items?: DockItemData[];
}

const Dock: React.FC<DockProps> = ({ items = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoverEffectsEnabled, setHoverEffectsEnabled] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setHoverEffectsEnabled(window.innerWidth >= 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (hoverEffectsEnabled) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffectsEnabled) {
      setTimeout(() => {
        setHoveredIndex(-100);
      }, 50);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoveredIndex(-100);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const activeItems = items && items.length > 0 ? items : DEFAULT_DOCK_ITEMS;
  const sortedItems = [...activeItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <nav
      className="dock-container"
      onMouseLeave={handleMouseLeave}
      aria-label="Barre de navigation principale"
    >
      <div className="dock" role="menubar">
        {sortedItems.map((item, index) => {
          const IconComponent = iconMap[item.iconKey] || FaHome;
          return (
            <DockItem
              key={item.id || index}
              IconComponent={IconComponent}
              path={item.path}
              ariaLabel={item.label}
              isHovered={index === hoveredIndex}
              isNeighbor={Math.abs(index - hoveredIndex) === 1}
              onMouseEnter={() => handleMouseEnter(index)}
              external={item.external}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Dock;
