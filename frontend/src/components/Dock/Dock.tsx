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

  if (!items || items.length === 0) {
    return null;
  }

  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
