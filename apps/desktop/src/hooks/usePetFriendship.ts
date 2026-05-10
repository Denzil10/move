import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type FriendshipLevel = 1 | 2 | 3 | 4 | 5;

export interface FriendshipData {
  value: number;
  level: FriendshipLevel;
  title: string;
  nextLevelValue: number;
  multiplier: number;
}

const FRIENDSHIP_LEVELS: { [key in FriendshipLevel]: { title: string, min: number, multiplier: number } } = {
  1: { title: "Acquaintance", min: 0, multiplier: 1.0 },
  2: { title: "Buddy", min: 20, multiplier: 1.05 },
  3: { title: "Close Friend", min: 45, multiplier: 1.1 },
  4: { title: "Best Friend", min: 75, multiplier: 1.15 },
  5: { title: "Soulmate", min: 100, multiplier: 1.25 }
};

export const usePetFriendship = () => {
  const [friendship, setFriendship] = useLocalStorage<number>("move-pet-friendship", 0);
  const [friendshipLevel, setFriendshipLevel] = useState<FriendshipLevel>(1);

  const getFriendshipData = useCallback((value: number): FriendshipData => {
    let level: FriendshipLevel = 1;
    if (value >= 100) level = 5;
    else if (value >= 75) level = 4;
    else if (value >= 45) level = 3;
    else if (value >= 20) level = 2;

    const currentLevelData = FRIENDSHIP_LEVELS[level];
    const nextLevel = (level < 5 ? (level + 1) : 5) as FriendshipLevel;
    const nextLevelValue = level < 5 ? FRIENDSHIP_LEVELS[nextLevel].min : 100;

    return {
      value,
      level,
      title: currentLevelData.title,
      nextLevelValue,
      multiplier: currentLevelData.multiplier
    };
  }, []);

  useEffect(() => {
    const data = getFriendshipData(friendship);
    setFriendshipLevel(data.level);
  }, [friendship, getFriendshipData]);

  const boostFriendship = (amount: number) => {
    setFriendship(prev => Math.min(100, Math.max(0, prev + amount)));
  };

  const friendshipData = getFriendshipData(friendship);

  return {
    friendship,
    friendshipLevel,
    friendshipData,
    boostFriendship
  };
};
