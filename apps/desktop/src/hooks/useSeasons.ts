import { useState, useEffect } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

export const useSeasons = () => {
  const [season, setSeason] = useState<Season>("spring");

  useEffect(() => {
    const calculateSeason = () => {
      const month = new Date().getMonth(); // 0-11 (Jan-Dec)
      
      // Northern Hemisphere (approximate)
      if (month >= 2 && month <= 4) return "spring";
      if (month >= 5 && month <= 7) return "summer";
      if (month >= 8 && month <= 10) return "autumn";
      return "winter";
    };

    setSeason(calculateSeason());
    
    // Check every day
    const interval = setInterval(() => {
      setSeason(calculateSeason());
    }, 86400000);
    
    return () => clearInterval(interval);
  }, []);

  return { season };
};
