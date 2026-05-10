/** XP earned per task completion, boosted by streak. */
export function calcXP(streak: number): number {
  const base = 10;
  const mult = Math.min(1 + streak * 0.1, 2.0);
  return Math.round(base * mult);
}

/** Level derived from cumulative XP. Level = floor(sqrt(xp/50)) + 1 */
export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

/** Total XP needed to reach a given level. */
export function xpForLevel(level: number): number {
  return 50 * (level - 1) * (level - 1);
}

/** Reward particle set for task completion animations. */
export type RewardParticle = { emoji: string; x: number; y: number; id: number };

export function makeParticles(count = 8): RewardParticle[] {
  const emojis = ["⭐", "✨", "💫", "🌟"];
  return Array.from({ length: count }, (_, i) => ({
    emoji: emojis[i % emojis.length],
    x: Math.random() * 120 - 60,
    y: -(30 + Math.random() * 60),
    id: Date.now() + i,
  }));
}
