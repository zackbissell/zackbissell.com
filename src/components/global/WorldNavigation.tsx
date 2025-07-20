import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Zap, Music, ArrowRight, Home } from 'lucide-react';

interface World {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  theme: string;
  description: string;
  available: boolean;
}

const worlds: World[] = [
  {
    id: 'disco',
    title: 'Disco Ascension',
    subtitle: 'The Classified Disco Paradox',
    path: '/disco-ascension',
    icon: AlertTriangle,
    theme: 'world-disco',
    description: 'Government conspiracy meets disco. CLASSIFIED MATERIAL.',
    available: true,
  },
  {
    id: 'nostalgia',
    title: 'Nostalgia Trap',
    subtitle: 'For the Emotionally Unstable',
    path: '/nostalgia-trap',
    icon: Heart,
    theme: 'world-nostalgia',
    description: 'Think of someone who wrecked you. Now listen.',
    available: true,
  },
  {
    id: 'rolemodel',
    title: 'Role Model',
    subtitle: 'Unhinged Excellence',
    path: '/role-model',
    icon: Zap,
    theme: 'world-rolemodel',
    description: '300 tracks, no plan, pure instinct. Caffeine and chaos.',
    available: true,
  },
  {
    id: 'elevation',
    title: 'House Work: Elevation',
    subtitle: 'Rise Above',
    path: '/house-work',
    icon: Music,
    theme: 'world-elevation',
    description: 'Genre-defying ascension. Purists may experience discomfort.',
    available: false, // Coming soon
  },
];

interface WorldNavigationProps {
  currentWorldId?: string;
  compact?: boolean;
  className?: string;
}

export const WorldNavigation: React.FC<WorldNavigationProps> = ({
  currentWorldId,
  compact = false,
  className = '',
}) => {
  const location = useLocation();

  const getCurrentWorld = () => {
    return worlds.find(world => 
      location.pathname === world.path || 
      world.id === currentWorldId
    );
  };

  const getOtherWorlds = () => {
    const current = getCurrentWorld();
    return worlds.filter(world => world.id !== current?.id);
  };

  const currentWorld = getCurrentWorld();
  const otherWorlds = getOtherWorlds();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link
          to="/"
          className="text-foreground-secondary hover:text-brand-primary transition-colors"
          title="Back to Home"
        >
          <Home className="w-5 h-5" />
        </Link>
        <span className="text-foreground-tertiary">•</span>
        {otherWorlds.slice(0, 3).map((world) => (
          <Link
            key={world.id}
            to={world.available ? world.path : '#'}
            className={`text-sm transition-colors ${
              world.available 
                ? 'text-foreground-secondary hover:text-brand-primary' 
                : 'text-foreground-quaternary cursor-not-allowed'
            }`}
          >
            {world.title}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={`py-12 ${className}`}>
      <div className="content-container">
        {/* Current World Indicator */}
        {currentWorld && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${currentWorld.theme} mb-8 p-6 rounded-xl glass-medium border border-world-primary/30`}
          >
            <div className="flex items-center gap-4">
              <currentWorld.icon className="w-8 h-8 text-world-primary" />
              <div>
                <h3 className="text-title3 text-foreground">You're in {currentWorld.title}</h3>
                <p className="text-body text-foreground-secondary">{currentWorld.subtitle}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation to Other Worlds */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-title2 text-foreground">Explore Other Worlds</h2>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground-secondary hover:text-brand-primary transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="text-body">Back to Home</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherWorlds.map((world, index) => (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {world.available ? (
                  <Link
                    to={world.path}
                    className={`${world.theme} block p-6 rounded-xl glass-light border border-world-primary/20 hover:border-world-primary/40 transition-all group hover:scale-105`}
                  >
                    <div className="flex items-start gap-4">
                      <world.icon className="w-8 h-8 text-world-primary flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title3 text-foreground mb-1 group-hover:text-world-primary transition-colors">
                          {world.title}
                        </h3>
                        <p className="text-subhead text-world-primary mb-2">
                          {world.subtitle}
                        </p>
                        <p className="text-body text-foreground-secondary text-sm">
                          {world.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-world-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ) : (
                  <div className={`${world.theme} p-6 rounded-xl glass-light border border-world-primary/10 opacity-60`}>
                    <div className="flex items-start gap-4">
                      <world.icon className="w-8 h-8 text-world-primary/50 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title3 text-foreground/70 mb-1">
                          {world.title}
                        </h3>
                        <p className="text-subhead text-world-primary/70 mb-2">
                          {world.subtitle}
                        </p>
                        <p className="text-body text-foreground-secondary/70 text-sm mb-2">
                          {world.description}
                        </p>
                        <span className="text-caption text-world-primary/80 font-semibold">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 glass-light rounded-xl border border-foreground/10"
        >
          <h3 className="text-title3 text-foreground mb-4">Your Journey Progress</h3>
          <div className="flex items-center gap-2 mb-4">
            {worlds.map((world, index) => (
              <div key={world.id} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    world.id === currentWorldId
                      ? 'bg-brand-primary'
                      : world.available
                      ? 'bg-foreground-tertiary'
                      : 'bg-foreground-quaternary'
                  }`}
                />
                {index < worlds.length - 1 && (
                  <div className="w-8 h-0.5 bg-foreground-quaternary mx-2" />
                )}
              </div>
            ))}
          </div>
          <p className="text-body text-foreground-secondary">
            Discovered {worlds.filter(w => w.available).length} of {worlds.length} worlds
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WorldNavigation;