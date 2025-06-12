import Layout from '../components/global/Layout';
import HeroDisco from '../components/worlds/disco-ascension/HeroDisco';
import AudioPlayerDisco from '../components/worlds/disco-ascension/AudioPlayerDisco';
import IncidentLog from '../components/worlds/disco-ascension/IncidentLog';
import TracklistDisco from '../components/worlds/disco-ascension/TracklistDisco';
import ShareCTA from '../components/worlds/disco-ascension/ShareCTA';
import { heroContent, tracklist, incidentLog } from '../content/discoAscensionData';

export default function DiscoAscension() {
  return (
    <Layout>
      <HeroDisco content={heroContent} />
      <div className="container space-y-12 starfield">
        <AudioPlayerDisco src="https://example.com/audio.mp3" incidents={incidentLog} />
        <IncidentLog log={incidentLog} />
        <TracklistDisco tracks={tracklist} />
      </div>
      <ShareCTA />
    </Layout>
  );
}
