export type ItemType = 'food' | 'energy' | 'mood' | 'special' | 'buff' | 'training';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  price: number;
  icon: string;
  effect: {
    hunger?: number;
    energy?: number;
    mood?: number;
    xp?: number;
    coins?: number;
    buff?: {
      type: 'xp_boost' | 'coin_magnet' | 'mood_shield';
      durationMinutes: number;
      multiplier?: number;
    };
    training?: 'xp' | 'coins' | 'energy' | 'hunger' | 'strength';
  };
}

export const ITEMS: Item[] = [
  {
    id: 'treat',
    name: 'Small Treat',
    description: 'A tiny snack for your pet. Restores 10% hunger.',
    type: 'food',
    price: 15,
    icon: '🍪',
    effect: { hunger: 10, mood: 5 }
  },
  {
    id: 'premium_meal',
    name: 'Premium Meal',
    description: 'A hearty meal. Restores 40% hunger and boosts mood.',
    type: 'food',
    price: 50,
    icon: '🥩',
    effect: { hunger: 40, mood: 15, xp: 5 }
  },
  {
    id: 'energy_drink',
    name: 'Pet Energy',
    description: 'A quick boost for tired pets. Restores 20% energy.',
    type: 'energy',
    price: 30,
    icon: '⚡',
    effect: { energy: 20, mood: 5 }
  },
  {
    id: 'super_battery',
    name: 'Super Battery',
    description: 'High capacity energy cell. Restores 60% energy.',
    type: 'energy',
    price: 80,
    icon: '🔋',
    effect: { energy: 60, mood: 10 }
  },
  {
    id: 'toy_mouse',
    name: 'Toy Mouse',
    description: 'Something to play with! Boosts mood significantly.',
    type: 'mood',
    price: 40,
    icon: '🐭',
    effect: { mood: 30, energy: -5 }
  },
  {
    id: 'xp_manual',
    name: 'XP Manual',
    description: 'Learn to learn! Start a training session for XP boost.',
    type: 'training',
    price: 200,
    icon: '📚',
    effect: { training: 'xp' }
  },
  {
    id: 'coin_manual',
    name: 'Coin Manual',
    description: 'Financial literacy for pets. Start training for Coin boost.',
    type: 'training',
    price: 200,
    icon: '💰',
    effect: { training: 'coins' }
  },
  {
    id: 'energy_manual',
    name: 'Endurance Guide',
    description: 'Go further! Start training for Energy efficiency.',
    type: 'training',
    price: 200,
    icon: '🏃',
    effect: { training: 'energy' }
  },
  {
    id: 'hunger_manual',
    name: 'Fasting Arts',
    description: 'Control your appetite. Start training for Hunger resilience.',
    type: 'training',
    price: 200,
    icon: '🧘',
    effect: { training: 'hunger' }
  },
  {
    id: 'strength_manual',
    name: 'Strength Manual',
    description: 'Build those muscles! Start training for better calorie burn.',
    type: 'training',
    price: 250,
    icon: '🏋️',
    effect: { training: 'strength' }
  },
  {
    id: 'xp_elixir',
    name: 'XP Elixir',
    description: 'A glowing blue potion. Grants 2x XP for 30 minutes.',
    type: 'buff',
    price: 120,
    icon: '🧪',
    effect: { buff: { type: 'xp_boost', durationMinutes: 30, multiplier: 2 } }
  },
  {
    id: 'coin_magnet_item',
    name: 'Coin Magnet',
    description: 'Attracts shiny things. Grants 1.5x Coins for 20 minutes.',
    type: 'buff',
    price: 150,
    icon: '🧲',
    effect: { buff: { type: 'coin_magnet', durationMinutes: 20, multiplier: 1.5 } }
  },
  {
    id: 'mood_shield_item',
    name: 'Mood Shield',
    description: 'Keeps your pet happy. Prevents mood decay for 60 minutes.',
    type: 'buff',
    price: 100,
    icon: '🛡️',
    effect: { buff: { type: 'mood_shield', durationMinutes: 60 } }
  },
  {
    id: 'golden_apple',
    name: 'Golden Apple',
    description: 'A legendary fruit. Restores all stats and grants XP.',
    type: 'special',
    price: 250,
    icon: '🍎',
    effect: { hunger: 100, energy: 100, mood: 100, xp: 50 }
  },
  {
    id: 'mystery_box',
    name: 'Mystery Box',
    description: 'Contains a random reward. Dare to open it?',
    type: 'special',
    price: 100,
    icon: '🎁',
    effect: { coins: 0 } // Handled specially
  }
];
