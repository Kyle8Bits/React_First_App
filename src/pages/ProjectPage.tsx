import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projectsData from "../data/project.json";

const DEFAULT_TITLE = "Kyle Mai | Software Engineer";

const images = import.meta.glob("../assets/projects/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type StackGroup = { label: string; items: string[] };
type Metric = { value: string; label: string };
type ProjectRecord = (typeof projectsData)[number] & {
  problem?: string;
  approach?: string;
  role?: string;
  timeline?: string;
  outcome?: string;
  stack?: StackGroup[];
  metrics?: Metric[];
  submission?: string;
};

const projects: ProjectRecord[] = projectsData.map((project) => ({
  ...(project as ProjectRecord),
  image: images[`../assets/projects/${project.image}`],
}));

const SectionBlock = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="mb-10 sm:mb-14"
  >
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">
      {eyebrow}
    </p>
    {title && (
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-text mb-4">
        {title}
      </h2>
    )}
    {children}
  </motion.section>
);

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} | Kyle Mai`;
    }
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-text">Project not found</h1>
        <Link to="/" className="text-primary hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const hasMeta = project.role || project.timeline || project.builtFor;

  return (
    <div className="min-h-[100dvh] px-6 md:px-12 lg:px-20 xl:px-48 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-text/50 hover:text-primary transition-colors mb-8"
      >
        &larr; Back to home
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded border border-text/20 text-text/60">
            {project.builtFor}
          </span>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-text mb-4 sm:mb-6 leading-[1.05]"
        >
          {project.title}
        </motion.h1>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full border border-primary/40 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.link || project.github || project.submission) && (
          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
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
                View Source on GitHub
              </a>
            )}
            {project.submission && (
              <a
                href={project.submission}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-text/20 text-text/80 text-sm font-semibold hover:border-primary hover:text-primary active:scale-[0.98] transition-all"
              >
                View Submission ↗
              </a>
            )}
          </div>
        )}

        {/* Cover image */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full h-[200px] sm:h-[320px] md:h-[440px] rounded-2xl overflow-hidden bg-background border border-text/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-10 sm:mb-14"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text/30 text-lg">
              Image coming soon
            </div>
          )}
        </motion.div>

        {/* Meta strip (role, timeline, built-for) */}
        {hasMeta && (project.role || project.timeline) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14 p-5 sm:p-6 rounded-2xl border border-text/10 bg-surface/40">
            {project.role && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text/40 mb-1">
                  Role
                </p>
                <p className="text-text text-sm sm:text-base">{project.role}</p>
              </div>
            )}
            {project.timeline && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text/40 mb-1">
                  Timeline
                </p>
                <p className="text-text text-sm sm:text-base">
                  {project.timeline}
                </p>
              </div>
            )}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text/40 mb-1">
                Context
              </p>
              <p className="text-text text-sm sm:text-base">
                {project.builtFor}
              </p>
            </div>
          </div>
        )}

        {/* Overview */}
        <SectionBlock eyebrow="Overview">
          <p className="text-text/75 text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>
        </SectionBlock>

        {/* Case-study fields — render only when present */}
        {project.problem && (
          <SectionBlock eyebrow="Problem" title="The gap I set out to close">
            <p className="text-text/75 text-base leading-relaxed">
              {project.problem}
            </p>
          </SectionBlock>
        )}

        {project.approach && (
          <SectionBlock eyebrow="Approach" title="How I built it">
            <p className="text-text/75 text-base leading-relaxed whitespace-pre-line">
              {project.approach}
            </p>
          </SectionBlock>
        )}

        {project.stack && project.stack.length > 0 && (
          <SectionBlock eyebrow="Stack" title="Tools & technologies">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.stack.map((group) => (
                <div
                  key={group.label}
                  className="p-5 rounded-xl border border-text/10 bg-surface/40"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-full border border-text/15 text-text/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <SectionBlock eyebrow="Impact" title="By the numbers">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-xl border border-primary/25 bg-primary/5 text-center"
                >
                  <p className="font-display text-2xl sm:text-3xl font-bold text-primary">
                    {m.value}
                  </p>
                  <p className="text-text/60 text-xs sm:text-sm mt-1">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {project.outcome && (
          <SectionBlock eyebrow="Outcome" title="What shipped">
            <p className="text-text/75 text-base leading-relaxed whitespace-pre-line">
              {project.outcome}
            </p>
          </SectionBlock>
        )}

        {/* Footer nav */}
        <div className="mt-14 pt-8 border-t border-text/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-text/60 hover:text-primary transition-colors text-sm"
          >
            &larr; Back to all projects
          </Link>
          <p className="text-text/40 text-xs">
            Press <kbd className="px-1.5 py-0.5 rounded bg-text/10 text-[10px]">⌘K</kbd> to jump anywhere
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
