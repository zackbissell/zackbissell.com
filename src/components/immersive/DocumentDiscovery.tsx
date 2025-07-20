import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Lock, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Shield,
  Terminal,
  X
} from 'lucide-react';

interface ClassifiedDocumentProps {
  title: string;
  content: string;
  classificationLevel: 'CLASSIFIED' | 'SECRET' | 'TOP SECRET' | 'EYES ONLY';
  partiallyVisible?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ClassifiedDocument: React.FC<ClassifiedDocumentProps> = ({
  title,
  content,
  classificationLevel,
  partiallyVisible = false,
  onClick,
  children
}) => {
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [brieflyVisible, setBrieflyVisible] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowAccessDenied(true);
      setTimeout(() => setShowAccessDenied(false), 2000);
    }
  };

  const handleHover = () => {
    setIsHovered(true);
    if (partiallyVisible) {
      setBrieflyVisible(true);
      setTimeout(() => setBrieflyVisible(false), 1500);
    }
  };

  const getClassificationColor = () => {
    switch (classificationLevel) {
      case 'CLASSIFIED': return 'border-yellow-500 bg-yellow-500/10 text-yellow-200';
      case 'SECRET': return 'border-orange-500 bg-orange-500/10 text-orange-200';
      case 'TOP SECRET': return 'border-red-500 bg-red-500/10 text-red-200';
      case 'EYES ONLY': return 'border-purple-500 bg-purple-500/10 text-purple-200';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-200';
    }
  };

  return (
    <div className="relative">
      <motion.div
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${getClassificationColor()} ${
          isHovered ? 'shadow-lg' : ''
        }`}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="font-mono text-sm font-bold">{classificationLevel}</span>
          </div>
          <Lock className="h-4 w-4 opacity-60" />
        </div>
        
        <h3 className="font-semibold mb-2 font-mono">{title}</h3>
        
        <div className="relative">
          {partiallyVisible && brieflyVisible ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm leading-relaxed"
            >
              {content}
            </motion.p>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-current opacity-20 rounded animate-pulse" />
              <div className="h-4 bg-current opacity-20 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-current opacity-20 rounded animate-pulse w-1/2" />
            </div>
          )}
        </div>

        {children}
      </motion.div>

      <AnimatePresence>
        {showAccessDenied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-red-900/90 border-2 border-red-500 rounded-lg flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-center text-red-200">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <div className="font-mono text-sm font-bold">ACCESS DENIED</div>
              <div className="text-xs opacity-80">INSUFFICIENT CLEARANCE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface RedactedTextProps {
  text: string;
  redactionLevel?: 'light' | 'medium' | 'heavy';
  revealOnHover?: boolean;
}

export const RedactedText: React.FC<RedactedTextProps> = ({
  text,
  redactionLevel = 'medium',
  revealOnHover = false
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const getRedactionPattern = () => {
    const words = text.split(' ');
    const redactionRates = {
      light: 0.3,
      medium: 0.6,
      heavy: 0.8
    };
    
    return words.map((word, index) => {
      const shouldRedact = Math.random() < redactionRates[redactionLevel];
      return {
        text: word,
        redacted: shouldRedact,
        id: index
      };
    });
  };

  const [pattern] = useState(getRedactionPattern);

  return (
    <span
      className={revealOnHover ? 'cursor-pointer' : ''}
      onMouseEnter={() => revealOnHover && setIsRevealed(true)}
      onMouseLeave={() => revealOnHover && setIsRevealed(false)}
    >
      {pattern.map((item, index) => (
        <span key={item.id}>
          {item.redacted && !isRevealed ? (
            <span className="bg-black text-black select-none px-1 mx-1 rounded">
              {'█'.repeat(Math.max(item.text.length, 2))}
            </span>
          ) : (
            <span className={isRevealed ? 'bg-yellow-500/20' : ''}>
              {item.text}
            </span>
          )}
          {index < pattern.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

interface CorruptedFileProps {
  filename: string;
  error: string;
  onClick?: () => void;
}

export const CorruptedFile: React.FC<CorruptedFileProps> = ({
  filename,
  error,
  onClick
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, Math.random() * 5000 + 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`border border-red-500 bg-red-500/5 p-4 rounded-lg cursor-pointer ${
        isGlitching ? 'animate-pulse' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      animate={isGlitching ? { x: [-1, 1, -1, 1, 0] } : {}}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="flex-1">
          <div className="font-mono text-sm text-red-200 mb-1">
            {filename}
          </div>
          <div className="text-xs text-red-400/80">
            ERROR: {error}
          </div>
        </div>
        <div className="text-red-400">
          <X className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
};

interface TerminalWindowProps {
  title: string;
  content: string[];
  isActive?: boolean;
  typewriterEffect?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  content,
  isActive = true,
  typewriterEffect = false
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (!typewriterEffect) {
      setDisplayedLines(content);
      return;
    }

    if (currentLineIndex >= content.length) return;

    const currentLine = content[currentLineIndex];
    
    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        const newLines = [...displayedLines];
        newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex);
        setDisplayedLines(newLines);
        setCurrentCharIndex(prev => prev + 1);
      }, Math.random() * 50 + 10);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
    }
  }, [currentCharIndex, currentLineIndex, content, typewriterEffect, displayedLines]);

  return (
    <div className="bg-black border border-green-500 rounded-lg overflow-hidden font-mono">
      <div className="bg-green-500/20 px-4 py-2 border-b border-green-500 flex items-center justify-between">
        <span className="text-green-400 text-sm">{title}</span>
        <div className="flex gap-1">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-500'}`} />
        </div>
      </div>
      <div className="p-4 text-green-400 text-sm max-h-64 overflow-y-auto">
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-1">
            <span className="text-green-600">$</span> {line}
            {typewriterEffect && index === currentLineIndex && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  ClassifiedDocument,
  RedactedText,
  CorruptedFile,
  TerminalWindow
};