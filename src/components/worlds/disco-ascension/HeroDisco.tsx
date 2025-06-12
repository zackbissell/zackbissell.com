import { motion } from 'framer-motion';

interface HeroProps {
  content: { title: string; tagline: string; warning: string };
}

export default function HeroDisco({ content }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20"
    >
      <h1 className="text-heading-1 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-grotesque mb-4">
        {content.title}
      </h1>
      <p className="text-heading-2 mb-6">{content.tagline}</p>
      <p className="text-body text-subtle max-w-xl mx-auto">{content.warning}</p>
    </motion.section>
  );
}
