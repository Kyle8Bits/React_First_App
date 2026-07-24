import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import prizesData from "../data/prize.json";
import SectionHeading from "./SectionHeading";

const images = import.meta.glob("../assets/award/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const prizes = prizesData.map((prize) => ({
  ...prize,
  image: images[`../assets/award/${prize.image}`],
}));

// 1 featured + N stacked: the first prize spans 2x2 in a 3-column grid, the
// rest fill the right column, so 3 items form a full rectangle with no holes.
const Awards = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? prizes[hovered] : null;

  return (
    <section id="awards" className="py-20 px-6 md:px-12 lg:px-20 xl:px-48 scroll-mt-20">
      <SectionHeading title="Awards & Titles" />

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:auto-rows-[240px]">
        {prizes.map((prize, i) => {
          const isFeatured = i === 0;

          return (
            <motion.div
              key={prize.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group flex flex-col cursor-pointer rounded-2xl overflow-hidden border border-text/10 bg-surface/30 hover:border-primary/40 transition-colors ${
                isFeatured ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`w-full flex-1 min-h-0 bg-background overflow-hidden ${
                  isFeatured ? "h-[240px] sm:h-[320px] lg:h-auto" : "h-[180px] lg:h-auto"
                }`}
              >
                {prize.image ? (
                  <img
                    src={prize.image}
                    alt={prize.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text/20 text-sm">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4">
                <p
                  className={`font-semibold text-text text-center ${
                    isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base"
                  }`}
                >
                  {prize.title}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Full-grid overlay: the hovered award pops up over every other card */}
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
              {active.image && (
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-contain"
                />
              )}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-linear-to-t from-background/95 via-background/60 to-transparent">
                <p className="text-text text-center font-semibold text-base sm:text-lg">
                  {active.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Awards;
