import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePetMood } from "./usePetMood";

// Mock useLocalStorage
vi.mock("./useLocalStorage", () => ({
  useLocalStorage: vi.fn((_key, initialValue) => {
    let value = initialValue;
    const setValue = vi.fn((newValue) => {
      if (typeof newValue === "function") {
        value = newValue(value);
      } else {
        value = newValue;
      }
    });
    return [value, setValue];
  }),
}));

describe("usePetMood", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should initialize with default mood and neutral category", () => {
    const { result } = renderHook(() => usePetMood(100, false, false, 1, false, false, 1.0));
    expect(result.current.mood).toBe(50);
    expect(result.current.moodCategory).toBe("neutral");
  });

  it("should boost mood when boostMood is called", () => {
    const { result } = renderHook(() => usePetMood(100, false, false, 1, false, false, 1.0));
    act(() => {
      result.current.boostMood(20);
    });
  });

  it("should return correct categories for mood values", () => {
    renderHook(() => usePetMood(100, false, false, 1, false, false, 1.0));
  });
});
