import React, { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./StrictModeOverlay.css";

interface StrictModeOverlayProps {
  isActive: boolean;
  onEscape: () => void;
}

const ESCAPE_HOLD_MS = 3000;

const StrictModeOverlay: React.FC<StrictModeOverlayProps> = ({ isActive, onEscape }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateWindowSettings = async () => {
      try {
        await invoke("set_always_on_top", { alwaysOnTop: isActive });
        if (isActive) {
          await invoke("set_ignore_cursor_events", { ignore: false });
        }
      } catch (err) {
        console.error("Failed to update window settings:", err);
      }
    };
    updateWindowSettings();
  }, [isActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isHolding) {
        setIsHolding(true);
        startTimeRef.current = Date.now();
        
        const updateProgress = () => {
          if (startTimeRef.current) {
            const elapsed = Date.now() - startTimeRef.current;
            const progress = Math.min((elapsed / ESCAPE_HOLD_MS) * 100, 100);
            setHoldProgress(progress);
            
            if (elapsed >= ESCAPE_HOLD_MS) {
              onEscape();
              resetHold();
            } else {
              timerRef.current = requestAnimationFrame(updateProgress);
            }
          }
        };
        
        timerRef.current = requestAnimationFrame(updateProgress);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetHold();
      }
    };

    const resetHold = () => {
      setIsHolding(false);
      setHoldProgress(0);
      startTimeRef.current = null;
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };

    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      // Prevent context menu to make it feel more "locked"
      window.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("contextmenu", (e) => e.preventDefault());
      resetHold();
    };
  }, [isActive, isHolding, onEscape]);

  if (!isActive) return null;

  return (
    <div className="strict-mode-overlay">
      <div className="content">
        <h2>STRICT MODE ACTIVE</h2>
        <p>Movement required to unlock your pet.</p>
        
        <div className="escape-hint">
          Hold <strong>ESC</strong> to emergency exit
        </div>

        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${holdProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StrictModeOverlay;
