export type PetState = "idle" | "disturbed" | "happy" | "floating" | "thinking" | "sleeping" | "chatting" | "training";

export interface StateMachineContext {
  state: PetState;
  isLocked: boolean;
  isInactive: boolean;
  isMoving: boolean;
  movementDuration: number;
  targetDuration: number;
  strictMode: boolean;
  isResting?: boolean;
}

export interface StateMachineResult {
  nextState: PetState;
  nextIsLocked: boolean;
  shouldStartMovement: boolean;
  shouldResetMovement: boolean;
  shouldCompleteMovement: boolean;
}

export function computeNextState(context: StateMachineContext): StateMachineResult {
  const { state, isLocked, isInactive, isMoving, movementDuration, targetDuration, strictMode, isResting } = context;
  
  let nextState = state;
  let nextIsLocked = isLocked;
  let shouldStartMovement = false;
  let shouldResetMovement = false;
  let shouldCompleteMovement = false;

  // Manual overrides for sleeping, chatting, and training (transient states)
  if (isResting) {
    return {
      nextState: "sleeping",
      nextIsLocked: false,
      shouldStartMovement: false,
      shouldResetMovement: true,
      shouldCompleteMovement: false
    };
  }

  // chatting and training are states managed by App.tsx, but we should handle them here
  if (state === "chatting" || state === "training") {
    if (state === "training") {
      if (isMoving) {
        if (movementDuration === 0) {
          shouldStartMovement = true;
        } else if (movementDuration >= targetDuration) {
          nextState = "floating";
          nextIsLocked = false;
          shouldCompleteMovement = true;
        }
      } else {
        if (movementDuration > 0) {
          shouldResetMovement = true;
        }
      }
    }

    return {
      nextState,
      nextIsLocked: isLocked,
      shouldStartMovement,
      shouldResetMovement,
      shouldCompleteMovement
    };
  }

  // If we were sleeping and stopped resting, go to idle
  if (state === "sleeping" && !isResting) {
    nextState = "idle";
  }

  // Transition from idle to disturbed
  if (state === "idle" && isInactive) {
    nextState = "disturbed";
    if (strictMode) {
      nextIsLocked = true;
    }
  }

  // Handle disturbed state logic
  if (state === "disturbed") {
    if (isMoving) {
      if (movementDuration === 0) {
        shouldStartMovement = true;
      } else if (movementDuration >= targetDuration) {
        nextState = "floating";
        nextIsLocked = false;
        shouldCompleteMovement = true;
      }
    } else {
      if (movementDuration > 0) {
        shouldResetMovement = true;
      }
    }
  }

  // Auto-recovery if active again while in disturbed (optional/safety)
  if (state === "disturbed" && !isInactive && !isLocked) {
    nextState = "idle";
    shouldResetMovement = true;
  }

  return {
    nextState,
    nextIsLocked,
    shouldStartMovement,
    shouldResetMovement,
    shouldCompleteMovement
  };
}
