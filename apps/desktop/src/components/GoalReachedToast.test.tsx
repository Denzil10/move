import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import GoalReachedToast from "./GoalReachedToast";
import "@testing-library/jest-dom";

describe("GoalReachedToast", () => {
  it("renders the correct goal", () => {
    render(<GoalReachedToast goal={150} onClose={() => {}} />);
    expect(screen.getByText(/Daily Goal Reached!/)).toBeInTheDocument();
    expect(screen.getByText(/150/)).toBeInTheDocument();
  });

  it("calls onClose after timeout", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<GoalReachedToast goal={100} onClose={onClose} displayTimeout={100} />);
    
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
    render(<GoalReachedToast goal={200} onClose={onClose} />);
    
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
