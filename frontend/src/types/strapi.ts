export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface PdfLink {
  id: number;
  title: string;
  url?: string;
  file?: StrapiMedia;
}

export type ContainerHeight = '200' | '250' | '300' | '350' | '400' | '450' | '500';

export interface StrapiBlockChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiBlockChild[];
}

export interface StrapiBlock {
  type: string;
  level?: number;
  format?: 'ordered' | 'unordered';
  children?: StrapiBlockChild[];
  image?: StrapiMedia;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: string;
  forme: string;
  year: string;
  cadre: string;
  role?: string;
  stack?: string[];
  shortDescription: string;
  fullDescription?: StrapiBlock[];
  containerHeight: ContainerHeight;
  coverImage: StrapiMedia;
  galleryImages?: StrapiMedia[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  pdfLinks?: PdfLink[];
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DocumentItem {
  id: number;
  documentId: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  file?: StrapiMedia;
  downloadable: boolean;
  date: string;
  order?: number;
}

export interface PhotoItem {
  id: number;
  documentId: string;
  image: StrapiMedia;
  alt: string;
  project?: {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    category?: string;
  };
  order?: number;
}

export type DockIconKey =
  | 'home'
  | 'palette'
  | 'folder'
  | 'camera'
  | 'file'
  | 'linkedin'
  | 'github'
  | 'envelope';

export interface DockItemData {
  id: number;
  label: string;
  path: string;
  iconKey: DockIconKey;
  external: boolean;
  order?: number;
}

export interface GlobalSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteBrand: string;
  heroTitle: string;
  heroSubtitle: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage?: StrapiMedia;
  dockLinks: DockItemData[];
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
