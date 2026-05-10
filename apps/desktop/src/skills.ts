export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  requiredLevel: number;
  prerequisites?: string[];
  effect: {
    type: 'xp_boost' | 'coin_boost' | 'energy_regen' | 'hunger_resistance' | 'mood_stability' | 'friendship_boost' | 'movement_efficiency';
    value: number;
  };
}

export const SKILLS: Skill[] = [
  // Tier 1: Basics
  {
    id: 'swift_learning',
    name: 'Swift Learning',
    description: 'Permanently increases XP gain by 10%.',
    icon: '📚',
    cost: 50,
    requiredLevel: 2,
    effect: { type: 'xp_boost', value: 0.1 }
  },
  {
    id: 'thrifty_pet',
    name: 'Thrifty Pet',
    description: 'Permanently increases Pet Coins earned by 10%.',
    icon: '💰',
    cost: 50,
    requiredLevel: 2,
    effect: { type: 'coin_boost', value: 0.1 }
  },
  {
    id: 'efficient_energy',
    name: 'Efficient Energy',
    description: 'Reduces energy consumption by 10%.',
    icon: '⚡',
    cost: 75,
    requiredLevel: 3,
    effect: { type: 'energy_regen', value: 0.1 }
  },

  // Tier 2: Advanced
  {
    id: 'sturdy_stomach',
    name: 'Sturdy Stomach',
    description: 'Reduces hunger decay rate by 15%.',
    icon: '🍔',
    cost: 150,
    requiredLevel: 8,
    prerequisites: ['efficient_energy'],
    effect: { type: 'hunger_resistance', value: 0.15 }
  },
  {
    id: 'happy_go_lucky',
    name: 'Happy-Go-Lucky',
    description: 'Mood decays 20% slower.',
    icon: '😊',
    cost: 150,
    requiredLevel: 8,
    prerequisites: ['swift_learning'],
    effect: { type: 'mood_stability', value: 0.2 }
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Friendship gains are increased by 25%.',
    icon: '🦋',
    cost: 200,
    requiredLevel: 10,
    prerequisites: ['thrifty_pet'],
    effect: { type: 'friendship_boost', value: 0.25 }
  },

  // Tier 3: Master
  {
    id: 'marathon_runner',
    name: 'Marathon Runner',
    description: 'Movement counts for 20% more duration.',
    icon: '🏃',
    cost: 500,
    requiredLevel: 20,
    prerequisites: ['sturdy_stomach'],
    effect: { type: 'movement_efficiency', value: 0.2 }
  },
  {
    id: 'enlightened_soul',
    name: 'Enlightened Soul',
    description: 'XP and Coin gains increased by an additional 15%.',
    icon: '✨',
    cost: 750,
    requiredLevel: 25,
    prerequisites: ['happy_go_lucky', 'social_butterfly'],
    effect: { type: 'xp_boost', value: 0.15 }
  }
];
