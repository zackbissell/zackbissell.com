import React, { useState } from 'react';
import Layout from '../components/global/Layout';
import WorldNavigation from '../components/global/WorldNavigation';
import HeroDisco from '../components/worlds/disco-ascension/HeroDisco';
import EnhancedAudioPlayer from '../components/audio/EnhancedAudioPlayer';
import IncidentLog from '../components/worlds/disco-ascension/IncidentLog';
import TracklistDisco from '../components/worlds/disco-ascension/TracklistDisco';
import ShareCTA from '../components/worlds/disco-ascension/ShareCTA';
import ImmersiveWorldModal from '../components/3d/ImmersiveWorldModal';
import WorldEntryButton from '../components/ui/WorldEntryButton';
import { heroContent, tracklist, incidentLog, audioConfig } from '../content/discoAscensionData';

export default function DiscoAscension() {
  const [showImmersiveWorld, setShowImmersiveWorld] = useState(false);

  return (
    <Layout>
      <HeroDisco content={heroContent} />
      
      {/* 3D Experience Entry Point */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <WorldEntryButton
            world="disco"
            variant="hero"
            showPreview={true}
            onClick={() => setShowImmersiveWorld(true)}
            className="max-w-md"
          />
        </div>
      </div>

      <div className="container space-y-12 starfield-crt">
        <EnhancedAudioPlayer
          embedUrl={audioConfig.embedUrl}
          title={audioConfig.title}
          artist={audioConfig.artist}
          worldTheme="disco"
          classificationLevel={audioConfig.classification}
          warningMessage={audioConfig.warningMessage}
          showAdvancedVisualizer={true}
          autoEnhance={true}
        />
        
        {/* Additional 3D Entry Points */}
        <div className="flex justify-between items-center">
          <h2 className="text-title2 font-bold">Classified Incident Log</h2>
          <WorldEntryButton
            world="disco"
            variant="minimal"
            onClick={() => setShowImmersiveWorld(true)}
          />
        </div>
        
        <IncidentLog log={incidentLog} />
        <TracklistDisco tracks={tracklist} />
      </div>
      
      <ShareCTA />

      {/* World Navigation */}
      <WorldNavigation currentWorldId="disco" className="bg-background-secondary" />

      {/* Floating 3D Entry */}
      <WorldEntryButton
        world="disco"
        variant="floating"
        onClick={() => setShowImmersiveWorld(true)}
      />

      {/* Immersive 3D World Modal */}
      <ImmersiveWorldModal
        world="disco"
        isOpen={showImmersiveWorld}
        onClose={() => setShowImmersiveWorld(false)}
        worldTitle="Disco Ascension"
        worldSubtitle="The Classified Disco Paradox"
        storyContext="Contains anomalous temporal frequencies. Department of Groove Regulation advises caution."
      />
    </Layout>
  );
}
