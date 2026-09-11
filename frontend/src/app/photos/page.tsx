import { Metadata } from 'next';
import PhotosClient from './PhotosClient';
import { getPhotos } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Galerie Photos & Interfaces',
  description:
    'Galerie visuelle des interfaces, maquettes et réalisations logicielles développées par Yulian Guinand.',
  alternates: {
    canonical: 'https://portfolio.yulianguinand.com/photos',
  },
  openGraph: {
    title: 'Galerie Photos & Interfaces — Yulian Guinand',
    description:
      'Galerie visuelle des interfaces, maquettes et réalisations logicielles développées par Yulian Guinand.',
    url: 'https://portfolio.yulianguinand.com/photos',
  },
};

export default async function PhotosPage() {
  const photos = await getPhotos();
  return <PhotosClient photos={photos} />;
}
