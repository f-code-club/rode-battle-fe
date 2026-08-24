import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type ViolationType = 'tab-hidden' | 'fullscreen-exit';

export interface IntegrityViolation {
  id: string;
  type: ViolationType;
  occurredAt: string;
}

const MAX_VIOLATIONS = 50;

function isFullscreenActive() {
  return document.fullscreenElement !== null;
}

function createViolationId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useExamIntegrity(contestId: string, problemId: string) {
  const [fullscreenSupported] = useState(() => document.fullscreenEnabled === true);
  const [phase, setPhase] = useState<'gate' | 'active'>(fullscreenSupported ? 'gate' : 'active');
  const [violations, setViolations] = useLocalStorage<IntegrityViolation[]>(
    `exam-integrity-${contestId}-${problemId}`,
    [],
  );
  const [latestViolation, setLatestViolation] = useState<IntegrityViolation | null>(null);
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);
  const containerElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!fullscreenSupported || phase !== 'active') return;

    const recordViolation = (type: ViolationType) => {
      const violation: IntegrityViolation = {
        id: createViolationId(),
        type,
        occurredAt: new Date().toISOString(),
      };
      setViolations((prev) => [...prev, violation].slice(-MAX_VIOLATIONS));
      setLatestViolation(violation);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) recordViolation('tab-hidden');
    };

    const handleFullscreenChange = () => {
      if (isFullscreenActive()) return;
      if (document.hidden) return;
      if (containerElRef.current && !containerElRef.current.isConnected) return;
      recordViolation('fullscreen-exit');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreenSupported, phase, setViolations]);

  const enterExam = async (containerEl: HTMLElement) => {
    containerElRef.current = containerEl;
    setFullscreenError(null);
    try {
      await containerEl.requestFullscreen();
      setPhase('active');
    } catch {
      setFullscreenError('Could not enter fullscreen. Please try again.');
    }
  };

  const acknowledgeViolation = async (containerEl: HTMLElement) => {
    setLatestViolation(null);
    setFullscreenError(null);
    if (isFullscreenActive()) return;
    try {
      await containerEl.requestFullscreen();
    } catch {
      setFullscreenError('Could not re-enter fullscreen. Please try again.');
    }
  };

  return { phase, violations, latestViolation, fullscreenError, enterExam, acknowledgeViolation };
}
