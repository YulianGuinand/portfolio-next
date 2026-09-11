'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const isFirstMount = React.useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Barre de progression cinématique minimaliste en haut d'écran */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            key="progress-bar"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              transformOrigin: '0% 50%',
              background:
                'linear-gradient(90deg, transparent, hsl(0 0% 90%), transparent)',
              zIndex: 999999,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Transition cinématique de contenu */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: '100%', minHeight: '100vh' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
