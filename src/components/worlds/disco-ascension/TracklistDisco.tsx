import Tracklist from '../../ui/Tracklist';

interface Track {
  number: number;
  title: string;
  artist: string;
  redacted: boolean;
  timestamp: string;
}

interface Props {
  tracks: Track[];
}

export default function TracklistDisco({ tracks }: Props) {
  return (
    <div className="world-card p-8 bg-white/5 backdrop-blur-md">
      <h3 className="text-title2 text-amber-500 mb-6">Declassified Tracklist</h3>
      <Tracklist
        tracks={tracks.map(t => ({
          title: t.redacted ? '[CLASSIFIED]' : t.title,
          artist: t.artist,
          time: t.timestamp,
        }))}
        itemClassName="hover:bg-amber-500/10"
        indexClassName="bg-amber-500/20 text-amber-400"
        timeClassName="text-red-400"
      />
    </div>
  );
}
