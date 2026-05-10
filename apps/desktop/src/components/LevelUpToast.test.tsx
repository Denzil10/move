import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import LevelUpToast from "./LevelUpToast";
import "@testing-library/jest-dom";

describe("LevelUpToast", () => {
  it("renders the correct level", () => {
    render(<LevelUpToast level={5} onClose={() => {}} />);
    expect(screen.getByText(/Level 5/)).toBeInTheDocument();
    expect(screen.getByText(/Level Up!/)).toBeInTheDocument();
  });

  it("calls onClose after timeout", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<LevelUpToast level={2} onClose={onClose} displayTimeout={100} />);
    
    act(() => {
      vi.advanceTimersByTime(100);
    });
    
    // Wait for the fade out animation timeout (500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("calls onClose when close button is clicked", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<LevelUpToast level={3} onClose={onClose} />);
    
    const closeButton = screen.getByText("×");
    act(() => {
      closeButton.click();
    });
    
    // Wait for the fade out animation timeout (500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
