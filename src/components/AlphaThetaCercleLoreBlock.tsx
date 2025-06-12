import React from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

export default function AlphaThetaCercleLoreBlock() {
  const handleDenied = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: 'Access Denied',
      description: 'You do not have permission to access this resource.',
    });
    e.currentTarget.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 text-white border border-fuchsia-500 font-mono p-6 space-y-4"
    >
      <div className="space-y-1">
        <p className="text-xs text-fuchsia-400">TIMESTAMP: 2024-06-17T23:17:21Z</p>
        <p className="text-xs text-fuchsia-400">FROM: alpha.theta@ops</p>
        <p className="text-xs text-fuchsia-400">TO: cercle.command@lore</p>
      </div>

      <p className="text-sm">
        Rekordbox logs will show{' '}
        <a href="#metadata" className="underline text-fuchsia-300">
          Mochakk didn’t touch the Key Sync at all
        </a>
        .
      </p>

      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <code className="text-fuchsia-300">gamma_setloop_d96</code>
        </li>
        <li>Scrub the track from all playback recordings</li>
        <li>
          <a href="#" onClick={handleDenied} className="underline text-fuchsia-300">
            [REC-77:groove-lock-trigger-17a.wav]
          </a>
        </li>
        <li>
          <a href="#" onClick={handleDenied} className="underline text-fuchsia-300">
            [XM-TIMECODE/23.ALPHA]
          </a>
        </li>
      </ul>
    </motion.div>
  );
}
