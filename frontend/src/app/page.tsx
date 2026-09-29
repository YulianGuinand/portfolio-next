import React from 'react';
import { Metadata } from 'next';
import SplineScene from '@/components/SplineScene/SplineScene';
import LiveClockUpdate from '@/components/LiveClockUpdate/LiveClockUpdate';
import { getGlobalSettings } from '@/lib/strapi';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yulianguinand.fr',
  },
};

export default async function Home() {
  const global = await getGlobalSettings();

  return (
    <>
      <SplineScene sceneUrl="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />

      <header className="hero-header">
        {global?.heroTitle && <h1>{global.heroTitle}</h1>}
        {global?.heroSubtitle && <p className="hero-subtitle">{global.heroSubtitle}</p>}
      </header>

      <div className="live-clock" aria-label="Heure locale en direct">
        <LiveClockUpdate />
      </div>
    </>
  );
}
