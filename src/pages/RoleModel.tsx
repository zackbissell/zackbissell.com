
import React, { useState } from 'react';
import { Play, Coffee, Zap, AlertTriangle, Clock, FileText, Radio } from 'lucide-react';
import Layout from '../components/Layout';

const RoleModel = () => {
  const [showLegalDisclaimer, setShowLegalDisclaimer] = useState(false);

  const tracklist = [
    { artist: "Mr. G", title: "All U Need", time: "00:00" },
    { artist: "Love Regenerator & Steve Lacy", title: "Live Without Your Love", time: "01:39" },
    { artist: "AYBBO", title: "Certified", time: "04:34" },
    { artist: "Mochakk", title: "NOBDO (feat. Fernanda Ouro) [Plaza Edit]", time: "08:00" },
    { artist: "Mau P", title: "Dress Code", time: "12:19" },
    { artist: "Mochakk", title: "Jealous", time: "14:44" },
    { artist: "Sam Divine (feat. Josh Barry)", title: "Saved by the Record", time: "18:29" },
    { artist: "Alec Carlsson", title: "Paris Fried Chicken (J Paul Getto Remix)", time: "21:40" },
    { artist: "K-LONE", title: "Yeah Yeah Yeah Yeah", time: "24:12" },
    { artist: "Dimitris Soukos", title: "Significant Circles", time: "28:27" },
    { artist: "AJ Christou", title: "Contagious", time: "31:34" },
    { artist: "Shermanology", title: "Sometimes", time: "32:58" },
    { artist: "Intruder (A Murk Production), JEI", title: "Amame (Fleur Shore Remix)", time: "36:05" },
    { artist: "Sidney Charles", title: "Fearless", time: "38:56" },
    { artist: "Oden & Fatzo & Poppy Baskcomb", title: "Tell Me What You Want", time: "40:39" },
    { artist: "Chaos In The CBD", title: "Echolocation", time: "43:46" },
    { artist: "Alan Fitzpatrick & Ronnie Spiteri", title: "On My Mind (Enzo Is Burning Remix)", time: "44:39" },
    { artist: "Derek Carr", title: "Revival", time: "46:14" },
    { artist: "Nasser Baker", title: "Fit Check", time: "48:09" },
    { artist: "Soulwax", title: "E Talking", time: "51:38" },
    { artist: "Mike Parker", title: "Amalgamated (Synchronous Mix)", time: "56:17" },
    { artist: "Santos", title: "One Day", time: "57:44" },
    { artist: "Fatboy Slim (feat. Dan Diamond & Luca Guerrieri)", title: "Role Model", time: "59:54" }
  ];

  return (
    <Layout>
      {/* Hero Section with Chaotic Energy */}
      <section className="section-padding bg-gradient-to-b from-yellow-900/20 via-black to-black">
        <div className="content-container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-6 animate-pulse">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">UNHINGED CONTENT</span>
            </div>
            
            <h1 className="text-large-title mb-6 bg-gradient-to-r from-yellow-400 via-amber-400 to-red-500 bg-clip-text text-transparent">
              ROLE MODEL
            </h1>
            <h2 className="text-title1 text-gray-300 mb-8">
              What Happens When Instinct Takes Over
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="world-card p-8 mb-8">
              <p className="text-body-large text-gray-200 leading-relaxed mb-6">
                There's "improvised," and then there's <span className="text-yellow-400 font-semibold">whatever this is</span>.
              </p>
              
              <p className="text-body-large text-amber-400 font-semibold mb-8">
                But it's good.
              </p>
              
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-6 mb-8">
                <p className="text-body text-yellow-200 leading-relaxed mb-4">
                  <strong>ROLE MODEL</strong> is what happens when you take 300 barely-heard tracks, no plan, 
                  a cracked-out Rekordbox session, and a carpet full of audio cables and existential dread—and decide, 
                  <span className="text-amber-400"> "Yeah. This feels like the moment."</span>
                </p>
                
                <p className="text-body text-yellow-200 leading-relaxed">
                  One take. No prep. No regrets. Just instinct, caffeine, and chaos.
                </p>
              </div>

              <div className="space-y-4 text-body text-gray-300">
                <p>It starts housey. Soulful even.</p>
                <p>Then it builds. Layers pile. Structure breaks.</p>
                <p>Around the 40-minute mark, something clicks—and by the time the E kicks in, "role model" is not just a title. <span className="text-red-400 font-semibold">It's a disclaimer</span>.</p>
              </div>
              
              <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <p className="text-red-200 text-callout italic">
                  And "Oops! All disassociations" couldn't get past the label team.
                </p>
              </div>
            </div>

            {/* Chaos Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="world-card p-6 text-center">
                <Coffee className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <div className="text-title3 text-amber-400 font-bold">∞</div>
                <div className="text-subheadline text-gray-400">Cups of Coffee</div>
              </div>
              
              <div className="world-card p-6 text-center">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-title3 text-yellow-400 font-bold">300+</div>
                <div className="text-subheadline text-gray-400">Barely-Heard Tracks</div>
              </div>
              
              <div className="world-card p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div className="text-title3 text-red-400 font-bold">1</div>
                <div className="text-subheadline text-gray-400">Take (No Prep)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Player with Warnings */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <div className="content-container">
          <div className="world-card p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-title2 text-amber-500 mb-2">The Unhinged Transmission</h3>
                <p className="text-body text-gray-300">Pure instinct. Zero filter.</p>
                <div className="flex items-center gap-2 mt-2 text-subheadline text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>62:54 of beautiful chaos</span>
                </div>
              </div>
              <button
                aria-label="Play Role Model mix"
                className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl group"
              >
                <Play className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Placeholder for audio embed */}
            <div className="bg-black/50 rounded-xl p-8 text-center border border-yellow-500/20">
              <Radio className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-body text-gray-300 mb-4">Mixcloud Player Integration</p>
              <p className="text-footnote text-gray-500">⚠️ Not approved by legal department</p>
            </div>

            {/* Warning Labels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-200 text-callout">
                  <strong>⚠️ WARNING:</strong> This is not a tutorial. 
                  Do not attempt at home without proper caffeine levels.
                </p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-200 text-callout">
                  <strong>📢 DISCLAIMER:</strong> Results may vary. 
                  Side effects include existential enlightenment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="section-padding bg-gray-900">
        <div className="content-container">
          <button 
            onClick={() => setShowLegalDisclaimer(!showLegalDisclaimer)}
            className="w-full world-card p-6 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-yellow-500" />
              <span className="text-title3 text-yellow-500">
                {showLegalDisclaimer ? 'Hide' : 'Show'} Legal Notes (Probably)
              </span>
            </div>
          </button>

          {showLegalDisclaimer && (
            <div className="mt-8 world-card p-8 font-mono text-sm animate-fade-in">
              <h3 className="text-title3 text-yellow-400 mb-6">LEGAL NOTES, PROBABLY:</h3>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>Not safe for dance floors with sprinkler systems</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>No, there isn't a clean version</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>Do not operate heavy machinery while listening</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>Results may vary</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>Talk to your doctor if chaos lasts longer than four hours</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>Not approved by the FDA, FCC, or your mother</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>May cause spontaneous dancing, existential questioning, and caffeine dependency</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200 text-callout">
                  <strong>EMERGENCY CONTACT:</strong> If you experience uncontrollable urges to quit your day job 
                  and become a DJ, please consult your local existential crisis hotline.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* The Breakdown */}
      <section className="section-padding bg-black">
        <div className="content-container">
          <h2 className="text-title1 text-center mb-16 text-white">
            The <span className="gradient-text">Chaos Timeline</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                time: "0:00-20:00",
                phase: "The Setup",
                description: "Housier vibes. You think you know where this is going. You don't.",
                mood: "🏠"
              },
              {
                time: "20:00-40:00",
                phase: "The Build",
                description: "Layers start piling. Structure begins to question itself. Reality becomes optional.",
                mood: "🔥"
              },
              {
                time: "40:00+",
                phase: "The Click",
                description: "Something clicks. The E kicks in. 'Role Model' becomes not just a title, but a lifestyle choice.",
                mood: "🚀"
              },
              {
                time: "End",
                phase: "The Aftermath",
                description: "You're different now. You understand. This is not a tutorial. This is art.",
                mood: "✨"
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="text-yellow-500 font-mono font-bold text-callout">{phase.time}</div>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className="text-2xl">{phase.mood}</div>
                </div>
                <div className="flex-grow world-card p-6">
                  <h3 className="text-title3 text-white mb-2">{phase.phase}</h3>
                  <p className="text-body text-gray-300">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracklist */}
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
        <div className="content-container">
          <h2 className="text-title1 text-center mb-16 text-white">
            The <span className="gradient-text">Barely-Heard Evidence</span>
          </h2>

          <div className="world-card p-8">
            <div className="text-center mb-8">
              <p className="text-body-large text-gray-300 italic">
                "These tracks were harmed in the making of this mix."
              </p>
            </div>

            <div className="space-y-3">
              {tracklist.map((track, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-yellow-500/10 rounded-lg transition-colors group">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-mono text-sm group-hover:bg-yellow-500/30">
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

            <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-200 text-callout">
                <strong>PRODUCER'S NOTE:</strong> Half of these tracks were discovered at 3 AM in the depths of SoundCloud. 
                The other half found me. I take no responsibility for what happened next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black">
        <div className="content-container text-center">
          <h2 className="text-title1 mb-8 text-white">
            Ready to Embrace <span className="gradient-text">Beautiful Chaos</span>?
          </h2>
          <p className="text-body-large text-gray-300 mb-8">
            Share this with someone who needs to understand that perfection is overrated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Share the Chaos
            </button>
            <button className="btn-secondary">
              I Need Structure Instead
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoleModel;
