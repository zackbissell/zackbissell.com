import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Lock, 
  Eye, 
  Terminal,
  Wifi,
  Clock,
  Activity
} from 'lucide-react';

interface SecurityTheaterProps {
  children: React.ReactNode;
  initialDelay?: number;
  showMonitoring?: boolean;
}

export const SecurityTheater: React.FC<SecurityTheaterProps> = ({ 
  children, 
  initialDelay = 2000,
  showMonitoring = true 
}) => {
  const [loadingPhase, setLoadingPhase] = useState<'connecting' | 'bypassing' | 'accessing' | 'complete'>('connecting');
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const sequence = [
      { phase: 'connecting', duration: 1000 },
      { phase: 'bypassing', duration: 1500 },
      { phase: 'accessing', duration: 800 },
      { phase: 'complete', duration: 0 }
    ];

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < sequence.length - 1) {
        timeoutId = setTimeout(() => {
          currentIndex++;
          setLoadingPhase(sequence[currentIndex].phase as 'connecting' | 'bypassing' | 'accessing' | 'complete');
          runSequence();
        }, sequence[currentIndex].duration);
      }
    };

    const initialTimeout = setTimeout(() => {
      runSequence();
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [initialDelay]);

  useEffect(() => {
    if (loadingPhase === 'complete') {
      // Show unauthorized access alert after a delay
      const alertTimeout = setTimeout(() => {
        setShowUnauthorizedAlert(true);
        setTimeout(() => setShowUnauthorizedAlert(false), 3000);
      }, 5000);

      // Start session timer
      const sessionInterval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(alertTimeout);
        clearInterval(sessionInterval);
      };
    }
  }, [loadingPhase]);

  const getLoadingText = () => {
    switch (loadingPhase) {
      case 'connecting': return 'CONNECTING TO SECURE SERVER...';
      case 'bypassing': return 'BYPASSING FIREWALL...';
      case 'accessing': return 'ACCESSING CLASSIFIED DATABASE...';
      default: return '';
    }
  };

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loadingPhase !== 'complete') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-8"
          >
            <Terminal className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          </motion.div>
          <motion.div
            className="font-mono text-green-400 text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {getLoadingText()}
          </motion.div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-400"
              initial={{ width: 0 }}
              animate={{ 
                width: loadingPhase === 'connecting' ? '25%' : 
                       loadingPhase === 'bypassing' ? '60%' : 
                       loadingPhase === 'accessing' ? '95%' : '100%'
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Unauthorized Access Alert */}
      <AnimatePresence>
        {showUnauthorizedAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-red-900/90 border border-red-500 text-red-200 p-4 rounded-lg backdrop-blur-sm max-w-sm"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold font-mono text-sm">UNAUTHORIZED ACCESS DETECTED</div>
                <div className="text-xs mt-1 opacity-90">Session monitored by ETAB Security</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Monitoring */}
      {showMonitoring && (
        <div className="fixed bottom-4 left-4 z-40 bg-black/80 border border-amber-500/30 text-amber-200 p-3 rounded font-mono text-xs backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-green-400" />
              <span>SESSION ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{formatSessionTime(sessionTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-3 w-3 text-red-400" />
              <span>MONITORED</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface AccessDeniedOverlayProps {
  isVisible: boolean;
  onDismiss: () => void;
  reason?: string;
}

export const AccessDeniedOverlay: React.FC<AccessDeniedOverlayProps> = ({
  isVisible,
  onDismiss,
  reason = "INSUFFICIENT CLEARANCE"
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-red-950 border-2 border-red-500 text-red-200 p-8 rounded-lg max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Lock className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold font-mono mb-2">ACCESS DENIED</h2>
              <p className="text-sm opacity-90 mb-4">{reason}</p>
              <p className="text-xs opacity-70 mb-6">
                Authorization required by Department of Groove Regulation
              </p>
              <button
                onClick={onDismiss}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 border border-red-600 rounded font-mono text-sm transition-colors"
              >
                ACKNOWLEDGE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FakeLoadingProps {
  label: string;
  failurePoint?: number; // 0-100
  onFailure?: () => void;
  duration?: number;
}

export const FakeLoading: React.FC<FakeLoadingProps> = ({
  label,
  failurePoint = 73,
  onFailure,
  duration = 3000
}) => {
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= failurePoint) {
          setFailed(true);
          clearInterval(interval);
          if (onFailure) {
            setTimeout(onFailure, 1000);
          }
          return prev;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [failurePoint, duration, onFailure]);

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${failed ? 'bg-red-400' : 'bg-green-400'} animate-pulse`} />
        <span className={failed ? 'text-red-400' : 'text-green-400'}>
          {failed ? `${label} - AUTHORIZATION REQUIRED` : label}
        </span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-100 ${failed ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {failed && (
        <div className="text-red-400 text-xs mt-1 opacity-80">
          ERROR: Insufficient security clearance
        </div>
      )}
    </div>
  );
};

export default SecurityTheater;