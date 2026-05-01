import { motion } from "framer-motion";
import projectsData from "../data/major.json";

const images = import.meta.glob("../assets/projects/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const projects = projectsData.map((project) => ({
  ...project,
  image: images[`../assets/projects/${project.image}`],
}));

const MajorProjects = () => {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-20 xl:px-48">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-text text-center mb-16"
      >
        Major Projects
      </motion.h2>

      <div className="flex flex-col gap-16 sm:gap-24">
        {projects.map((project, i) => {
          const isReversed = i % 2 !== 0;

          return (
            <motion.div
              key={i}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                initial={{ x: isReversed ? 40 : -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 h-[200px] sm:h-[280px] md:h-[350px] rounded-xl overflow-hidden bg-background border border-text/10"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text/30 text-lg">
                    Image coming soon
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ x: isReversed ? -40 : 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="w-full lg:w-1/2"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded bg-primary/15 text-primary">
                    {project.builtFor}
                  </span>
                  {project.achievement && (
                    <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded bg-text/10 text-text/60">
                      {project.achievement}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary/80 mb-3 sm:mb-4">
                  {project.event}
                </p>
                <p className="text-text/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full border border-primary/40 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MajorProjects;
