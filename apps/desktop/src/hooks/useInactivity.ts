import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";

export const useInactivity = () => {
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    const checkInactivity = async () => {
      try {
        const time = await invoke<number>("get_idle_time");
        setIdleTime(time);
      } catch (error) {
        console.error("Failed to get idle time from tauri:", error);
      }
    };

    const intervalId = window.setInterval(checkInactivity, 1000); // Check every second
    checkInactivity();

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return { idleTime };
};
