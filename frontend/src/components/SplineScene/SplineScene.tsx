'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Désactive les pointer-events pendant le scroll pour éliminer 100% des micro-décalages
  // et libérer le thread principal pour la fluidité 60/120 FPS de Lenis
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer: NodeJS.Timeout | null = null;

    const onScrollStart = () => {
      if (!el.classList.contains('is-scrolling')) {
        el.classList.add('is-scrolling');
      }
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        el.classList.remove('is-scrolling');
      }, 120);
    };

    window.addEventListener('wheel', onScrollStart, { passive: true });
    window.addEventListener('touchmove', onScrollStart, { passive: true });

    return () => {
      window.removeEventListener('wheel', onScrollStart);
      window.removeEventListener('touchmove', onScrollStart);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 2. Intercepte l'élément <canvas> dès son montage pour empêcher Spline d'enregistrer des écouteurs 'wheel'
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const patchCanvas = (canvas: HTMLCanvasElement) => {
      if ((canvas as any).__wheelPatched) return;
      (canvas as any).__wheelPatched = true;

      const originalAddEventListener = canvas.addEventListener.bind(canvas);
      canvas.addEventListener = function (
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) {
        if (type === 'wheel') {
          // Bloque les écouteurs wheel internes de Spline pour éviter tout blocage ou décalage de scroll
          return;
        }
        return originalAddEventListener(type, listener, options);
      };
    };

    const existingCanvas = el.querySelector('canvas');
    if (existingCanvas) {
      patchCanvas(existingCanvas);
    }

    const observer = new MutationObserver(() => {
      const canvas = el.querySelector('canvas');
      if (canvas) {
        patchCanvas(canvas);
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  // 3. Neutralisation de sécurité si un événement wheel traversait encore
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheelCapture = (e: WheelEvent) => {
      try {
        Object.defineProperty(e, 'preventDefault', {
          value: () => {},
          writable: true,
          configurable: true,
        });
      } catch {
        e.preventDefault = () => {};
      }
    };

    el.addEventListener('wheel', onWheelCapture, { capture: true, passive: true });

    return () => {
      el.removeEventListener('wheel', onWheelCapture, { capture: true });
    };
  }, [shouldLoad]);

  const handleSplineLoad = (splineApp: any) => {
    setIsLoaded(true);

    try {
      const disableControls = (target: any) => {
        if (!target) return;
        // Désactivation des contrôles caméra / zoom molette
        if (target.orbitControls) {
          target.orbitControls.enabled = false;
          target.orbitControls.enableZoom = false;
          target.orbitControls.enablePan = false;
        }
        if (target._controls?.orbitControls) {
          target._controls.orbitControls.enabled = false;
          target._controls.orbitControls.enableZoom = false;
          target._controls.orbitControls.enablePan = false;
        }
        if (target.controls?.orbitControls) {
          target.controls.orbitControls.enabled = false;
          target.controls.orbitControls.enableZoom = false;
          target.controls.orbitControls.enablePan = false;
        }
        if (target.eventManager) {
          target.eventManager.preventScroll = false;
          target.eventManager.preventTouchScroll = false;
        }
        if (target._eventManager) {
          target._eventManager.preventScroll = false;
          target._eventManager.preventTouchScroll = false;
        }
      };

      disableControls(splineApp);
      setTimeout(() => disableControls(splineApp), 100);
      setTimeout(() => disableControls(splineApp), 400);
      setTimeout(() => disableControls(splineApp), 1000);
    } catch {
      // Fallback silencieux
    }
  };

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
      ref={containerRef}
      className="spline-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        zIndex: 0,
        background:
          'radial-gradient(ellipse at center, rgba(35, 35, 42, 0.3) 0%, rgba(19, 19, 19, 1) 75%)',
        overflow: 'hidden',
        pointerEvents: 'auto',
        touchAction: 'pan-y',
        userSelect: 'none',
      }}
    >
      {shouldLoad && (
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
          }}
        >
          <Spline scene={sceneUrl} onLoad={handleSplineLoad} />
        </div>
      )}
    </div>
  );
};

export default SplineScene;
