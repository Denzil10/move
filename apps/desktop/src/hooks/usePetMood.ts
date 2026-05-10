import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useMemo } from "react";

export type MoodCategory = "grumpy" | "neutral" | "content" | "joyful";

export function usePetMood(
  hunger: number,
  isInactive: boolean,
  isMoving: boolean,
  level: number,
  hasMoodShield: boolean = false,
  hasMoodBoost: boolean = false,
  hungerModifier: number = 1.0,
  backgroundMoodModifier: number = 1.0
) {
  const [mood, setMood] = useLocalStorage("move-pet-mood", 50);

  // Derived mood category
  const moodCategory = useMemo((): MoodCategory => {
    if (hasMoodBoost) return "joyful";
    if (mood < 25) return "grumpy";
    if (mood <= 50) return "neutral";
    if (mood < 75) return "content";
    return "joyful";
  }, [mood, hasMoodBoost]);

  // Mood decay and growth logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMood(prev => {
        let change = 0;

        if (!hasMoodShield) {
          if (isInactive) {
            // Faster decay when inactive (pro-rated for 10s intervals)
            change -= 0.2;
          } else {
            // Slow decay even if active but not moving
            change -= 0.04;
          }

          // Hunger penalty (modified by personality)
          if (hunger < 30) {
            change -= 0.1 * hungerModifier;
          }
        }

        // Level bonus (happier pets are more resilient)
        const levelBonus = Math.min(0.1, level * 0.01);
        change += levelBonus;

        return Math.min(100, Math.max(0, prev + change));
      });
    }, 10000); // Update every 10 seconds for more responsive dynamics

    return () => clearInterval(interval);
  }, [isInactive, hunger, level, setMood, hasMoodShield, hungerModifier]);

  // Instant mood boost when moving
  useEffect(() => {
    if (isMoving) {
      // Small boost every few seconds of movement
      const interval = setInterval(() => {
        setMood(prev => Math.min(100, prev + (1 * backgroundMoodModifier)));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMoving, setMood, backgroundMoodModifier]);

  const boostMood = (amount: number) => {
    setMood(prev => Math.min(100, prev + amount));
  };

  return {
    mood,
    moodCategory,
    boostMood,
    setMood
  };
}
