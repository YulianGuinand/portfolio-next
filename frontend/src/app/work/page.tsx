import { Metadata } from 'next';
import WorkClient from './WorkClient';
import { getProjects } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Projets & Réalisations',
  description:
    'Découvrez les projets majeurs conçus par Yulian Guinand : architectures web, applications fullstack (Next.js, Golang, PHP, C#) et plateformes interactives.',
  alternates: {
    canonical: 'https://portfolio.yulianguinand.com/work',
  },
  openGraph: {
    title: 'Projets & Réalisations — Yulian Guinand',
    description:
      'Découvrez les projets majeurs conçus par Yulian Guinand : architectures web, applications fullstack et plateformes interactives.',
    url: 'https://portfolio.yulianguinand.com/work',
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkClient projects={projects} />;
}
