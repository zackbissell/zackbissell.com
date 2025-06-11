import React, { useState } from 'react';
import { Play, AlertTriangle, FileText, Clock, Radio } from 'lucide-react';

// Canon narrative sourced from "Disco Ascension | A Disco House Paradox" story bible

export default function DiscoAscensionWorld() {
  const [showConspiracy, setShowConspiracy] = useState(false);

  const incidentLog = [
    {
      time: '3:15 AM',
      event: 'Disco Ball Manifestation',
      description:
        'Unexplained appearance of ethereal disco balls throughout venue',
    },
    {
      time: '3:42 AM',
      event: 'Peak Paradox Event',
      description:
        'Reality briefly reorganized itself around a perfect disco house loop',
    },
    {
      time: '4:23 AM',
      event: 'Groove Singularity',
      description:
        'All witnesses simultaneously achieved perfect synchronization',
    },
    {
      time: '5:01 AM',
      event: 'Containment Breach',
      description: 'Mix escaped into the wild. Current whereabouts: everywhere',
    },
  ];

  const tracklist = [
    'Opening Transmission - [CLASSIFIED]',
    'Temporal Loop Genesis - Artist Unknown',
    'Disco Paradox Formation - [REDACTED]',
    'Reality Restructure Sequence - Government Property',
    'The Groove Singularity - Zack Bissell Original',
    'Containment Breach Protocol - [DATA CORRUPTED]',
    'Final Transmission - Brooklyn Underground',
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-semibold">CLASSIFIED MATERIAL</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            DISCO ASCENSION
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">A Disco House Paradox</h2>

          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 mb-8">
            <p className="text-red-200 text-lg leading-relaxed">
              <strong>LISTEN WITH CAUTION:</strong> This transmission contains anomalous temporal frequencies.
              Side effects may include involuntary dancing, time dilation, and sudden urges to investigate
              government cover-ups. The Department of Groove Regulation advises against prolonged exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Audio Player */}
      <section className="py-12 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-900/50 rounded-xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-amber-500 mb-2">The Last Known Copy</h3>
                <p className="text-gray-300">Recovered from the Groove Singularity incident</p>
              </div>
              <button className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors transform hover:scale-105">
                <Play className="w-8 h-8 text-black ml-1" />
              </button>
            </div>

            {/* Placeholder for Mixcloud embed */}
            <div className="bg-black/50 rounded-lg p-8 text-center border border-amber-500/20">
              <Radio className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <p className="text-gray-300 mb-4">Mixcloud Player Integration</p>
              <p className="text-sm text-gray-500">Government-approved playback device</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conspiracy Blog Toggle */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => setShowConspiracy(!showConspiracy)}
            className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-semibold text-amber-500">
                {showConspiracy ? 'Hide' : 'Access'} Classified Research Files
              </span>
            </div>
          </button>

          {showConspiracy && (
            <div className="mt-8 bg-green-900/20 border border-green-500/30 rounded-xl p-8 font-mono text-sm">
              <div className="mb-6">
                <div className="text-green-400 mb-2">ACCESSING GOVERNMENT DATABASE...</div>
                <div className="text-green-400 mb-2">CLEARANCE LEVEL: COSMIC</div>
                <div className="text-green-400 mb-4">STATUS: DECLASSIFIED (PARTIAL)</div>
              </div>

              <h3 className="text-xl font-bold text-green-300 mb-4">INCIDENT REPORT: GROOVE SINGULARITY</h3>

              <div className="space-y-4 text-green-200">
                {incidentLog.map((incident, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-24 text-right">
                      <div className="text-amber-500 font-mono font-bold">{incident.time}</div>
                    </div>
                    <div className="flex-shrink-0 mt-2">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-2">{incident.event}</h3>
                      <p className="text-gray-300">{incident.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tracklist */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Declassified <span className="text-amber-500">Tracklist</span>
          </h2>

          <div className="bg-gray-900/50 rounded-xl p-8">
            <div className="text-center mb-8">
              <p className="text-gray-300 italic">
                "These are the frequencies that caused the anomaly. Listen with caution."
              </p>
            </div>

            <div className="space-y-3">
              {tracklist.map((track, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-amber-500/10 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-amber-500/20 rounded flex items-center justify-center text-amber-500 font-mono text-sm">
                    {index + 1}
                  </div>
                  <div className="text-gray-200 font-mono">{track}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">
                <strong>WARNING:</strong> This tracklist may contain temporal inconsistencies.
                Some tracks may not exist in your timeline. Side effects include spontaneous grooving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Send to a Friend <span className="text-amber-500">Before the Timeline Collapses</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Share this transmission while you still can. The authorities are monitoring all disco house activity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-amber-400 transition-colors">
              Share the Anomaly
            </button>
            <button className="border-2 border-red-500 text-red-400 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-500 hover:text-white transition-colors">
              Report to Authorities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
