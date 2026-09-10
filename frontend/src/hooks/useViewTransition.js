"use client";
import { useTransitionRouter } from "next-view-transitions";
import { gsap } from "gsap";

export const useViewTransition = () => {
  const router = useTransitionRouter();

  function createSVGOverlay() {
    let overlay = document.querySelector(".page-transition-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      overlay.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="overlay__path" vector-effect="non-scaling-stroke" d="M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z" />
        </svg>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function slideInOut(href, onRouteChange) {
    const overlay = createSVGOverlay();
    const overlayPath = overlay.querySelector(".overlay__path");

    if (!overlayPath) return;

    const paths = {
      step1: {
        unfilled: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
        inBetween: "M 0 0 h 43 c -60 55 140 65 0 100 H 0 V 0 Z",
        filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z",
      },
      step2: {
        filled: "M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z",
        inBetween: "M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z",
        unfilled: "M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z",
      },
    };

    const timeline = gsap.timeline({
      onComplete: () => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      },
    });

    timeline
      .set(overlayPath, {
        attr: { d: paths.step1.unfilled },
      })
      .to(
        overlayPath,
        {
          duration: 0.6,
          ease: "power4.in",
          attr: { d: paths.step1.inBetween },
        },
        0
      )
      .to(overlayPath, {
        duration: 0.2,
        ease: "power1",
        attr: { d: paths.step1.filled },
        onComplete: () => {
          router.push(href);

          if (onRouteChange) {
            onRouteChange();
          }
        },
      })
      .to({}, { duration: 0.75 })
      .set(overlayPath, {
        attr: { d: paths.step2.filled },
      })
      .to(overlayPath, {
        duration: 0.15,
        ease: "sine.in",
        attr: { d: paths.step2.inBetween },
      })
      .to(overlayPath, {
        duration: 1,
        ease: "power4",
        attr: { d: paths.step2.unfilled },
      });
  }

  const navigateWithTransition = (href, onRouteChange, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    slideInOut(href, onRouteChange);
  };

  return { navigateWithTransition, router };
};
