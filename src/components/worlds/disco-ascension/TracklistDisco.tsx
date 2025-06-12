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
    <Tracklist
      tracks={tracks.map(t => ({ title: t.redacted ? '[CLASSIFIED]' : t.title, artist: t.artist, time: t.timestamp }))}
    />
  );
}
