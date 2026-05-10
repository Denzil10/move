import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should return stored value from localStorage", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("stored");
  });

  it("should update localStorage when state changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    
    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(JSON.parse(window.localStorage.getItem("test-key") || "")).toBe("updated");
  });

  it("should handle raw strings from old storage format", () => {
    window.localStorage.setItem("test-key", "raw-string");
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("raw-string");
  });

  it("should handle raw numbers from old storage format", () => {
    window.localStorage.setItem("test-key", "123");
    const { result } = renderHook(() => useLocalStorage("test-key", 0));
    expect(result.current[0]).toBe(123);
  });
});
