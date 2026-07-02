import { motion } from "framer-motion";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14 sm:mb-16"
    >
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text">
        {title}
        <span className="text-primary">.</span>
      </h2>
      {subtitle && (
        <p className="text-text/50 text-sm sm:text-base max-w-xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
