import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { ClassifiedBadge } from '../../ui/badge';

interface HeroProps {
  content: { title: string; tagline: string; warning: string };
}

export default function HeroDisco({ content }: HeroProps) {
  return (
    <div className="world-disco">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center section-padding"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <ClassifiedBadge size="lg">
            CLASSIFIED MATERIAL
          </ClassifiedBadge>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-large-title bg-gradient-to-r from-disco-primary via-disco-secondary to-disco-danger bg-clip-text text-transparent font-heading mb-4 glitch-text"
          data-text={content.title}
        >
          {content.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-title2 mb-8 text-foreground-secondary"
        >
          {content.tagline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-2xl mx-auto bg-disco-danger/10 border border-disco-danger/30 p-6 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-disco-danger flex-shrink-0 mt-0.5" />
            <p className="text-body text-disco-danger/90 text-left">
              {content.warning}
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
