import { useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useSoundEffects() {
  const playGrumble = useCallback(async () => {
    try {
      await invoke("play_grumble");
    } catch (e) {
      console.warn("Rust audio error (grumble)", e);
    }
  }, []);

  const playChirp = useCallback(async () => {
    try {
      await invoke("play_chirp");
    } catch (e) {
      console.warn("Rust audio error (chirp)", e);
    }
  }, []);

  const playLevelUp = useCallback(async () => {
    try {
      await invoke("play_level_up");
    } catch (e) {
      console.warn("Rust audio error (level_up)", e);
    }
  }, []);

  const playGoalReached = useCallback(async () => {
    try {
      await invoke("play_goal_reached");
    } catch (e) {
      console.warn("Rust audio error (goal_reached)", e);
    }
  }, []);

  const playItemUse = useCallback(async () => {
    try {
      await invoke("play_item_use");
    } catch (e) {
      console.warn("Rust audio error (item_use)", e);
    }
  }, []);

  return { playGrumble, playChirp, playLevelUp, playGoalReached, playItemUse };
}
