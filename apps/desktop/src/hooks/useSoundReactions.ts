import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useSoundReactions(enabled: boolean = true) {
  const [soundLevel, setSoundLevel] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setSoundLevel(0);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const level = await invoke<number>("get_sound_level");
        setSoundLevel(level);
      } catch (err) {
        console.error("Failed to get sound level:", err);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [enabled]);

  return { soundLevel };
}
