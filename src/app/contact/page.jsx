"use client";
import { useEffect, useRef } from "react";
import Button from "../../components/Button/Button";
import Copy from "../../components/Copy/Copy";
import "./contact.css";

const Page = () => {
  const screensaverRef = useRef(null);
  const animationIdRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existingScreensavers = container.querySelectorAll(".screensaver");
    existingScreensavers.forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    const config = {
      speed: 3,
      imageCount: 10,
      size: 300,
      changeDirectionDelay: 20,
      edgeOffset: -40,
    };

    let isDesktop = window.innerWidth >= 1000;
    let screensaverElement = null;

    const preloadedImages = [];
    const preloadImages = () => {
      return new Promise((resolve) => {
        let loadedCount = 0;

        for (let i = 1; i <= config.imageCount; i++) {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === config.imageCount) {
              resolve();
            }
          };
          img.src = `/objects/obj-${i}.png`;
          preloadedImages.push(img);
        }
      });
    };

    const stopAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (screensaverElement && screensaverElement.parentNode) {
        screensaverElement.parentNode.removeChild(screensaverElement);
        screensaverElement = null;
      }

      if (screensaverRef.current && screensaverRef.current.parentNode) {
        screensaverRef.current.parentNode.removeChild(screensaverRef.current);
        screensaverRef.current = null;
      }

      const leftoverScreensavers =
        container?.querySelectorAll(".screensaver") || [];
      leftoverScreensavers.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };

    const startAnimation = async () => {
      if (!isDesktop) return;

      stopAnimation();

      await preloadImages();

      stopAnimation();

      screensaverElement = document.createElement("div");
      screensaverElement.classList.add("screensaver");
      screensaverElement.setAttribute("data-timestamp", Date.now().toString());
      container.appendChild(screensaverElement);
      screensaverRef.current = screensaverElement;

      const containerRect = container.getBoundingClientRect();
      let posX = containerRect.width / 2 - config.size / 2;
      let posY = containerRect.height / 2 - config.size / 2;

      let velX = (Math.random() > 0.5 ? 1 : -1) * config.speed;
      let velY = (Math.random() > 0.5 ? 1 : -1) * config.speed;

      let currentImageIndex = 1;

      screensaverElement.style.width = `${config.size}px`;
      screensaverElement.style.height = `${config.size}px`;
      screensaverElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
      screensaverElement.style.left = `${posX}px`;
      screensaverElement.style.top = `${posY}px`;

      const changeImage = () => {
        currentImageIndex = (currentImageIndex % config.imageCount) + 1;
        screensaverElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
      };

      let canChangeDirection = true;

      const animate = () => {
        if (
          !screensaverElement ||
          !screensaverElement.parentNode ||
          !isDesktop ||
          (container &&
            container.getElementsByClassName("screensaver").length > 1)
        ) {
          stopAnimation();
          return;
        }

        const containerRect = container.getBoundingClientRect();

        posX += velX;
        posY += velY;

        const leftEdge = config.edgeOffset;
        const rightEdge =
          containerRect.width - config.size + Math.abs(config.edgeOffset);
        const topEdge = config.edgeOffset;
        const bottomEdge =
          containerRect.height - config.size + Math.abs(config.edgeOffset);

        if (posX <= leftEdge || posX >= rightEdge) {
          if (canChangeDirection) {
            velX = -velX;
            changeImage();
            posX = posX <= leftEdge ? leftEdge : rightEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        if (posY <= topEdge || posY >= bottomEdge) {
          if (canChangeDirection) {
            velY = -velY;
            changeImage();
            posY = posY <= topEdge ? topEdge : bottomEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        screensaverElement.style.left = `${posX}px`;
        screensaverElement.style.top = `${posY}px`;

        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth >= 1000;

      if (isDesktop && !wasDesktop) {
        startAnimation();
      } else if (!isDesktop && wasDesktop) {
        stopAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    if (isDesktop) {
      startAnimation();
    }

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="contact screensaver-container" ref={containerRef}>
      <div className="contact-copy">
        <div className="contact-col">
          <Copy delay={0.8}>
            <h1>Prêt pour un nouveau défi ?</h1>
          </Copy>
        </div>

        <div className="contact-col">
          <div className="contact-group">
            <Copy delay={0.8}>
              <p className="sm">Focus</p>
              <p>Développement Web</p>
              <p>Intégration</p>
              <p>Maintenance</p>
            </Copy>
          </div>

          <div className="contact-group">
            <Copy delay={1.2}>
              <p className="sm">Base</p>
              <p>Dole / Besançon / Lons le Saunier, France</p>
            </Copy>
          </div>

          <div className="contact-mail">
            <Button delay={1.3} href="mailto:yulianguinand@etik.com">
              yulianguinand@etik.com
            </Button>
          </div>

          <div className="contact-group">
            <Copy delay={1.4}>
              <p className="sm">Credits</p>
              <p>Dev par Yulian G.</p>
              <p>Portfolio 2025</p>
            </Copy>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="container">
          <Copy delay={1.6} animateOnScroll={false}>
            <p className="sm">BTS SIO Option SLAM</p>
          </Copy>

          <div className="contact-socials">
            <Copy delay={1.7} animateOnScroll={false}>
              <a
                className="sm"
                href="https://www.linkedin.com/in/yulian-guinand/"
                target="_blank"
              >
                Linkedin
              </a>
            </Copy>

            <Copy delay={1.8} animateOnScroll={false}>
              <a
                className="sm"
                href="https://github.com/YulianGuinand"
                target="_blank"
              >
                Github
              </a>
            </Copy>

            <Copy delay={1.9} animateOnScroll={false}>
              <a
                className="sm"
                href="https://www.reddit.com/u/heyy_yulian/s/vXKIGk1tcP"
                target="_blank"
              >
                Reddit
              </a>
            </Copy>
          </div>
          <Copy delay={2} animateOnScroll={false}>
            <p className="sm">&copy; Yulian Guinand</p>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default Page;
