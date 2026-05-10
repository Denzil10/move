import { useState, useEffect, useCallback } from "react";
import { PetState, computeNextState, StateMachineContext } from "../stateMachine";

export function usePetState(
  isInactive: boolean,
  isMoving: boolean,
  targetDuration: number,
  strictMode: boolean,
  isResting: boolean = false,
  motionScore: number = 0
) {
  const [state, setState] = useState<PetState>("idle");
  const [isLocked, setIsLocked] = useState(false);
  const [movementStartTime, setMovementStartTime] = useState<number | null>(null);
  const [movementDuration, setMovementDuration] = useState(0);
  const [motionSamples, setMotionSamples] = useState<number[]>([]);
  const [hasSatisfiedInactiveSession, setHasSatisfiedInactiveSession] = useState(false);

  // Stats for the toast
  const [lastMoveDuration, setLastMoveDuration] = useState(0);
  const [averageIntensity, setAverageIntensity] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const reset = useCallback(() => {
    setState("idle");
    setIsLocked(false);
    setMovementStartTime(null);
    setMovementDuration(0);
    setMotionSamples([]);
    setHasSatisfiedInactiveSession(false);
  }, []);

  useEffect(() => {
    if (!isInactive && hasSatisfiedInactiveSession) {
      setHasSatisfiedInactiveSession(false);
    }
  }, [isInactive, hasSatisfiedInactiveSession]);

  useEffect(() => {
    const effectiveIsInactive = isInactive && !hasSatisfiedInactiveSession;
    const context: StateMachineContext = {
      state,
      isLocked,
      isInactive: effectiveIsInactive,
      isMoving,
      movementDuration,
      targetDuration,
      strictMode,
      isResting
    };

    const result = computeNextState(context);

    if (result.nextState !== state) {
      setState(result.nextState);
    }

    if (result.nextIsLocked !== isLocked) {
      setIsLocked(result.nextIsLocked);
    }

    if (result.shouldStartMovement && movementStartTime === null) {
      setMovementStartTime(Date.now());
      setMotionSamples([motionScore]);
    }

    if (result.shouldResetMovement) {
      setMovementStartTime(null);
      setMovementDuration(0);
      setMotionSamples([]);
    }

    if (result.shouldCompleteMovement) {
      setLastMoveDuration(targetDuration + movementDuration);
      
      // Calculate average intensity
      if (motionSamples.length > 0) {
        const sum = motionSamples.reduce((a, b) => a + b, 0);
        setAverageIntensity(sum / motionSamples.length);
      } else {
        setAverageIntensity(motionScore);
      }

      setMovementStartTime(null);
      setMovementDuration(0);
      setMotionSamples([]);
      setHasSatisfiedInactiveSession(true);
      
    }
  }, [state, isLocked, isInactive, hasSatisfiedInactiveSession, isMoving, movementDuration, targetDuration, strictMode, isResting, motionSamples, motionScore, movementStartTime]);

  useEffect(() => {
    if (state !== "floating") {
      return;
    }

    let idleTimeout: number | undefined;
    const happyTimeout = window.setTimeout(() => {
      setState("happy");
      idleTimeout = window.setTimeout(() => {
        setState("idle");
        setShowToast(true);
      }, 1500);
    }, 1500);

    return () => {
      window.clearTimeout(happyTimeout);
      if (idleTimeout !== undefined) {
        window.clearTimeout(idleTimeout);
      }
    };
  }, [state]);

  // Update movement duration and sample motion score if moving
  useEffect(() => {
    if (movementStartTime && isMoving) {
      const interval = window.setInterval(() => {
        const elapsed = (Date.now() - movementStartTime) / 1000;
        setMovementDuration(elapsed);
        setMotionSamples(prev => [...prev, motionScore]);
      }, 100);
      return () => window.clearInterval(interval);
    }
  }, [movementStartTime, isMoving, motionScore]);

  return {
    state,
    isLocked,
    movementDuration,
    lastMoveDuration,
    averageIntensity,
    showToast,
    setShowToast,
    setState,
    setIsLocked,
    reset
  };
}
