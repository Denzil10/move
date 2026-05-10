export interface Background {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  className: string;
  buff?: {
    type: 'mood' | 'xp' | 'energy' | 'coins' | 'calories';
    value: number;
  };
}

export const BACKGROUNDS: Background[] = [
  {
    id: 'default',
    name: 'Cozy Room',
    description: 'A simple, comfortable room for your pet.',
    icon: '🏠',
    price: 0,
    className: 'bg-cozy-room'
  },
  {
    id: 'garden',
    name: 'Zen Garden',
    description: 'A peaceful garden. Improves mood recovery by 10%.',
    icon: '🎋',
    price: 300,
    className: 'bg-zen-garden',
    buff: { type: 'mood', value: 1.1 }
  },
  {
    id: 'gym',
    name: 'Pet Gym',
    description: 'Focus on fitness! Improves XP from movement by 10%.',
    icon: '🏋️',
    price: 500,
    className: 'bg-pet-gym',
    buff: { type: 'xp', value: 1.1 }
  },
  {
    id: 'library',
    name: 'Magic Library',
    description: 'Quiet and studious. Reduces energy drain by 5%.',
    icon: '📚',
    price: 400,
    className: 'bg-magic-library',
    buff: { type: 'energy', value: 0.95 }
  },
  {
    id: 'volcano',
    name: 'Lava Cave',
    description: 'Intense heat! Increases calorie burn by 15%.',
    icon: '🌋',
    price: 600,
    className: 'bg-lava-cave',
    buff: { type: 'calories', value: 1.15 }
  },
  {
    id: 'space',
    name: 'Deep Space',
    description: 'Low gravity. Coins are easier to spot! +15% Coins.',
    icon: '🌌',
    price: 750,
    className: 'bg-deep-space',
    buff: { type: 'coins', value: 1.15 }
  }
];
