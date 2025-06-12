import { Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface Incident {
  time: string;
  event: string;
  details: string;
}

interface Props {
  src: string;
  incidents: Incident[];
}

function timeToSeconds(t: string) {
  const parts = t.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] * 60 + parts[1];
}

export default function AudioPlayerDisco({ src, incidents }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  return (
    <div className="world-card p-8 relative crt-overlay">
      <h3 className="text-title2 text-amber-500 mb-4">The Last Known Copy</h3>
      <audio ref={audioRef} src={src} className="w-full mb-6" controls />
      <div className="relative h-2 bg-gray-700 rounded mb-6">
        <div
          className="absolute top-0 left-0 h-2 bg-amber-500"
          style={{ width: duration ? `${(current / duration) * 100}%` : '0%' }}
        />
        {incidents.map((inc, i) => {
          const pos = duration ? (timeToSeconds(inc.time) / duration) * 100 : 0;
          return (
            <div
              key={i}
              className="absolute top-0 h-2 w-px bg-red-500"
              style={{ left: `${pos}%` }}
            />
          );
        })}
      </div>
      <div className="bg-black/40 backdrop-blur-md rounded p-6 text-center">
        <p className="text-body text-gray-300 mb-4">Mixcloud embed coming soon.</p>
        <button className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto">
          <Play className="w-8 h-8 text-amber-400" />
        </button>
      </div>
    </div>
  );
}
