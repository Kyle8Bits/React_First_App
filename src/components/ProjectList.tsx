import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../data/project.json";
import SectionHeading from "./SectionHeading";

const images = import.meta.glob("../assets/projects/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const projects = projectsData.map((project) => ({
  ...project,
  image: images[`../assets/projects/${project.image}`],
}));

const ProjectList = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 xl:px-48">
      <SectionHeading
        title="Other Projects"
        subtitle="More things I've designed, built, and shipped. Click any project for the full story."
      />

      {/* List view (first 3) */}
      <AnimatePresence mode="wait">
        {!showAll && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl p-4 border border-text/10 bg-surface/30 hover:bg-surface/60 hover:border-primary/30 transition-colors"
                >
                  <div className="shrink-0 w-full sm:w-[150px] h-[180px] sm:h-[110px] rounded-lg overflow-hidden bg-background border border-text/10">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text/20 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-text">
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border border-text/20 text-text/60">
                        {project.builtFor}
                      </span>
                    </div>
                    <p className="text-text/50 text-xs sm:text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] sm:text-[11px] rounded-full border border-text/15 text-text/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="hidden sm:block shrink-0 text-primary/50 group-hover:text-primary transition-colors text-xl">
                    &#8599;
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Grid view (all) */}
        {showAll && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group block h-full rounded-2xl overflow-hidden border border-text/10 bg-surface/30 hover:bg-surface/60 hover:border-primary/30 transition-colors"
                >
                  <div className="w-full h-[160px] sm:h-[180px] bg-background">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text/20 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-text">
                        {project.title}
                      </h3>
                      <span className="shrink-0 text-primary/50 group-hover:text-primary transition-colors text-lg mt-1">
                        &#8599;
                      </span>
                    </div>
                    <p className="text-text/50 text-xs sm:text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border border-text/20 text-text/60">
                        {project.builtFor}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] sm:text-[11px] rounded-full border border-text/15 text-text/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(!showAll)}
          className="px-7 py-3 rounded-full border border-text/20 text-text/70 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          {showAll ? "Show less" : "Show all projects"}
        </motion.button>
      </div>
    </section>
  );
};

export default ProjectList;
