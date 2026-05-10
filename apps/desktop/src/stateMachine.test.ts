import { describe, it, expect } from "vitest";
import { computeNextState, StateMachineContext } from "./stateMachine";

describe("Pet State Machine", () => {
  const baseContext: StateMachineContext = {
    state: "idle",
    isLocked: false,
    isInactive: false,
    isMoving: false,
    movementDuration: 0,
    targetDuration: 3,
    strictMode: false
  };

  it("should stay idle when active", () => {
    const result = computeNextState(baseContext);
    expect(result.nextState).toBe("idle");
    expect(result.nextIsLocked).toBe(false);
  });

  it("should transition to disturbed when inactive", () => {
    const result = computeNextState({ ...baseContext, isInactive: true });
    expect(result.nextState).toBe("disturbed");
  });

  it("should lock when inactive in strict mode", () => {
    const result = computeNextState({ ...baseContext, isInactive: true, strictMode: true });
    expect(result.nextState).toBe("disturbed");
    expect(result.nextIsLocked).toBe(true);
  });

  it("should start movement when moving in disturbed state", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "disturbed", 
      isMoving: true 
    });
    expect(result.shouldStartMovement).toBe(true);
  });

  it("should transition to floating when target duration is met", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "disturbed", 
      isInactive: true,
      isMoving: true,
      movementDuration: 3 
    });
    expect(result.nextState).toBe("floating");
    expect(result.shouldCompleteMovement).toBe(true);
  });

  it("should unlock when transitioning to floating", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "disturbed", 
      isInactive: true,
      isLocked: true,
      isMoving: true,
      movementDuration: 3 
    });
    expect(result.nextIsLocked).toBe(false);
  });

  it("should reset movement if movement stops in disturbed state", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "disturbed", 
      isMoving: false,
      movementDuration: 1 
    });
    expect(result.shouldResetMovement).toBe(true);
  });

  it("should transition to sleeping when isResting is true", () => {
    const result = computeNextState({ 
      ...baseContext, 
      isResting: true 
    });
    expect(result.nextState).toBe("sleeping");
  });

  it("should stay sleeping while isResting is true even if inactive", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "sleeping",
      isResting: true,
      isInactive: true
    });
    expect(result.nextState).toBe("sleeping");
  });

  it("should return to idle when isResting becomes false", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "sleeping",
      isResting: false
    });
    expect(result.nextState).toBe("idle");
  });

  it("should stay chatting when in chatting state", () => {
    const result = computeNextState({ 
      ...baseContext, 
      state: "chatting"
    });
    expect(result.nextState).toBe("chatting");
  });
});
