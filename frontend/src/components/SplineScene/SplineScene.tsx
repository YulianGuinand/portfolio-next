'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

interface SplineSceneProps {
  sceneUrl?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({
  sceneUrl = 'https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode',
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let triggered = false;

    const triggerLoad = () => {
      if (!triggered) {
        triggered = true;
        setShouldLoad(true);
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', triggerLoad);
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
      window.removeEventListener('keydown', triggerLoad);
    };

    // Déclenchement dès la première interaction utilisateur (mouvement de souris, toucher, scroll, etc.)
    window.addEventListener('pointermove', triggerLoad, { passive: true, once: true });
    window.addEventListener('mousemove', triggerLoad, { passive: true, once: true });
    window.addEventListener('pointerdown', triggerLoad, { passive: true, once: true });
    window.addEventListener('touchstart', triggerLoad, { passive: true, once: true });
    window.addEventListener('scroll', triggerLoad, { passive: true, once: true });
    window.addEventListener('keydown', triggerLoad, { passive: true, once: true });

    // Fallback après la phase critique de chargement initial (7 secondes)
    let timerId: NodeJS.Timeout | null = null;
    if (typeof window !== 'undefined') {
      timerId = setTimeout(triggerLoad, 7000);
    }

    return () => {
      cleanup();
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background:
          'radial-gradient(ellipse at center, rgba(35, 35, 42, 0.3) 0%, rgba(19, 19, 19, 1) 75%)',
        overflow: 'hidden',
      }}
    >
      {shouldLoad && (
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        >
          <Spline scene={sceneUrl} onLoad={() => setIsLoaded(true)} />
        </div>
      )}
    </div>
  );
};

export default SplineScene;
