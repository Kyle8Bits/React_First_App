import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import slidesData from "../data/iam.json";
import SectionHeading from "./SectionHeading";
import PhotoStoryCard from "./PhotoStoryCard";

const images = import.meta.glob("../assets/me/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const slides = slidesData.map((slide) => ({
  ...slide,
  src: images[`../assets/me/${slide.src}`],
}));

const WhoIAm = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTap = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Two copies make the CSS marquee loop seamless; reduced motion gets a
  // single, manually scrollable set instead.
  const trackSlides = reduceMotion ? slides : [...slides, ...slides];

  return (
    <section id="about" className="py-20 overflow-hidden scroll-mt-20">
      <SectionHeading
        title="Who I Am"
        subtitle="Hover or tap a photo to see the story behind it."
      />

      <div
        className={
          reduceMotion ? "overflow-x-auto pb-4" : "relative fade-edges-x"
        }
      >
        <div
          className={`flex gap-4 sm:gap-8 w-max ${
            reduceMotion ? "px-6" : "animate-[marquee_40s_linear_infinite]"
          }`}
          style={
            reduceMotion
              ? undefined
              : { animationPlayState: activeIndex !== null ? "paused" : "running" }
          }
        >
          {trackSlides.map((slide, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-[240px] sm:w-[300px] md:w-[400px] shrink-0 cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleTap(i);
              }}
            >
              <PhotoStoryCard
                src={slide.src}
                alt={slide.alt}
                description={slide.description}
                detail={slide.detail}
                isActive={activeIndex === i}
                frameClassName="h-[280px] sm:h-[350px] md:h-[450px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIAm;
