import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInactivity } from "./useInactivity";
import { invoke } from "@tauri-apps/api/core";

// Mock Tauri invoke
vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

describe("useInactivity", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(invoke).mockResolvedValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should return idle time from tauri", async () => {
    vi.mocked(invoke).mockResolvedValue(500);
    const { result } = renderHook(() => useInactivity());
    
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.idleTime).toBe(500);

    vi.mocked(invoke).mockResolvedValue(1500);
    
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.idleTime).toBe(1500);
  });
});
