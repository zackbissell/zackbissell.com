import React, { useState, useEffect } from 'react';
import Layout from '../components/global/Layout';
import HeroDisco from '../components/worlds/disco-ascension/HeroDisco';
import AudioPlayerDisco from '../components/worlds/disco-ascension/AudioPlayerDisco';
import IncidentLog from '../components/worlds/disco-ascension/IncidentLog';
import TracklistDisco from '../components/worlds/disco-ascension/TracklistDisco';
import ShareCTA from '../components/worlds/disco-ascension/ShareCTA';
import ImmersiveWorldModal from '../components/3d/ImmersiveWorldModal';
import WorldEntryButton from '../components/ui/WorldEntryButton';
import { SecurityTheater, AccessDeniedOverlay, FakeLoading } from '../components/immersive/SecurityTheater';
import { ClassifiedDocument, RedactedText, CorruptedFile, TerminalWindow } from '../components/immersive/DocumentDiscovery';
import { MixcloudPlayer } from '../components/audio/MixcloudPlayer';
import { heroContent, tracklist, incidentLog, audioConfig } from '../content/discoAscensionData';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, FileX, Shield, Terminal, Eye } from 'lucide-react';

export default function DiscoAscensionEnhanced() {
  const [showImmersiveWorld, setShowImmersiveWorld] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [showClassifiedFiles, setShowClassifiedFiles] = useState(false);
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  const [unlockedSections, setUnlockedSections] = useState<string[]>([]);

  // Simulated classified documents that user "discovers"
  const classifiedDocuments = [
    {
      id: 'groove-singularity',
      title: 'INCIDENT REPORT: GROOVE SINGULARITY EVENT',
      content: 'Subject: Temporal anomaly detected during DJ performance in Seville. All witnesses experienced synchronized rhythmic displacement. Mochakk confirmed no key sync manipulation. Department of Groove Regulation investigating.',
      level: 'SECRET' as const,
      partiallyVisible: true
    },
    {
      id: 'etab-memo',
      title: 'INTERNAL MEMO: ALPHATHETA CONSPIRACY',
      content: 'Pioneer AlphaTheta leaked documents confirm experimental frequency manipulation technology. Effects on dance floor temporal coherence require immediate investigation. Recommend elevated surveillance of affected DJs.',
      level: 'CLASSIFIED' as const,
      partiallyVisible: false
    },
    {
      id: 'witness-testimony',
      title: 'WITNESS TESTIMONY: BROOKLYN WAREHOUSE INCIDENT',
      content: 'Multiple reports of temporal displacement during 4:45am warehouse set. Witnesses describe experiencing 1994 NYC rave simultaneously with present moment. Audio analysis reveals impossible frequency overlaps.',
      level: 'TOP SECRET' as const,
      partiallyVisible: true
    }
  ];

  const terminalLogs = [
    'Initializing Groove Regulation Protocol v2.1.7',
    'Scanning for temporal anomalies...',
    'WARNING: Multiple frequency paradoxes detected',
    'Subject: Zack Bissell - ELEVATED THREAT LEVEL',
    'Disco Ball manifestation probability: 73.4%',
    'Containment breach imminent',
    'ALERT: All personnel maintain safe distance from dance floor',
    'End of log.'
  ];

  const handleClassifiedAccess = (documentId: string) => {
    if (Math.random() > 0.7) {
      // Occasionally "grant" access
      setUnlockedSections(prev => [...prev, documentId]);
    } else {
      setShowAccessDenied(true);
      setLoadingAttempts(prev => prev + 1);
    }
  };

  useEffect(() => {
    // Random "security scan" alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const scanAlert = document.createElement('div');
        scanAlert.className = 'fixed top-16 right-4 bg-amber-900/90 border border-amber-500 text-amber-200 p-2 rounded text-xs font-mono z-40';
        scanAlert.innerHTML = 'SECURITY SCAN IN PROGRESS...';
        document.body.appendChild(scanAlert);
        
        setTimeout(() => {
          document.body.removeChild(scanAlert);
        }, 2000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SecurityTheater initialDelay={1000} showMonitoring={true}>
      <Layout>
        {/* Enhanced Hero with Security Context */}
        <div className="relative">
          <HeroDisco content={heroContent} />
          
          {/* Simulated Terminal Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="container mx-auto px-4 py-8"
          >
            <div className="max-w-2xl mx-auto">
              <TerminalWindow
                title="ETAB_CLASSIFIED_TERMINAL.exe"
                content={terminalLogs}
                typewriterEffect={true}
              />
            </div>
          </motion.div>
        </div>

        {/* 3D Experience Entry with Security Warning */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm text-center"
              >
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                Immersive experience may trigger temporal displacement
              </motion.div>
              <WorldEntryButton
                world="disco"
                variant="hero"
                showPreview={true}
                onClick={() => setShowImmersiveWorld(true)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Classified Documents Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-title2 font-bold text-foreground">
              <RedactedText text="Discovered Intelligence Files" redactionLevel="light" />
            </h2>
            <button
              onClick={() => setShowClassifiedFiles(!showClassifiedFiles)}
              className="px-4 py-2 bg-amber-900/50 border border-amber-500 text-amber-200 rounded font-mono text-sm hover:bg-amber-900/70 transition-colors"
            >
              {showClassifiedFiles ? 'HIDE' : 'ACCESS'} FILES
            </button>
          </div>

          <AnimatePresence>
            {showClassifiedFiles && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 overflow-hidden"
              >
                {classifiedDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <ClassifiedDocument
                      title={doc.title}
                      content={doc.content}
                      classificationLevel={doc.level}
                      partiallyVisible={doc.partiallyVisible}
                      onClick={() => handleClassifiedAccess(doc.id)}
                    />
                  </motion.div>
                ))}

                {/* Corrupted Files */}
                <CorruptedFile
                  filename="montauk_disco_protocols.pdf"
                  error="Data corruption detected"
                  onClick={() => setShowAccessDenied(true)}
                />

                <CorruptedFile
                  filename="groove_singularity_analysis.docx"
                  error="Access denied by security policy"
                  onClick={() => setShowAccessDenied(true)}
                />

                {/* Fake Loading Attempts */}
                {loadingAttempts > 0 && (
                  <div className="space-y-3">
                    <FakeLoading
                      label="Decrypting classified audio files..."
                      failurePoint={73}
                      onFailure={() => setShowAccessDenied(true)}
                    />
                    {loadingAttempts > 1 && (
                      <FakeLoading
                        label="Bypassing ETAB security protocols..."
                        failurePoint={45}
                        onFailure={() => setShowAccessDenied(true)}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recovered Audio File Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-title2 font-bold mb-2">
                <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                  Recovered Audio Evidence
                </span>
              </h2>
              <div className="text-amber-400 text-sm font-mono mb-2">
                STATUS: {audioConfig.recoveryNote}
              </div>
              <div className="text-gray-300 text-sm">
                {audioConfig.description}
              </div>
            </div>
            
            <MixcloudPlayer
              embedUrl={audioConfig.embedUrl}
              title={audioConfig.title}
              artist={audioConfig.artist}
              worldTheme="disco"
              classificationLevel={audioConfig.classification}
              warningMessage={audioConfig.warningMessage}
              showSecurityOverlay={false}
              onPlaybackStart={() => {
                // Trigger additional security theater elements when playback starts
                const alert = document.createElement('div');
                alert.className = 'fixed top-16 right-4 bg-red-900/90 border border-red-500 text-red-200 p-3 rounded text-sm font-mono z-50';
                alert.innerHTML = '⚠️ ANOMALOUS FREQUENCIES DETECTED<br/>Monitoring temporal stability...';
                document.body.appendChild(alert);
                
                setTimeout(() => {
                  if (document.body.contains(alert)) {
                    document.body.removeChild(alert);
                  }
                }, 4000);
              }}
              onAudioPeaks={(peaks) => {
                // Audio peaks could trigger visual effects in the future
                // For now, this provides the hook for audio-reactive visualizations
              }}
            />
          </div>
        </motion.div>

        {/* Enhanced Content with Security Context */}
        <div className="container space-y-12 starfield-crt">
          
          {/* Enhanced Incident Log with Security Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-title2 font-bold">
                <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                  Classified Incident Log
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-xs text-amber-400 font-mono">
                  CLEARANCE: COSMIC/SCI
                </div>
                <WorldEntryButton
                  world="disco"
                  variant="minimal"
                  onClick={() => setShowImmersiveWorld(true)}
                />
              </div>
            </div>
            
            <div className="relative">
              <IncidentLog log={incidentLog} />
              
              {/* Overlay showing "restricted" entries */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="text-xs text-red-400 font-mono opacity-60">
                    Additional entries require elevated clearance
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.8 }}
          >
            <TracklistDisco tracks={tracklist} />
          </motion.div>
        </div>
        
        <ShareCTA />

        {/* Security-Themed Floating Entry */}
        <WorldEntryButton
          world="disco"
          variant="floating"
          onClick={() => setShowImmersiveWorld(true)}
        />

        {/* Enhanced Immersive World Modal */}
        <ImmersiveWorldModal
          world="disco"
          isOpen={showImmersiveWorld}
          onClose={() => setShowImmersiveWorld(false)}
          worldTitle="Disco Ascension"
          worldSubtitle="The Classified Disco Paradox"
          storyContext="WARNING: Contains anomalous temporal frequencies. Department of Groove Regulation advises extreme caution. Use of protective equipment recommended."
        />

        {/* Access Denied Overlay */}
        <AccessDeniedOverlay
          isVisible={showAccessDenied}
          onDismiss={() => setShowAccessDenied(false)}
          reason="CLEARANCE LEVEL INSUFFICIENT - CONTACT ETAB ADMINISTRATOR"
        />
      </Layout>
    </SecurityTheater>
  );
}