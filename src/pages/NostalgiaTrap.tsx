
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Play, Heart, AlertCircle, Clock, Music, Share } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/global/Layout';
import WorldNavigation from '../components/global/WorldNavigation';
import Tracklist from '../components/ui/Tracklist';
import { EmotionalPromptModal, MoodSelector } from '../components/ui/InteractiveModal';
import { NostalgiaAudioPlayer } from '../components/ui/AudioPlayer';
import { EmotionalBadge } from '../components/ui/badge';
import ImmersiveWorldModal from '../components/3d/ImmersiveWorldModal';
import WorldEntryButton from '../components/ui/WorldEntryButton';
import { heroContent, emotionalJourney, moodOptions, tracklist, audioData } from '../content/nostalgiaTrapData';

const NostalgiaTrap = () => {
  const [emotionalState, setEmotionalState] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('glow');
  const [hasEnteredJourney, setHasEnteredJourney] = useState(false);
  const [showImmersiveWorld, setShowImmersiveWorld] = useState(false);

  const handleEmotionalContinue = (state: string) => {
    setEmotionalState(state);
    setHasEnteredJourney(true);
    setShowPrompt(false);
  };

  const handleSkipPrompt = () => {
    setShowPrompt(false);
    setHasEnteredJourney(true);
  };

  const handleMoodSelect = (mood: string) => {
    setEmotionalState(mood);
  };

  const handleTimeUpdate = (currentTime: number) => {
    // Update current phase based on time
    const timeInSeconds = currentTime;
    if (timeInSeconds < 15 * 60) {
      setCurrentPhase('glow');
    } else if (timeInSeconds < 35 * 60) {
      setCurrentPhase('ecstasy');
    } else {
      setCurrentPhase('crash');
    }
  };

  return (
    <div className="world-nostalgia">
      <Layout>
        <Helmet>
          <title>Nostalgia Trap – A DJ Mix for the Emotionally Unstable – Zack Bissell</title>
          <meta name="description" content={heroContent.description} />
        </Helmet>

        {/* Emotional Priming Modal */}
        {showPrompt && (
          <EmotionalPromptModal 
            onContinue={handleEmotionalContinue}
            onSkip={handleSkipPrompt}
          />
        )}

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="section-padding bg-gradient-to-b from-nostalgia-primary/10 via-background to-background"
        >
          <div className="content-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <EmotionalBadge size="lg" className="mb-6">
                EMOTIONAL HAZARD
              </EmotionalBadge>
              
              <h1 className="text-large-title mb-6 bg-gradient-to-r from-nostalgia-primary via-nostalgia-secondary to-nostalgia-accent bg-clip-text text-transparent">
                {heroContent.title.toUpperCase()}
              </h1>
              <h2 className="text-title1 text-foreground-secondary mb-8">
                {heroContent.tagline}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="bg-nostalgia-primary/5 border border-nostalgia-primary/30 rounded-xl p-8 backdrop-blur-sm">
                <p className="text-body-large text-foreground mb-6 leading-relaxed">
                  {heroContent.description}
                </p>
                
                <div className="bg-nostalgia-heartbreak/10 border border-nostalgia-heartbreak/30 rounded-lg p-6 mb-6">
                  <p className="text-body text-nostalgia-heartbreak/90 leading-relaxed">
                    {heroContent.warning}
                  </p>
                </div>
                
                <p className="text-callout text-foreground-tertiary italic">
                  Listen or don't, I'm not your life coach.
                </p>
              </div>
            </motion.div>

            {/* 3D Experience Entry Point */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center"
            >
              <WorldEntryButton
                world="nostalgia"
                variant="hero"
                showPreview={true}
                onClick={() => setShowImmersiveWorld(true)}
                className="max-w-md"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Audio Player Section */}
        <section className="section-padding">
          <div className="content-container">
            <NostalgiaAudioPlayer
              src={audioData.soundcloudId}
              title={heroContent.title}
              artist="Zack Bissell"
              duration={audioData.duration}
              showVisualizer={hasEnteredJourney}
              onTimeUpdate={handleTimeUpdate}
              autoplay={false}
            />
          </div>
        </section>

        {/* Emotional Journey Architecture */}
        <section className="section-padding">
          <div className="content-container">
            <div className="flex items-center justify-between mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-title1 text-foreground"
              >
                The <span className="bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent">Emotional Architecture</span>
              </motion.h2>
              
              <WorldEntryButton
                world="nostalgia"
                variant="minimal"
                onClick={() => setShowImmersiveWorld(true)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {emotionalJourney.phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`text-center p-6 rounded-xl border transition-all duration-300 ${
                    currentPhase === phase.id 
                      ? 'border-nostalgia-primary bg-nostalgia-primary/10 emotion-pulse' 
                      : 'border-foreground/20 bg-foreground/5'
                  }`}
                >
                  <div className="text-4xl mb-4">{phase.emoji}</div>
                  <h3 className="text-title3 text-foreground mb-4">{phase.title}</h3>
                  <p className="text-body text-foreground-secondary mb-3">
                    {phase.description}
                  </p>
                  <p className="text-caption text-nostalgia-primary font-medium">
                    {phase.timeRange}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-nostalgia-primary/5 border border-nostalgia-primary/30 rounded-xl p-8 text-center backdrop-blur-sm"
            >
              <p className="text-body-large text-foreground leading-relaxed">
                It's a back-and-forth, never-ending loop that nostalgia refuses to let go.
                <br />
                <span className="text-nostalgia-accent font-semibold">This isn't therapy. It's a musical exorcism.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Mood Selector */}
        <section className="section-padding">
          <div className="content-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-nostalgia-primary/5 border border-nostalgia-primary/30 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="text-center mb-8">
                <h3 className="text-title2 mb-4 text-foreground">How Are You Feeling Right Now?</h3>
                <p className="text-body text-foreground-secondary">
                  Nostalgia hits different for everyone. Where are you in the loop?
                </p>
              </div>
              
              <MoodSelector
                moods={moodOptions}
                onMoodSelect={handleMoodSelect}
                selectedMood={emotionalState}
              />
              
              {emotionalState && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-nostalgia-heartbreak/10 border border-nostalgia-heartbreak/30 rounded-lg p-4"
                >
                  <p className="text-body text-nostalgia-heartbreak/90">
                    {emotionalState === 'missing' && "The trap is working. Let it wash over you."}
                    {emotionalState === 'dancing' && "That's the spirit. Dance through the feelings."}
                    {emotionalState === 'over-it' && "Good for you. But are you really though?"}
                    {emotionalState === 'confused' && "Welcome to the human experience. Embrace the chaos."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Tracklist Section */}
        <section className="section-padding bg-gradient-to-b from-background to-nostalgia-primary/5">
          <div className="content-container">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-title1 text-center mb-16 text-foreground"
            >
              The <span className="bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent">Emotional Roadmap</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-nostalgia-primary/5 border border-nostalgia-primary/30 rounded-xl p-8 backdrop-blur-sm"
            >
              <Tracklist
                tracks={tracklist}
                showPhase={true}
                showNarrative={true}
                itemClassName="hover:bg-nostalgia-primary/10 group transition-all duration-300"
                indexClassName="bg-nostalgia-primary/20 text-nostalgia-primary group-hover:bg-nostalgia-primary/30"
                timeClassName="text-nostalgia-accent"
                phaseClassName="text-nostalgia-secondary font-medium"
                narrativeClassName="text-foreground-tertiary italic text-sm"
              />

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 p-6 bg-nostalgia-heartbreak/10 border border-nostalgia-heartbreak/30 rounded-xl"
              >
                <EmotionalBadge size="sm" className="mb-3">
                  SIDE EFFECTS WARNING
                </EmotionalBadge>
                <p className="text-nostalgia-heartbreak/90 text-body leading-relaxed">
                  <strong>Known side effects include:</strong> Sudden urges to text exes, spontaneous crying on dance floors, 
                  increased Spotify stalking, phantom vibrations from their notifications, and the inexplicable need to block 
                  and unblock people at 3am.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Share CTA Section */}
        <section className="section-padding bg-gradient-to-b from-nostalgia-primary/5 to-background">
          <div className="content-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-title1 mb-8 text-foreground">
                Share the <span className="bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent">Emotional Chaos</span>
              </h2>
              <p className="text-body-large text-foreground-secondary mb-12 leading-relaxed">
                Send this to someone who needs to feel their feelings (or avoid them completely).
                <br />
                <span className="text-nostalgia-accent font-medium">Warning: May cause uncontrollable nostalgia loops.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-nostalgia-primary text-white rounded-lg hover:bg-nostalgia-primary/80 transition-colors font-semibold emotion-pulse"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Nostalgia Trap - A DJ Mix for the Emotionally Unstable',
                        text: 'Think of someone who left you wrecked. Hold that thought. Feel it in your chest. Now press play.',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share className="w-5 h-5" />
                  Share the Trap
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-nostalgia-primary/30 text-nostalgia-primary rounded-lg hover:bg-nostalgia-primary/10 transition-colors"
                  onClick={() => window.open('https://www.betterhelp.com', '_blank')}
                >
                  I Need Therapy Instead
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-foreground/20 text-foreground-secondary rounded-lg hover:bg-foreground/10 transition-colors"
                  onClick={() => {
                    setEmotionalState('');
                    setShowPrompt(true);
                    setCurrentPhase('glow');
                  }}
                >
                  Start Over
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-nostalgia-primary/5 border border-nostalgia-primary/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <p className="text-body text-foreground-secondary leading-relaxed">
                  "This isn't therapy. It's a musical exorcism. Sometimes you need to dance with your demons 
                  before you can let them go."
                </p>
                <p className="text-sm text-nostalgia-accent font-medium mt-2">
                  — Zack Bissell, Sonic Architect
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* World Navigation */}
        <WorldNavigation currentWorldId="nostalgia" className="bg-background-secondary" />

        {/* Floating 3D Entry */}
        <WorldEntryButton
          world="nostalgia"
          variant="floating"
          onClick={() => setShowImmersiveWorld(true)}
        />

        {/* Immersive 3D World Modal */}
        <ImmersiveWorldModal
          world="nostalgia"
          isOpen={showImmersiveWorld}
          onClose={() => setShowImmersiveWorld(false)}
          worldTitle="Nostalgia Trap"
          worldSubtitle="A DJ Mix for the Emotionally Unstable"
          storyContext="Think of someone who left you wrecked. Hold that thought. Feel it in your chest. Now press play."
        />
      </Layout>
    </div>
  );
};

export default NostalgiaTrap;
