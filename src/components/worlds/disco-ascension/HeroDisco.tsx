import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface HeroProps {
  content: { title: string; tagline: string; warning: string };
}

export default function HeroDisco({ content }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center section-padding"
    >
      <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6 animate-pulse">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <span className="text-red-300 font-semibold text-sm">CLASSIFIED MATERIAL</span>
      </div>
      <h1
        className="text-heading-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-grotesque mb-4 glitch-text"
        data-text={content.title}
      >
        {content.title}
      </h1>
      <p className="text-heading-2 mb-6">{content.tagline}</p>
      <div className="max-w-xl mx-auto bg-red-900/20 border border-red-500/30 p-4 rounded">
        <p className="text-body text-red-200">{content.warning}</p>
      </div>
    </motion.section>
  );
}
