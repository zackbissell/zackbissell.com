import React from 'react';
import { motion } from 'framer-motion';

export interface TrackItem {
  number?: number;
  title: string;
  artist?: string;
  time?: string;
  timestamp?: string;
  phase?: string;
  narrative?: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
}

interface TracklistProps {
  tracks: TrackItem[];
  className?: string;
  itemClassName?: string;
  indexClassName?: string;
  timeClassName?: string;
  phaseClassName?: string;
  narrativeClassName?: string;
  showPhase?: boolean;
  showNarrative?: boolean;
  showLinks?: boolean;
}

const Tracklist: React.FC<TracklistProps> = ({
  tracks,
  className = '',
  itemClassName = '',
  indexClassName = '',
  timeClassName = '',
  phaseClassName = '',
  narrativeClassName = '',
  showPhase = false,
  showNarrative = false,
  showLinks = false,
}) => {
  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'glow': return '💜';
      case 'ecstasy': return '🎵';
      case 'crash': return '⚠️';
      default: return '🎶';
    }
  };

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {tracks.map((track, index) => (
        <motion.div
          key={track.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${itemClassName}`.trim()}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm flex-shrink-0 ${indexClassName}`.trim()}
          >
            {track.number || index + 1}
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-4 mb-1">
              <div className="flex-grow min-w-0">
                <div className="text-body font-semibold text-foreground truncate">{track.title}</div>
                {track.artist && (
                  <div className="text-subhead text-foreground-secondary truncate">{track.artist}</div>
                )}
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                {showPhase && track.phase && (
                  <div className={`flex items-center gap-1 text-sm ${phaseClassName}`.trim()}>
                    <span>{getPhaseEmoji(track.phase)}</span>
                    <span className="capitalize">{track.phase}</span>
                  </div>
                )}
                {(track.time || track.timestamp) && (
                  <div className={`text-caption font-mono ${timeClassName}`.trim()}>
                    {track.timestamp || track.time}
                  </div>
                )}
              </div>
            </div>
            
            {showNarrative && track.narrative && (
              <div className={`mt-2 ${narrativeClassName}`.trim()}>
                "{track.narrative}"
              </div>
            )}
            
            {showLinks && (track.appleMusicUrl || track.spotifyUrl) && (
              <div className="flex gap-2 mt-2">
                {track.appleMusicUrl && (
                  <a
                    href={track.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 bg-foreground/10 hover:bg-foreground/20 rounded text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    Apple Music
                  </a>
                )}
                {track.spotifyUrl && (
                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 bg-foreground/10 hover:bg-foreground/20 rounded text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    Spotify
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Tracklist;
