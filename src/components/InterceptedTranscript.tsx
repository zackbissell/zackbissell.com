import { useState } from "react";
import { motion } from "framer-motion";

interface InterceptedTranscriptProps {
  timestamp: string;
  speaker: string;
  text: string;
  audioSrc?: string;
}

export default function InterceptedTranscript({ timestamp, speaker, text, audioSrc }: InterceptedTranscriptProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-black border border-green-900 text-lime-300 font-mono p-6 my-10 shadow-xl max-w-3xl mx-auto relative">
      <p className="text-xs uppercase tracking-widest mb-2 text-green-500">INTERCEPTED TRANSMISSION</p>
      <p className="text-sm text-green-400 mb-1">Timestamp: {timestamp}</p>
      <p className="text-sm text-green-400 mb-4">Speaker: {speaker}</p>

      <div
        className={`transition-all duration-500 ease-in-out ${revealed ? 'blur-none' : 'blur-sm'} cursor-pointer`}
        onClick={() => setRevealed(!revealed)}
      >
        <p className="whitespace-pre-wrap text-sm">{text}</p>
      </div>

      {audioSrc && revealed && (
        <motion.audio
          controls
          className="mt-4 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </motion.audio>
      )}

      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <p className="text-green-700 text-sm">[ TAP TO DECRYPT TRANSCRIPT ]</p>
        </div>
      )}
    </div>
  );
}
