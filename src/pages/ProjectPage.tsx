import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "../data/project.json";

const DEFAULT_TITLE = "Kyle Mai | Software Engineer";

const images = import.meta.glob("../assets/projects/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const projects = projectsData.map((project) => ({
  ...project,
  image: images[`../assets/projects/${project.image}`],
}));

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

        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-text mb-4 sm:mb-6">
          {project.title}
        </h1>

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
        {(project.link || project.github) && (
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
          </div>
        )}

        {/* Image */}
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-surface border border-text/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-8 sm:mb-10">
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
        </div>

        {/* Description */}
        <p className="text-text/70 text-sm sm:text-base md:text-lg leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectPage;
