import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { usePetState } from "./usePetState";

// Mock Tauri invoke and getCurrentWindow
vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

vi.mock("@tauri-apps/api/window", () => ({
  getCurrentWindow: vi.fn(() => ({
    onMoved: vi.fn(() => Promise.resolve(() => {})),
    outerPosition: vi.fn(() => Promise.resolve({ x: 0, y: 0 })),
  })),
}));

describe("usePetState", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should calculate average intensity during movement", () => {
    const { result, rerender } = renderHook(
      ({ motionScore }) => usePetState(true, true, 3, false, false, motionScore),
      { initialProps: { motionScore: 10 } }
    );

    // Initial state should be disturbed if isInactive is true
    expect(result.current.state).toBe("disturbed");

    // Start moving
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Change motion score and advance
    rerender({ motionScore: 50 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ motionScore: 90 });
    act(() => {
      vi.advanceTimersByTime(2900); // Complete targetDuration (3s)
    });

    // State should transition to floating then happy
    expect(result.current.state).toBe("floating");
    
    // Average should be (10 + 50 + 90*29) / 31 approximately
    // Actually it samples every 100ms. 
    // At 0ms: 10 (shouldStartMovement)
    // At 100ms: 10 (first interval)
    // At 200ms: 50 (second interval)
    // At 300ms...3100ms: 90 (rest of intervals)
    
    act(() => {
      vi.advanceTimersByTime(3000); // Complete timeouts
    });

    expect(result.current.state).toBe("idle");
    expect(result.current.showToast).toBe(true);
    expect(result.current.averageIntensity).toBeGreaterThan(50);
    expect(result.current.averageIntensity).toBeLessThan(90);
  });
});
