import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import profileImg from "../assets/me/Khoa_DEV_PNG.webp";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Activities", href: "#activities" },
];

const stats = [
  { value: "2×", label: "Hackathon Champion" },
  { value: "11+", label: "Projects Shipped" },
  { value: "1", label: "Startup Founded" },
];

const Heading = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <section className="relative overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-text/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <a href="#" className="font-display text-xl font-bold text-text tracking-wide">
          Kyle Mai<span className="text-primary">.</span>
        </a>
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden sm:flex gap-6 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-text/60 text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("command-palette:toggle"))
            }
            aria-label="Open command palette"
            className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-text/15 bg-surface/60 hover:border-primary/50 hover:text-primary text-text/50 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Quick nav</span>
            <kbd className="px-1.5 py-0.5 rounded bg-text/10 text-[10px]">⌘K</kbd>
          </button>
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-semibold rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-background active:scale-[0.98] transition-all"
          >
            Contact
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 xl:px-48 pt-24 gap-12 lg:gap-0">
        {/* Left content */}
        <div className="z-10 max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-text/15 bg-surface/60 backdrop-blur mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-text/70 text-xs font-medium tracking-wide">
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-none"
          >
            Hello<span className="text-primary">.</span>
          </motion.h1>

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center justify-center lg:justify-start gap-4 mt-6"
          >
            <span className="block w-12 h-[2px] bg-primary" />
            <p className="text-text/80 text-lg sm:text-xl lg:text-2xl">I'm Kyle</p>
          </motion.div>

          <motion.h2
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-gradient"
          >
            Software Engineer
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-text/60 text-base sm:text-lg leading-relaxed mt-6 max-w-md mx-auto lg:mx-0"
          >
            I build full-stack products, IoT systems, and AI-powered tools,
            from hackathon winners to enterprise platforms.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-primary text-background text-sm font-bold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-text/20 text-text/80 text-sm font-semibold hover:border-primary hover:text-primary active:scale-[0.98] transition-all"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Right - Profile image with decorative rings */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[560px] lg:h-[560px] shrink-0"
        >
          <div className="absolute w-[240px] sm:w-[320px] lg:w-[420px] h-[240px] sm:h-[320px] lg:h-[420px] rounded-full bg-primary/15 blur-[80px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[280px] sm:w-[360px] lg:w-[480px] h-[280px] sm:h-[360px] lg:h-[480px] rounded-full border-2 border-dashed border-primary/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[230px] sm:w-[300px] lg:w-[400px] h-[230px] sm:h-[300px] lg:h-[400px] rounded-full border-2 border-primary/20"
          />
          <div className="absolute w-[300px] sm:w-[380px] lg:w-[500px] h-[300px] sm:h-[380px] lg:h-[500px] rounded-full border-[3px] border-primary/40 top-4 left-4" />

          <img
            src={profileImg}
            alt="Kyle Mai, software engineer"
            className="relative z-10 w-[220px] sm:w-[280px] lg:w-[360px] h-[290px] sm:h-[370px] lg:h-[480px] object-cover object-top rounded-b-full"
          />
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-48 mt-16 lg:mt-8 pb-8"
      >
        <div className="grid grid-cols-3 divide-x divide-text/10 rounded-2xl border border-text/10 bg-surface/40 backdrop-blur">
          {stats.map((stat) => (
            <div key={stat.label} className="py-5 sm:py-6 text-center">
              <p className="font-display text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-text/50 text-[11px] sm:text-sm mt-1 px-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Heading;
