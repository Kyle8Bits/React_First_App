import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer id="contact" className="relative mt-20 border-t border-text/10 scroll-mt-20">
      <div className="px-6 md:px-12 lg:px-20 xl:px-48 py-20 text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-text max-w-3xl mx-auto leading-tight"
        >
          Let's build something{" "}
          <span className="text-primary">great together</span>
          <span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text/60 text-sm sm:text-base max-w-xl mx-auto mt-5"
        >
          I'm currently open to internships, collaborations, and interesting
          projects. Whether you have a question or just want to say hi, my
          inbox is always open.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-8 mt-10"
        >
          <a
            href="mailto:khoamaidang2611@gmail.com"
            className="px-8 py-4 rounded-full bg-primary text-background text-sm sm:text-base font-bold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            Get in touch
          </a>
          <SocialLinks />
        </motion.div>
      </div>

      <div className="border-t border-text/10 px-6 py-6 text-center">
        <p className="text-text/40 text-xs sm:text-sm">
          © {new Date().getFullYear()} Kyle Mai (Mai Dang Khoa). Designed &
          built with React, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
