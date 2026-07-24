import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slidesData from "../data/activity.json";
import SectionHeading from "./SectionHeading";

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
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? slides[hovered] : null;

  return (
    <section
      id="activities"
      className="py-20 px-6 md:px-12 lg:px-20 xl:px-48 scroll-mt-20"
    >
      <SectionHeading
        title="Activities"
        subtitle="Community, competitions, and everything in between."
      />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[260px]">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.06 * i }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`group flex flex-col cursor-pointer ${
              TALL_CELLS.has(i) ? "row-span-2" : ""
            }`}
          >
            <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-background border border-text/10 group-hover:border-primary/30 transition-colors">
              {slide.src && (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-text/70 text-sm mt-3 text-center line-clamp-1">
              {slide.description}
            </p>
          </motion.div>
        ))}

        {/* Full-grid overlay: pops the hovered image up over every other card */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 z-30 rounded-2xl overflow-hidden bg-background border border-primary/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <img
                src={active.src}
                alt={active.alt}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-linear-to-t from-background/95 via-background/60 to-transparent">
                <p className="text-text text-center text-sm sm:text-base font-medium">
                  {active.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Activity;
