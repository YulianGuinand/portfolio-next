"use client";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMemo, useRef } from "react";
import "./work.css";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const { navigateWithTransition } = useViewTransition();

  const workPageContainer = useRef(null);

  const workItems = useMemo(
    () => [
      {
        index: "01",
        name: "Yotion",
        href: "/yotion",
        variant: "variant-1",
        images: [
          "/work/work_1_1.jpg",
          "/work/work_1_2.jpg",
          "/work/work_1_3.jpg",
        ],
      },
      {
        index: "02",
        name: "Doc's Dev",
        href: "/docs-dev",
        variant: "variant-2",
        images: [
          "/work/work_2_1.jpg",
          "/work/work_2_2.jpg",
          "/work/work_2_3.jpg",
        ],
      },
      {
        index: "03",
        name: "Send It",
        href: "/send-it",
        variant: "variant-2",
        images: [
          "/work/work_3_1.jpg",
          "/work/work_3_2.jpg",
          "/work/work_3_3.jpg",
        ],
      },
      {
        index: "04",
        name: "Association Manager",
        href: "/association-manager",
        variant: "variant-3",
        images: [
          "/work/work_4_1.jpg",
          "/work/work_4_2.jpg",
          "/work/work_4_3.jpg",
        ],
      },
      {
        index: "05",
        name: "Competia",
        href: "/competia",
        variant: "variant-1",
        images: [
          "/work/work_5_1.jpg",
          "/work/work_5_2.jpg",
          "/work/work_5_3.jpg",
        ],
      },
      {
        index: "06",
        name: "Engagement Leucemie",
        href: "/engagement-leucemie",
        variant: "variant-2",
        images: [
          "/work/work_6_1.jpg",
          "/work/work_6_2.jpg",
          "/work/work_6_3.jpg",
        ],
      },
    ],
    []
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(workPageContainer);
      const folders = q(".folder");
      const folderWrappers = q(".folder-wrapper");

      let isMobile = window.innerWidth < 1000;

      const setInitialPositions = () => {
        gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
      };

      const mouseEnterHandlers = new Map();
      const mouseLeaveHandlers = new Map();

      folders.forEach((folder, index) => {
        const previewImages = folder.querySelectorAll(".folder-preview-img");

        const onEnter = () => {
          if (isMobile) return;

          folders.forEach((siblingFolder) => {
            if (siblingFolder !== folder) {
              siblingFolder.classList.add("disabled");
            }
          });

          gsap.to(folderWrappers[index], {
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
          });

          previewImages.forEach((img, imgIndex) => {
            let rotation;
            if (imgIndex === 0) {
              rotation = gsap.utils.random(-20, -10);
            } else if (imgIndex === 1) {
              rotation = gsap.utils.random(-10, 10);
            } else {
              rotation = gsap.utils.random(10, 20);
            }

            gsap.to(img, {
              y: "-100%",
              rotation,
              duration: 0.25,
              ease: "back.out(1.7)",
              delay: imgIndex * 0.025,
            });
          });
        };

        const onLeave = () => {
          if (isMobile) return;

          folders.forEach((siblingFolder) => {
            siblingFolder.classList.remove("disabled");
          });

          gsap.to(folderWrappers[index], {
            y: 25,
            duration: 0.25,
            ease: "back.out(1.7)",
          });

          previewImages.forEach((img, imgIndex) => {
            gsap.to(img, {
              y: "0%",
              rotation: 0,
              duration: 0.25,
              ease: "back.out(1.7)",
              delay: imgIndex * 0.05,
            });
          });
        };

        mouseEnterHandlers.set(folder, onEnter);
        mouseLeaveHandlers.set(folder, onLeave);
        folder.addEventListener("mouseenter", onEnter);
        folder.addEventListener("mouseleave", onLeave);
      });

      const handleResize = () => {
        const currentBreakpoint = window.innerWidth < 1000;
        if (currentBreakpoint !== isMobile) {
          isMobile = currentBreakpoint;
          setInitialPositions();

          folders.forEach((folder) => {
            folder.classList.remove("disabled");
          });
          const allPreviewImages = q(".folder-preview-img");
          gsap.set(allPreviewImages, { y: "0%", rotation: 0 });
        }
      };

      window.addEventListener("resize", handleResize);
      setInitialPositions();

      return () => {
        window.removeEventListener("resize", handleResize);
        folders.forEach((folder) => {
          const onEnter = mouseEnterHandlers.get(folder);
          const onLeave = mouseLeaveHandlers.get(folder);
          if (onEnter) folder.removeEventListener("mouseenter", onEnter);
          if (onLeave) folder.removeEventListener("mouseleave", onLeave);
        });
      };
    },
    { scope: workPageContainer }
  );

  return (
    <>
      <section className="folders" ref={workPageContainer}>
        {[0, 1, 2].map((rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {workItems.slice(rowIndex * 2, rowIndex * 2 + 2).map((item) => (
              <a
                key={item.index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(item.href);
                }}
              >
                <div className={`folder ${item.variant}`}>
                  <div className="folder-preview">
                    {item.images.map((src, i) => (
                      <div
                        className="folder-preview-img"
                        key={`${item.index}-img-${i}`}
                      >
                        <img src={src} alt={`Preview ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="folder-wrapper">
                    <div className="folder-index">
                      <p>{item.index}</p>
                    </div>
                    <div className="folder-name">
                      <h1>{item.name}</h1>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};

export default Page;
