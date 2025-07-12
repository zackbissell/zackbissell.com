import { DiscoAudioPlayer } from '../../ui/AudioPlayer';

interface Incident {
  time: string;
  event: string;
  details: string;
}

interface Props {
  src: string;
  incidents: Incident[];
}

export default function AudioPlayerDisco({ src, incidents }: Props) {
  return (
    <div className="world-disco">
      <DiscoAudioPlayer
        src={src}
        title="Disco Ascension"
        artist="Zack Bissell"
        duration="55:32"
        incidents={incidents}
        showVisualizer={true}
        autoplay={false}
      />
    </div>
  );
}
