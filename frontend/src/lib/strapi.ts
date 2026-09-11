import {
  GlobalSettings,
  Project,
  DocumentItem,
  PhotoItem,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiMedia,
  ContainerHeight,
} from '@/types/strapi';

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_API_URL ||
  'http://localhost:1337';

export function getStrapiURL(path = ''): string {
  return `${STRAPI_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getStrapiMediaUrl(media?: StrapiMedia | string | null): string {
  if (!media) return '';
  const url = typeof media === 'string' ? media : media.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${STRAPI_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

export async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = getStrapiURL(endpoint);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: {
        revalidate: 60,
        ...options.next,
      },
    });

    if (!res.ok) {
      console.error(`[Strapi] HTTP ${res.status} on ${url}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`[Strapi] Error fetching ${url}:`, error);
    return null;
  }
}

// Normalise la hauteur de conteneur ("h400" -> "400")
function normalizeContainerHeight(height: string): ContainerHeight {
  const cleaned = height ? height.replace('h', '') : '400';
  const validHeights: ContainerHeight[] = ['200', '250', '300', '350', '400', '450', '500'];
  return validHeights.includes(cleaned as ContainerHeight) ? (cleaned as ContainerHeight) : '400';
}

function normalizeProject(raw: Project): Project {
  return {
    ...raw,
    containerHeight: normalizeContainerHeight(raw.containerHeight as unknown as string),
    stack: Array.isArray(raw.stack) ? raw.stack : [],
    galleryImages: Array.isArray(raw.galleryImages) ? raw.galleryImages : [],
    pdfLinks: Array.isArray(raw.pdfLinks) ? raw.pdfLinks : [],
  };
}

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  const json = await fetchStrapi<StrapiSingleResponse<GlobalSettings>>(
    '/api/global?populate=*',
    { next: { tags: ['global'] } }
  );
  return json?.data ?? null;
}

export async function getProjects(): Promise<Project[]> {
  const json = await fetchStrapi<StrapiCollectionResponse<Project>>(
    '/api/projects?populate=*&sort=order:asc',
    { next: { tags: ['projects'] } }
  );
  if (!json?.data || !Array.isArray(json.data)) return [];
  return json.data.map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const json = await fetchStrapi<StrapiCollectionResponse<Project>>(
    `/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    { next: { tags: [`project-${slug}`] } }
  );
  if (!json?.data || json.data.length === 0) return null;
  return normalizeProject(json.data[0]);
}

export async function getNextProject(currentSlug: string): Promise<Project | null> {
  const allProjects = await getProjects();
  if (allProjects.length === 0) return null;
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return allProjects[0];
  const nextIndex = (currentIndex + 1) % allProjects.length;
  return allProjects[nextIndex];
}

export async function getDocuments(): Promise<DocumentItem[]> {
  const json = await fetchStrapi<StrapiCollectionResponse<DocumentItem>>(
    '/api/documents?populate=*&sort=order:asc',
    { next: { tags: ['documents'] } }
  );
  return json?.data ?? [];
}

export async function getPhotos(): Promise<PhotoItem[]> {
  const json = await fetchStrapi<StrapiCollectionResponse<PhotoItem>>(
    '/api/photos?populate=*&sort=order:asc',
    { next: { tags: ['photos'] } }
  );
  return json?.data ?? [];
}
