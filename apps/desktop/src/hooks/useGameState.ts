import { useState, useEffect, useCallback, useRef } from 'react';

export type GameState = 'idle' | 'upset' | 'walking' | 'happy' | 'victory' | 'failed';

export interface GameConfig {
  inactivityThresholdSeconds: number;
  happyThresholdSeconds: number;
  victoryThresholdSeconds: number;
  motionThreshold: number;
}

const DEFAULT_CONFIG: GameConfig = {
  inactivityThresholdSeconds: 3 * 60 * 60, // 3 hours (default)
  happyThresholdSeconds: 3, // 3s of continuous movement needed to become happy
  victoryThresholdSeconds: 3 * 60, // 3m of movement needed for victory
  motionThreshold: 5, // minimum motion score
};

export function useGameState(motionScore: number, config: GameConfig = DEFAULT_CONFIG) {
  const [state, setState] = useState<GameState>('idle');
  const [activeSeconds, setActiveSeconds] = useState(0);

  // Track continuous movement for 'happy' transition
  const continuousMovementRef = useRef(0);

  // Track inactivity timer
  const inactivityTimerRef = useRef<number | null>(null);

  // Keep latest motion score available to the interval without resetting it
  const motionScoreRef = useRef(motionScore);
  useEffect(() => {
    motionScoreRef.current = motionScore;
  }, [motionScore]);

  // Stats for victory toast
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [estimatedCalories, setEstimatedCalories] = useState(0);

  const startInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = window.setTimeout(() => {
        setState('upset');
    }, config.inactivityThresholdSeconds * 1000);
  }, [config.inactivityThresholdSeconds]);

  // Initial startup timer
  useEffect(() => {
      startInactivityTimer();
      return () => {
          if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
      }
  }, [startInactivityTimer]);

  // Evaluate motion loop (ticks every second roughly)
  useEffect(() => {
    if (state === 'idle' || state === 'failed') return; // Do nothing if we aren't active yet

    const timer = setInterval(() => {
        if (state === 'victory') return;

        const isMoving = motionScoreRef.current >= config.motionThreshold;

        if (isMoving) {
            continuousMovementRef.current += 1;
            setActiveSeconds(prev => {
                const next = prev + 1;
                // Calculate calories (rough estimate: 4 cal / minute)
                setSessionMinutes(Math.floor(next / 60));
                setEstimatedCalories(Math.floor((next / 60) * 4));

                if (next >= config.victoryThresholdSeconds) {
                    setState('victory');
                }
                return next;
            });

            setState(currentState => {
                if (currentState === 'upset') return 'walking';
                if (currentState === 'walking' && continuousMovementRef.current >= config.happyThresholdSeconds) {
                    return 'happy';
                }
                return currentState;
            });

        } else {
            // Not moving
            continuousMovementRef.current = 0;
            setState(currentState => {
                if (currentState === 'walking' || currentState === 'happy') {
                    return 'upset'; // Downgrade state if they stop moving
                }
                return currentState;
            });
        }

    }, 1000);

    return () => clearInterval(timer);
  }, [state, config]); // Removed motionScore from dependencies

  // Handle victory reset after some time
  useEffect(() => {
      if (state === 'victory') {
          const t = setTimeout(() => {
              setState('idle');
              setActiveSeconds(0);
              continuousMovementRef.current = 0;
              startInactivityTimer();
          }, 10000); // show victory toast for 10s
          return () => clearTimeout(t);
      }
  }, [state, startInactivityTimer]);

  const triggerUpset = () => {
      setState('upset');
      setActiveSeconds(0);
      continuousMovementRef.current = 0;
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
  };

  const resetGame = () => {
      setState('idle');
      setActiveSeconds(0);
      continuousMovementRef.current = 0;
      startInactivityTimer();
  }

  return {
      state,
      activeSeconds,
      sessionMinutes,
      estimatedCalories,
      triggerUpset,
      resetGame
  };
}
