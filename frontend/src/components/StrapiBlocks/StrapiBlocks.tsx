import React from 'react';
import { StrapiBlock, StrapiBlockChild } from '@/types/strapi';

interface StrapiBlocksProps {
  blocks?: StrapiBlock[];
  className?: string;
}

function renderChild(child: StrapiBlockChild, index: number): React.ReactNode {
  if (child.type === 'link' && child.url) {
    return (
      <a
        key={index}
        href={child.url}
        target="_blank"
        rel="noopener noreferrer"
        className="strapi-link"
      >
        {child.children?.map(renderChild)}
      </a>
    );
  }

  let content: React.ReactNode = child.text || '';

  if (child.bold) {
    content = <strong>{content}</strong>;
  }
  if (child.italic) {
    content = <em>{content}</em>;
  }
  if (child.underline) {
    content = <u>{content}</u>;
  }
  if (child.strikethrough) {
    content = <del>{content}</del>;
  }
  if (child.code) {
    content = <code>{content}</code>;
  }

  return <React.Fragment key={index}>{content}</React.Fragment>;
}

export default function StrapiBlocks({ blocks, className }: StrapiBlocksProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx}>
                {block.children?.map(renderChild)}
              </p>
            );

          case 'heading': {
            const level = block.level || 2;
            const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={idx}>
                {block.children?.map(renderChild)}
              </HeadingTag>
            );
          }

          case 'list': {
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={idx}>
                {block.children?.map((item, itemIdx) => (
                  <li key={itemIdx}>{item.children?.map(renderChild)}</li>
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return (
              <blockquote key={idx}>
                {block.children?.map(renderChild)}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={idx}>
                <code>{block.children?.map(renderChild)}</code>
              </pre>
            );

          default:
            return (
              <p key={idx}>
                {block.children?.map(renderChild)}
              </p>
            );
        }
      })}
    </div>
  );
}
