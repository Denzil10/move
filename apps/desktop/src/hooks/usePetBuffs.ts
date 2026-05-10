import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";

export type BuffType = 'xp_boost' | 'coin_magnet' | 'mood_shield' | 'treasure_hunt' | 'energy_surge' | 'mood_boost' | 'coin_rain' | 'focus_zen' | 'rested_bonus';

export interface Buff {
  type: BuffType;
  endTime: number;
  multiplier?: number;
}

export function usePetBuffs() {
  const [activeBuffs, setActiveBuffs] = useLocalStorage<Buff[]>("move-pet-active-buffs", []);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup expired buffs
  useEffect(() => {
    const validBuffs = activeBuffs.filter(buff => buff.endTime > currentTime);
    if (validBuffs.length !== activeBuffs.length) {
      setActiveBuffs(validBuffs);
    }
  }, [currentTime, activeBuffs, setActiveBuffs]);

  const addBuff = (type: BuffType, durationMinutes: number, multiplier?: number) => {
    const endTime = Date.now() + durationMinutes * 60 * 1000;
    
    setActiveBuffs(prev => {
      // If buff of same type exists, extend it or replace it? 
      // Let's extend if it's the same multiplier, otherwise replace if better
      const existingIdx = prev.findIndex(b => b.type === type);
      if (existingIdx !== -1) {
        const existing = prev[existingIdx];
        const newBuffs = [...prev];
        
        // If same or better multiplier, extend duration
        if (!multiplier || (existing.multiplier || 1) <= multiplier) {
          newBuffs[existingIdx] = {
            type,
            endTime: Math.max(existing.endTime, Date.now()) + durationMinutes * 60 * 1000,
            multiplier: multiplier || existing.multiplier
          };
        } else {
          // New multiplier is worse, but maybe it should still add time? 
          // For simplicity, let's just pick the best multiplier and longest time
          newBuffs[existingIdx] = {
            type,
            endTime: Math.max(existing.endTime, endTime),
            multiplier: Math.max(existing.multiplier || 1, multiplier || 1)
          };
        }
        return newBuffs;
      }
      
      return [...prev, { type, endTime, multiplier }];
    });
  };

  const hasBuff = (type: BuffType) => activeBuffs.some(b => b.type === type);
  
  const getMultiplier = (type: BuffType) => {
    const buff = activeBuffs.find(b => b.type === type);
    return buff?.multiplier || 1;
  };

  return {
    activeBuffs,
    addBuff,
    hasBuff,
    getMultiplier
  };
}
