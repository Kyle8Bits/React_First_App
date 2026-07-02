import { useState } from "react";
import { motion } from "framer-motion";
import slidesData from "../data/activity.json";
import SectionHeading from "./SectionHeading";
import PhotoStoryCard from "./PhotoStoryCard";

const images = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const slides = slidesData.map((slide) => ({
  ...slide,
  src: images[`../assets/activity/${slide.src}`],
}));

// Double-height cells at positions 0 and 3 keep the 2-column collage a full
// rectangle (2+1+1+2+1+1 = 8 units = 4 rows), so the grid has no holes.
const TALL_CELLS = new Set([0, 3]);

const Activity = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTap = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="activities"
      className="py-20 px-6 md:px-12 lg:px-20 xl:px-48 scroll-mt-20"
    >
      <SectionHeading
        title="Activities"
        subtitle="Community, competitions, and everything in between."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[260px]">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.06 * i }}
            className={`flex flex-col cursor-pointer ${
              TALL_CELLS.has(i) ? "row-span-2" : ""
            }`}
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
              frameClassName="flex-1 min-h-0"
              showCaption={false}
            />
            <p className="text-text/70 text-sm mt-3 text-center line-clamp-1">
              {slide.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Activity;
