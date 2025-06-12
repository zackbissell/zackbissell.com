import React from 'react';

export interface TrackItem {
  title: string;
  artist?: string;
  time?: string;
}

interface TracklistProps {
  tracks: TrackItem[];
  className?: string;
  itemClassName?: string;
  indexClassName?: string;
  timeClassName?: string;
}

const Tracklist: React.FC<TracklistProps> = ({
  tracks,
  className = '',
  itemClassName = '',
  indexClassName = '',
  timeClassName = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {tracks.map((track, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${itemClassName}`.trim()}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${indexClassName}`.trim()}
          >
            {index + 1}
          </div>
          <div className="flex-grow">
            <div className="text-callout text-white font-medium">{track.title}</div>
            {track.artist && (
              <div className="text-subheadline text-gray-400">{track.artist}</div>
            )}
          </div>
          {track.time && (
            <div className={`text-subheadline font-mono ${timeClassName}`.trim()}>{track.time}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tracklist;
