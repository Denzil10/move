export interface Quest {
  id: string;
  templateId: string;
  title: string;
  description: string;
  targetType: 'movement' | 'calories' | 'time' | 'interactions' | 'streak' | 'items' | 'shopping' | 'sleep' | 'chat' | 'maintenance';
  targetValue: number;
  currentValue: number;
  rewardCoins: number;
  rewardXP: number;
  completed: boolean;
  claimed: boolean;
  expiresAt?: string;
  completedAt?: string;
}

export interface CompletedQuest extends Quest {
  completedAt: string;
}

export const QUEST_TEMPLATES = [
  {
    id: 'stretch_quest',
    title: 'Morning Stretch',
    description: 'Move for 30 seconds straight to wake up your pet!',
    targetType: 'time' as const,
    targetValue: 30,
    rewardCoins: 10,
    rewardXP: 15
  },
  {
    id: 'active_session',
    title: 'Active Session',
    description: 'Burn 20 calories in a single session.',
    targetType: 'calories' as const,
    targetValue: 20,
    rewardCoins: 15,
    rewardXP: 25
  },
  {
    id: 'marathon_move',
    title: 'Movement Marathon',
    description: 'Complete 10 movements today.',
    targetType: 'movement' as const,
    targetValue: 10,
    rewardCoins: 20,
    rewardXP: 30
  },
  {
    id: 'quick_pulse',
    title: 'Quick Pulse',
    description: 'Get moving for 10 seconds.',
    targetType: 'time' as const,
    targetValue: 10,
    rewardCoins: 5,
    rewardXP: 10
  },
  {
    id: 'social_pet',
    title: 'Social Pet',
    description: 'Interact with your pet 15 times (Pet or Poke).',
    targetType: 'interactions' as const,
    targetValue: 15,
    rewardCoins: 10,
    rewardXP: 10
  },
  {
    id: 'calorie_burst',
    title: 'Calorie Burst',
    description: 'Burn 50 total calories.',
    targetType: 'calories' as const,
    targetValue: 50,
    rewardCoins: 30,
    rewardXP: 50
  },
  {
    id: 'consistency_check',
    title: 'Consistency Check',
    description: 'Complete 5 movements to show consistency.',
    targetType: 'movement' as const,
    targetValue: 5,
    rewardCoins: 15,
    rewardXP: 20
  },
  {
    id: 'long_stretch',
    title: 'Endurance Test',
    description: 'Stay active for 60 seconds total.',
    targetType: 'time' as const,
    targetValue: 60,
    rewardCoins: 25,
    rewardXP: 40
  },
  {
    id: 'item_user',
    title: 'Item Enthusiast',
    description: 'Use 3 items from your inventory.',
    targetType: 'items' as const,
    targetValue: 3,
    rewardCoins: 20,
    rewardXP: 30
  },
  {
    id: 'treat_lover',
    title: 'Treat Lover',
    description: 'Use 5 items to keep your pet happy.',
    targetType: 'items' as const,
    targetValue: 5,
    rewardCoins: 30,
    rewardXP: 45
  },
  {
    id: 'calorie_master',
    title: 'Calorie Master',
    description: 'Burn 100 total calories.',
    targetType: 'calories' as const,
    targetValue: 100,
    rewardCoins: 60,
    rewardXP: 100
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Interact with your pet 30 times.',
    targetType: 'interactions' as const,
    targetValue: 30,
    rewardCoins: 25,
    rewardXP: 30
  },
  {
    id: 'movement_expert',
    title: 'Movement Expert',
    description: 'Complete 25 movements today.',
    targetType: 'movement' as const,
    targetValue: 25,
    rewardCoins: 50,
    rewardXP: 75
  },
  {
    id: 'power_hour',
    title: 'Power Hour',
    description: 'Burn 40 calories in a single session.',
    targetType: 'calories' as const,
    targetValue: 40,
    rewardCoins: 40,
    rewardXP: 60
  },
  {
    id: 'gourmet_pet',
    title: 'Gourmet Pet',
    description: 'Use 2 items to pamper your pet.',
    targetType: 'items' as const,
    targetValue: 2,
    rewardCoins: 15,
    rewardXP: 20
  },
  {
    id: 'interaction_pro',
    title: 'Interaction Pro',
    description: 'Interact with your pet 50 times.',
    targetType: 'interactions' as const,
    targetValue: 50,
    rewardCoins: 40,
    rewardXP: 50
  },
  {
    id: 'window_shopper',
    title: 'Window Shopper',
    description: 'Purchase 1 item or cosmetic from the store.',
    targetType: 'shopping' as const,
    targetValue: 1,
    rewardCoins: 5,
    rewardXP: 10
  },
  {
    id: 'bargain_hunter',
    title: 'Bargain Hunter',
    description: 'Purchase 3 items from the store.',
    targetType: 'shopping' as const,
    targetValue: 3,
    rewardCoins: 15,
    rewardXP: 25
  },
  {
    id: 'power_nap',
    title: 'Power Nap',
    description: 'Let your pet rest for 60 seconds.',
    targetType: 'sleep' as const,
    targetValue: 60,
    rewardCoins: 10,
    rewardXP: 15
  },
  {
    id: 'deep_sleep',
    title: 'Deep Sleep',
    description: 'Let your pet rest for 5 minutes.',
    targetType: 'sleep' as const,
    targetValue: 300,
    rewardCoins: 40,
    rewardXP: 60
  },
  {
    id: 'chatty_buddy',
    title: 'Chatty Buddy',
    description: 'Talk to your pet 5 times.',
    targetType: 'chat' as const,
    targetValue: 5,
    rewardCoins: 15,
    rewardXP: 20
  },
  {
    id: 'deep_conversation',
    title: 'Deep Conversation',
    description: 'Talk to your pet 15 times.',
    targetType: 'chat' as const,
    targetValue: 15,
    rewardCoins: 35,
    rewardXP: 50
  },
  {
    id: 'stay_hydrated',
    title: 'Stay Hydrated',
    description: 'Give your pet water 5 times.',
    targetType: 'maintenance' as const,
    targetValue: 5,
    rewardCoins: 15,
    rewardXP: 20
  },
  {
    id: 'well_fed',
    title: 'Well Fed',
    description: 'Feed your pet 5 times.',
    targetType: 'maintenance' as const,
    targetValue: 5,
    rewardCoins: 15,
    rewardXP: 20
  },
  {
    id: 'sunny_stroll',
    title: 'Sunny Stroll',
    description: 'Move for 45 seconds when it is sunny outside!',
    targetType: 'time' as const,
    targetValue: 45,
    rewardCoins: 25,
    rewardXP: 30
  },
  {
    id: 'rainy_resilience',
    title: 'Rainy Resilience',
    description: 'Burn 30 calories when it is raining!',
    targetType: 'calories' as const,
    targetValue: 30,
    rewardCoins: 30,
    rewardXP: 40
  },
  {
    id: 'cloudy_comfort',
    title: 'Cloudy Comfort',
    description: 'Interact with your pet 20 times when it is cloudy!',
    targetType: 'interactions' as const,
    targetValue: 20,
    rewardCoins: 20,
    rewardXP: 25
  },
  {
    id: 'snowy_quest',
    title: 'Blizzard Bravery',
    description: 'Complete 5 movements when it is snowy outside!',
    targetType: 'movement' as const,
    targetValue: 5,
    rewardCoins: 30,
    rewardXP: 40
  },
  {
    id: 'spring_bloom',
    title: 'Spring Bloom',
    description: 'Talk to your pet 10 times during Spring!',
    targetType: 'chat' as const,
    targetValue: 10,
    rewardCoins: 20,
    rewardXP: 30
  },
  {
    id: 'summer_sizzle',
    title: 'Summer Sizzle',
    description: 'Burn 60 calories during Summer!',
    targetType: 'calories' as const,
    targetValue: 60,
    rewardCoins: 40,
    rewardXP: 60
  },
  {
    id: 'autumn_harvest',
    title: 'Autumn Harvest',
    description: 'Collect 3 gifts during Autumn!',
    targetType: 'items' as const,
    targetValue: 3,
    rewardCoins: 30,
    rewardXP: 45
  },
  {
    id: 'winter_warmth',
    title: 'Winter Warmth',
    description: 'Let your pet rest for 10 minutes during Winter!',
    targetType: 'sleep' as const,
    targetValue: 600,
    rewardCoins: 50,
    rewardXP: 70
  },
  {
    id: 'care_taker',
    title: 'Care Taker',
    description: 'Maintain a 3-day Care Streak.',
    targetType: 'streak' as const,
    targetValue: 3,
    rewardCoins: 40,
    rewardXP: 60
  },
  {
    id: 'short_scouting',
    title: 'Short Scouting',
    description: 'Explore your surroundings! Move for 45 seconds.',
    targetType: 'time' as const,
    targetValue: 45,
    rewardCoins: 20,
    rewardXP: 30
  },
  {
    id: 'long_expedition',
    title: 'Long Expedition',
    description: 'A grand journey awaits! Move for 2 minutes (120 seconds).',
    targetType: 'time' as const,
    targetValue: 120,
    rewardCoins: 60,
    rewardXP: 100
  }
];

export function generateRandomQuest(existingTemplateIds: string[] = []): Quest {
  const availableTemplates = QUEST_TEMPLATES.filter(t => !existingTemplateIds.includes(t.id));
  const templatesToUse = availableTemplates.length > 0 ? availableTemplates : QUEST_TEMPLATES;
  
  const template = templatesToUse[Math.floor(Math.random() * templatesToUse.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    templateId: template.id,
    title: template.title,
    description: template.description,
    targetType: template.targetType,
    targetValue: template.targetValue,
    rewardCoins: template.rewardCoins,
    rewardXP: template.rewardXP,
    currentValue: 0,
    completed: false,
    claimed: false
  };
}
