import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";

export const useMousePosition = (enabled: boolean, intervalMs: number = 100) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const updatePosition = async () => {
      try {
        const [x, y] = await invoke<[number, number]>("get_mouse_position");
        setPosition({ x, y });
      } catch (error) {
        console.error("Failed to get mouse position:", error);
      }
    };

    const intervalId = window.setInterval(updatePosition, intervalMs);
    updatePosition();

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled, intervalMs]);

  return position;
};
