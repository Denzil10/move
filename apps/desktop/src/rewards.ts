export interface LevelReward {
  level: number;
  reward: string;
}

export const LEVEL_REWARDS: LevelReward[] = [
  { level: 3, reward: "Spiky Collar & Treats Shop" },
  { level: 5, reward: "Teen Evolution, Wings, Hyper & Lazy Personalities" },
  { level: 7, reward: "Tiny Hat & Energy Drinks" },
  { level: 10, reward: "Great Evolution, Grumpy Personality" },
  { level: 15, reward: "Zen Personality & Mystery Boxes" },
  { level: 20, reward: "Elder Evolution & Mood Shield" },
  { level: 25, reward: "Sparkles Aura" },
  { level: 30, reward: "Fire Particles (when disturbed)" },
  { level: 35, reward: "Glow Aura" },
  { level: 40, reward: "Ancient Evolution, Golden Glow & Master Badge" },
];
