interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayerDisco({ src }: AudioPlayerProps) {
  return (
    <div className="border border-foreground/20 rounded-lg shadow-lg overflow-hidden aspect-video">
      <iframe
        title="Disco Ascension Mix"
        src={src}
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  );
}
