
import React, { useState, useEffect } from 'react';
import { Play, Heart, AlertCircle, Clock, Music, Share } from 'lucide-react';
import Layout from '../components/Layout';

const NostalgiaTrap = () => {
  const [emotionalState, setEmotionalState] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showPrompt) {
        setShowPrompt(false);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [showPrompt]);

  const tracklist = [
    { artist: "Purple Disco Machine, Elderbrook", title: "I Remember (Original Mix)", time: "00:00" },
    { artist: "Crazy P", title: "Witch Doctor", time: "03:42" },
    { artist: "Anabel Englund", title: "London Headache (Purple Disco Machine Remix)", time: "07:18" },
    { artist: "Boys Noize", title: "Mvinline (Extended Mix)", time: "10:55" },
    { artist: "Sam Smith", title: "I Feel Love (DJ Beats)", time: "14:22" },
    { artist: "Shakedown", title: "At Night (New Remix)", time: "17:48" },
    { artist: "Jamiroquai", title: "Little L (Remix)", time: "21:15" },
    { artist: "Purple Disco Machine, Pink Flamingo Rhythm Revue", title: "Money Money (Original Mix)", time: "24:33" },
    { artist: "The Vision ft. Andreya Triana", title: "Heaven (Danny Krivit Edit)", time: "28:01" },
    { artist: "Junior Jack, Glory", title: "Hold Me Up (Michael Gray Extended Remix)", time: "31:28" },
    { artist: "Jackers Revenge", title: "I Love You Always Forever (Original Mix)", time: "35:15" },
    { artist: "Satin Jackets, Tensnake", title: "Last Dance (Original Mix)", time: "38:42" },
    { artist: "Todd Terje", title: "Inspector Norse", time: "42:09" },
    { artist: "Fish Go Deep & Tracey K", title: "The Cure & The Cause (The Cube Guys Remix)", time: "45:36" },
    { artist: "Duke Dumont", title: "For Club Play Only (Part 4)", time: "49:03" },
    { artist: "Moodena", title: "Moodena's Message (Original Mix)", time: "52:30" },
    { artist: "Frankie Knuckles", title: "I'll Take You There (Dimitri From Paris Re-Edit)", time: "55:57" }
  ];

  return (
    <Layout>
      {/* Emotional Prompt Overlay */}
      {showPrompt && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="world-card max-w-2xl w-full p-8 text-center animate-scale-in">
            <Heart className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-title1 mb-6 gradient-text">Before You Enter...</h2>
            <p className="text-body-large text-gray-300 mb-8 leading-relaxed">
              Think of someone who left you wrecked. Someone who's probably blocked on all your socials. 
              Hold that thought. Feel it in your chest.
            </p>
            <p className="text-body text-amber-400 mb-8 italic">
              Now press play and let nostalgia trap you.
            </p>
            <button 
              onClick={() => setShowPrompt(false)}
              className="btn-primary text-callout"
            >
              I'm Ready to Remember
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-purple-900/20 via-black to-black">
        <div className="content-container text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-6">
              <AlertCircle className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-semibold">EMOTIONAL HAZARD</span>
            </div>
            
            <h1 className="text-large-title mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              NOSTALGIA TRAP
            </h1>
            <h2 className="text-title1 text-gray-300 mb-8">
              A DJ Mix for the Emotionally Unstable
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="world-card p-8">
              <p className="text-body-large text-gray-200 leading-relaxed mb-6">
                Everyone has that person. The one who's not in your life anymore. And when you think of them, 
                the memories hit like a flood. Great memories, honestly. The kind that make you wonder why it ever ended. 
                And then you realize they're blocked on all your socials.
              </p>
              
              <p className="text-body text-gray-300 leading-relaxed mb-6">
                Welcome to <span className="text-amber-500 font-semibold">nostalgia trap</span>.
              </p>
              
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-6 mb-6">
                <p className="text-body text-purple-200 leading-relaxed">
                  The mix starts off reflective, remembering that person. What have they been up to? Have they changed, 
                  just like you? It pulls you into that feeling. It's a journey of longing, the lure of toxic love, 
                  manipulation, and the wicked ways nostalgia rewrites the past.
                </p>
              </div>
              
              <p className="text-callout text-gray-400 italic">
                Listen or don't, I'm not your life coach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Player */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <div className="content-container">
          <div className="world-card p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-title2 text-amber-500 mb-2">The Emotional Journey</h3>
                <p className="text-body text-gray-300">A back-and-forth, never-ending loop</p>
                <div className="flex items-center gap-2 mt-2 text-subheadline text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>59:14 of pure emotional chaos</span>
                </div>
              </div>
              <button className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
            </div>
            
            {/* Placeholder for audio embed */}
            <div className="bg-black/50 rounded-xl p-8 text-center border border-purple-500/20">
              <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-body text-gray-300 mb-4">Mixcloud Player Integration</p>
              <p className="text-footnote text-gray-500">Warning: May cause uncontrollable feels</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Explained */}
      <section className="section-padding bg-gray-900">
        <div className="content-container">
          <h2 className="text-title1 text-center mb-16 text-white">
            The <span className="gradient-text">Emotional Architecture</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-title3 text-white mb-4">The Glow</h3>
              <p className="text-body text-gray-300">
                You're sitting in the glow of the best days of your life, swearing they were perfect.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-title3 text-white mb-4">The Ecstasy</h3>
              <p className="text-body text-gray-300">
                Invincible on the dance floor, lost in the dizzy ecstasy of wanting someone.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-title3 text-white mb-4">The Crash</h3>
              <p className="text-body text-gray-300">
                The ecstasy wears off. And you know you're better off without them.
              </p>
            </div>
          </div>

          <div className="world-card p-8 text-center">
            <p className="text-body-large text-gray-200 leading-relaxed">
              It's a back-and-forth, never-ending loop that nostalgia refuses to let go.
              <br />
              <span className="text-amber-500 font-semibold">This isn't therapy. It's a musical exorcism.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Element - Emotional State */}
      <section className="section-padding bg-black">
        <div className="content-container">
          <div className="world-card p-8 text-center">
            <h3 className="text-title2 mb-6 text-white">How Are You Feeling Right Now?</h3>
            <p className="text-body text-gray-300 mb-8">
              Nostalgia hits different for everyone. Where are you in the loop?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Missing Them", emoji: "💔", value: "missing" },
                { label: "Dancing It Off", emoji: "💃", value: "dancing" },
                { label: "Over It", emoji: "✨", value: "over" },
                { label: "Confused AF", emoji: "🤔", value: "confused" }
              ].map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setEmotionalState(mood.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    emotionalState === mood.value 
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <div className="text-callout font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
            
            {emotionalState && (
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-6 animate-fade-in">
                <p className="text-body text-purple-200">
                  {emotionalState === 'missing' && "The trap is working. Let it wash over you."}
                  {emotionalState === 'dancing' && "That's the spirit. Dance through the feelings."}
                  {emotionalState === 'over' && "Good for you. But are you really though?"}
                  {emotionalState === 'confused' && "Welcome to the human experience. Embrace the chaos."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tracklist */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <div className="content-container">
          <h2 className="text-title1 text-center mb-16 text-white">
            The <span className="gradient-text">Emotional Roadmap</span>
          </h2>

          <div className="world-card p-8">
            <div className="space-y-4">
              {tracklist.map((track, index) => (
                <div key={index} className="flex items-center gap-4 p-4 hover:bg-purple-500/10 rounded-xl transition-colors group">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-mono text-sm group-hover:bg-purple-500/30">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="text-callout text-white font-medium">{track.title}</div>
                    <div className="text-subheadline text-gray-400">{track.artist}</div>
                  </div>
                  <div className="text-subheadline text-amber-500 font-mono">{track.time}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-red-200 text-callout">
                <strong>Side Effects:</strong> Sudden urges to text exes, spontaneous crying on dance floors, 
                increased Spotify stalking, and the inexplicable need to block and unblock people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="section-padding bg-black">
        <div className="content-container text-center">
          <h2 className="text-title1 mb-8 text-white">
            Share the <span className="gradient-text">Emotional Chaos</span>
          </h2>
          <p className="text-body-large text-gray-300 mb-8">
            Send this to someone who needs to feel their feelings (or avoid them completely).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Share className="w-5 h-5" />
              Share the Trap
            </button>
            <button className="btn-secondary">
              I Need Therapy Instead
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NostalgiaTrap;
