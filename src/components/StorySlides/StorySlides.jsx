"use client";
import "./StorySlides.css";
import { useEffect, useRef } from "react";
import { stories } from "./stories.js";
import { gsap } from "gsap";
import Button from "../Button/Button.jsx";

export default function StorySlides() {
  const storiesContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !storiesContainerRef.current) return;

    let activeStory = 0;
    let storyTimeout;
    let isAnimating = false;

    const storyDuration = 4000;
    const contentUpdateDelay = 0.4;

    const storiesContainer = storiesContainerRef.current;

    function resetIndexHighlight(index) {
      const highlight = storiesContainer.querySelectorAll(
        ".index .index-highlight"
      )[index];
      if (!highlight) return;

      gsap.killTweensOf(highlight);
      gsap.to(highlight, {
        width: "100%",
        duration: 0.3,
        onStart: () => {
          gsap.to(highlight, {
            transformOrigin: "right center",
            scaleX: 0,
            duration: 0.3,
          });
        },
      });
    }

    function animateIndexHighlight(index) {
      const highlight = storiesContainer.querySelectorAll(
        ".index .index-highlight"
      )[index];
      if (!highlight) return;

      gsap.set(highlight, {
        width: "0%",
        scaleX: 1,
        transformOrigin: "right center",
      });
      gsap.to(highlight, {
        width: "100%",
        duration: storyDuration / 1000,
        ease: "none",
      });
    }

    function animateNewImage(imgContainer) {
      gsap.set(imgContainer, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      });
      gsap.to(imgContainer, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power4.out",
      });
    }

    function animateImageScale(currentImg, upcomingImg) {
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        },
      });

      tl.fromTo(
        currentImg,
        { scale: 1, rotate: 0 },
        {
          scale: 2,
          rotate: -25,
          duration: 1,
          ease: "power4.out",
          onComplete: () => {
            if (currentImg.parentElement) {
              currentImg.parentElement.remove();
            }
          },
        }
      );

      tl.fromTo(
        upcomingImg,
        { scale: 2, rotate: 25 },
        { scale: 1, rotate: 0, duration: 1, ease: "power4.out" },
        "<"
      );
    }

    function cleanUpElements() {
      const profileNameDiv = storiesContainer.querySelector(".profile-name");
      const titleRows = storiesContainer.querySelectorAll(".title-row");

      if (profileNameDiv) {
        while (profileNameDiv.childElementCount > 2) {
          profileNameDiv.removeChild(profileNameDiv.firstChild);
        }
      }

      if (titleRows) {
        titleRows.forEach((titleRow) => {
          while (titleRow.childElementCount > 2) {
            titleRow.removeChild(titleRow.firstChild);
          }
        });
      }
    }

    function changeStory() {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      const previousStory = activeStory;
      activeStory = (activeStory + 1) % stories.length;

      const story = stories[activeStory];

      const profileNameElements =
        storiesContainer.querySelectorAll(".profile-name p");
      if (profileNameElements.length > 0) {
        gsap.to(profileNameElements, {
          y: -24,
          duration: 0.75,
          delay: contentUpdateDelay,
          ease: "power3.out",
        });
      }

      const titleElements = storiesContainer.querySelectorAll(".title-row h1");
      if (titleElements.length > 0) {
        gsap.to(titleElements, {
          y: -48,
          duration: 0.75,
          delay: contentUpdateDelay,
          ease: "power3.out",
        });
      }

      const currentImgContainer =
        storiesContainer.querySelector(".story-img .img");
      if (!currentImgContainer) {
        isAnimating = false;
        return;
      }

      const currentImg = currentImgContainer.querySelector("img");
      if (!currentImg) {
        isAnimating = false;
        return;
      }

      setTimeout(() => {
        const profileNameDiv = storiesContainer.querySelector(".profile-name");
        if (profileNameDiv) {
          const newProfileName = document.createElement("p");
          newProfileName.innerText = story.profileName;
          newProfileName.style.transform = "translateY(24px)";

          profileNameDiv.appendChild(newProfileName);

          gsap.to(newProfileName, {
            y: 0,
            duration: 0.5,
            delay: contentUpdateDelay,
            ease: "power3.out",
          });
        }

        const titleRows = storiesContainer.querySelectorAll(".title-row");
        if (titleRows.length > 0) {
          story.title.forEach((line, index) => {
            if (titleRows[index]) {
              const newTitle = document.createElement("h1");
              newTitle.innerText = line;
              newTitle.style.transform = "translateY(48px)";
              titleRows[index].appendChild(newTitle);

              gsap.to(newTitle, {
                y: 0,
                duration: 0.75,
                delay: contentUpdateDelay,
                ease: "power3.out",
              });
            }
          });
        }

        const storyImgDiv = storiesContainer.querySelector(".story-img");
        if (storyImgDiv) {
          const newImgContainer = document.createElement("div");
          newImgContainer.classList.add("img");

          const newStoryImg = document.createElement("img");
          newStoryImg.src = story.storyImg;
          newStoryImg.alt = story.profileName;

          newImgContainer.appendChild(newStoryImg);
          storyImgDiv.appendChild(newImgContainer);

          animateNewImage(newImgContainer);
          animateImageScale(currentImg, newStoryImg);
        }

        resetIndexHighlight(previousStory);
        animateIndexHighlight(activeStory);

        cleanUpElements();

        clearTimeout(storyTimeout);
        storyTimeout = setTimeout(() => changeStory(), storyDuration);
      }, 500);

      setTimeout(() => {
        const profileImg = storiesContainer.querySelector(".profile-icon img");
        if (profileImg) {
          profileImg.src = story.profileImg;
        }

        const link = storiesContainer.querySelector(".link a");
        if (link) {
          link.href = story.linkSrc;
          const labelEl = link.querySelector(".button-label");
          if (labelEl) {
            labelEl.textContent = story.linkLabel;
          } else {
            link.textContent = story.linkLabel;
          }
        }
      }, 600);
    }

    function handleClick() {
      if (isAnimating) {
        return;
      }

      clearTimeout(storyTimeout);
      resetIndexHighlight(activeStory);
      changeStory();
    }

    storiesContainer.addEventListener("click", handleClick);

    storyTimeout = setTimeout(() => changeStory(), storyDuration);
    animateIndexHighlight(activeStory);

    return () => {
      storiesContainer.removeEventListener("click", handleClick);
      clearTimeout(storyTimeout);
      gsap.killTweensOf(storiesContainer.querySelectorAll("*"));
    };
  }, []);

  return (
    <div className="stories-container stories" ref={storiesContainerRef}>
      <div className="story-img">
        <div className="img">
          <img src="/stories/story-1.jpg" alt="" />
        </div>
      </div>

      <div className="stories-footer">
        <div className="container">
          <p className="sm">Creative Index</p>
          <p className="sm">( Since 2025 )</p>
        </div>
      </div>

      <div className="story-content">
        <div className="row">
          <div className="indices">
            {stories.map((_, index) => (
              <div className="index" key={`index-${index}`}>
                <div className="index-highlight"></div>
              </div>
            ))}
          </div>

          <div className="profile">
            <div className="profile-icon">
              <img src="/stories/profile-1.png" alt="" />
            </div>

            <div className="profile-name">
              <p>Behance</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="title">
            {stories[0].title.map((line, index) => (
              <div className="title-row" key={`title-${index}`}>
                <h1>{line}</h1>
              </div>
            ))}
          </div>

          <div className="link">
            <Button variant="light" href={stories[0].linkSrc}>
              {stories[0].linkLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
