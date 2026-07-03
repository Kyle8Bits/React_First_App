import { motion } from "framer-motion";
import { Trophy } from "@phosphor-icons/react";
import projectsData from "../data/major.json";
import SectionHeading from "./SectionHeading";

const images = import.meta.glob("../assets/projects/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const projects = projectsData.map((project) => ({
  ...project,
  image: images[`../assets/projects/${project.image}`],
}));

// First two projects get full zigzag rows; the rest render as a 2-up card row
// so the image+text split never repeats more than twice in a row.
const flagship = projects.slice(0, 2);
const featured = projects.slice(2);

type Project = (typeof projects)[number];

const Badges = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-2 mb-3">
    <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded border border-text/20 text-text/60">
      {project.builtFor}
    </span>
    {project.achievement && (
      <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded bg-primary/15 text-primary border border-primary/30">
        <Trophy size={13} weight="fill" />
        {project.achievement}
      </span>
    )}
  </div>
);

const ProjectLinks = ({ project }: { project: Project }) =>
  project.link || project.github ? (
    <div className="flex flex-wrap gap-3">
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-primary text-background text-sm font-bold hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
        >
          Live Demo ↗
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border border-text/20 text-text/80 text-sm font-semibold hover:border-primary hover:text-primary active:scale-[0.98] transition-all"
        >
          View Source
        </a>
      )}
    </div>
  ) : null;

const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full border border-primary/30 text-primary/90 bg-primary/5"
      >
        {tag}
      </span>
    ))}
  </div>
);

const MajorProjects = () => {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-20 xl:px-48 scroll-mt-20">
      <SectionHeading
        title="Major Projects"
        subtitle="Award-winning builds and products I'm most proud of."
      />

      {/* Flagship rows */}
      <div className="flex flex-col gap-16 sm:gap-24">
        {flagship.map((project, i) => {
          const isReversed = i % 2 !== 0;

          return (
            <motion.div
              key={project.title}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ x: isReversed ? 40 : -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative w-full lg:w-1/2 h-[200px] sm:h-[280px] md:h-[350px] rounded-2xl overflow-hidden bg-background border border-text/10 hover:border-primary/40 transition-colors shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text/30 text-lg">
                    Image coming soon
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ x: isReversed ? -40 : 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="relative w-full lg:w-1/2"
              >
                <Badges project={project} />
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary/80 mb-3 sm:mb-4">
                  {project.event}
                </p>
                <p className="text-text/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {project.description}
                </p>
                <Tags tags={project.tags} />
                <ProjectLinks project={project} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured pair */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mt-16 sm:mt-24">
        {featured.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            className="group rounded-2xl overflow-hidden border border-text/10 bg-surface/30 hover:border-primary/40 transition-colors"
          >
            <div className="w-full h-[200px] sm:h-[240px] bg-background overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text/30 text-lg">
                  Image coming soon
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <Badges project={project} />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-text mb-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-primary/80 mb-3">
                {project.event}
              </p>
              <p className="text-text/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>
              <Tags tags={project.tags} />
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MajorProjects;
