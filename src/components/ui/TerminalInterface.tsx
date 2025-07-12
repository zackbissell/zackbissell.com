import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Shield, AlertTriangle, Lock } from 'lucide-react';
import { ClassifiedBadge } from './badge';

interface TerminalEntry {
  time: string;
  event: string;
  details: string;
  classification?: 'classified' | 'restricted' | 'confidential';
}

interface TerminalInterfaceProps {
  entries: TerminalEntry[];
  title?: string;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  autoScroll?: boolean;
  typewriterSpeed?: number;
}

const classificationIcons = {
  classified: Lock,
  restricted: Shield,
  confidential: AlertTriangle,
};

const classificationColors = {
  classified: 'text-red-400',
  restricted: 'text-yellow-400',
  confidential: 'text-orange-400',
};

export default function TerminalInterface({
  entries,
  title = "CLASSIFIED RESEARCH FILES",
  isOpen = false,
  onToggle,
  autoScroll = true,
  typewriterSpeed = 50,
}: TerminalInterfaceProps) {
  const [displayedEntries, setDisplayedEntries] = useState<TerminalEntry[]>([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || entries.length === 0) return;

    setDisplayedEntries([]);
    setCurrentEntryIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  }, [isOpen, entries]);

  useEffect(() => {
    if (!isTyping || !isOpen || currentEntryIndex >= entries.length) {
      setIsTyping(false);
      return;
    }

    const currentEntry = entries[currentEntryIndex];
    const fullText = `[${currentEntry.time}] ${currentEntry.event} - ${currentEntry.details}`;

    const timer = setTimeout(() => {
      if (currentCharIndex < fullText.length) {
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Entry complete, add to displayed entries and move to next
        setDisplayedEntries(prev => [...prev, currentEntry]);
        setCurrentEntryIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        
        // Small pause between entries
        setTimeout(() => {
          if (currentEntryIndex + 1 < entries.length) {
            setIsTyping(true);
          }
        }, 500);
      }
    }, typewriterSpeed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, currentEntryIndex, entries, isTyping, isOpen, typewriterSpeed]);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedEntries, currentCharIndex, autoScroll]);

  const currentEntry = entries[currentEntryIndex];
  const currentText = currentEntry 
    ? `[${currentEntry.time}] ${currentEntry.event} - ${currentEntry.details}`.slice(0, currentCharIndex)
    : '';

  return (
    <div className="my-8">
      <motion.button
        onClick={() => onToggle?.(!isOpen)}
        className="mb-4 px-4 py-2 border border-disco-classified/30 rounded bg-disco-classified/10 font-mono text-disco-classified hover:bg-disco-classified/20 transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          {isOpen ? 'SECURE CONNECTION - DISCONNECT' : 'ACCESS CLASSIFIED RESEARCH FILES'}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="terminal-interface overflow-hidden"
          >
            {/* Terminal header */}
            <div className="border-b border-disco-classified/30 pb-2 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-disco-classified"></div>
                  <span className="ml-2 text-disco-classified/70 text-xs">SECURE TERMINAL v2.1.7</span>
                </div>
                <ClassifiedBadge size="sm">EYES ONLY</ClassifiedBadge>
              </div>
              <div className="mt-2">
                <span className="text-disco-classified">root@etab-secure:~$ </span>
                <span className="animate-typewriter overflow-hidden whitespace-nowrap">
                  access_incident_log --classification=COSMIC --clearance=ULTRA
                </span>
              </div>
              <div className="text-xs text-disco-classified/60 mt-1">
                ACCESSING GOVERNMENT DATABASE... CLEARANCE LEVEL: COSMIC
              </div>
            </div>

            {/* Terminal content */}
            <div 
              ref={scrollRef}
              className="max-h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-disco-classified/30"
            >
              <div className="text-xs text-disco-classified/80 mb-3">
                === {title} ===
              </div>

              {/* Displayed entries */}
              {displayedEntries.map((entry, index) => {
                const Icon = classificationIcons[entry.classification || 'classified'];
                const colorClass = classificationColors[entry.classification || 'classified'];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 border-b border-disco-classified/10 pb-2"
                  >
                    <Clock className="w-3 h-3 text-disco-classified/60 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-disco-classified/80 font-mono text-xs">
                          [{entry.time}]
                        </span>
                        <Icon className={`w-3 h-3 ${colorClass}`} />
                        <span className="text-disco-classified font-medium text-sm">
                          {entry.event}
                        </span>
                      </div>
                      <p className="text-disco-classified/70 text-xs pl-4">
                        {entry.details}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Currently typing entry */}
              {isTyping && currentEntry && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2"
                >
                  <Clock className="w-3 h-3 text-disco-classified/60 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-disco-classified font-mono text-sm">
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Terminal cursor when not typing */}
              {!isTyping && displayedEntries.length > 0 && (
                <div className="flex items-center gap-1 mt-4">
                  <span className="text-disco-classified">root@etab-secure:~$ </span>
                  <span className="animate-pulse text-disco-classified">_</span>
                </div>
              )}
            </div>

            {/* Terminal footer */}
            <div className="border-t border-disco-classified/30 pt-2 mt-4 text-xs text-disco-classified/60">
              <div className="flex justify-between">
                <span>Connection secured via ETAB Protocol v3.2</span>
                <span>Logged entries: {displayedEntries.length}/{entries.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Preset terminal for Disco Ascension incidents
interface Incident {
  time: string;
  event: string;
  details: string;
}

export const DiscoIncidentTerminal = ({ incidents, ...props }: { incidents: Incident[] } & Partial<TerminalInterfaceProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const terminalEntries: TerminalEntry[] = incidents.map(incident => ({
    time: incident.time,
    event: incident.event,
    details: incident.details,
    classification: 'classified' as const,
  }));

  return (
    <TerminalInterface
      entries={terminalEntries}
      title="GROOVE SINGULARITY INCIDENT LOG"
      isOpen={isOpen}
      onToggle={setIsOpen}
      {...props}
    />
  );
};