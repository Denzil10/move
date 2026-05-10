export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_steps",
    title: "First Steps",
    description: "Complete your first movement.",
    icon: "👟"
  },
  {
    id: "calorie_burner",
    title: "Calorie Burner",
    description: "Burn 100 total calories.",
    icon: "🔥"
  },
  {
    id: "move_master",
    title: "Move Master",
    description: "Complete 50 total movements.",
    icon: "🏆"
  },
  {
    id: "on_a_roll",
    title: "On a Roll",
    description: "Reach a 3-day streak.",
    icon: "🎲"
  },
  {
    id: "pet_lover",
    title: "Pet Lover",
    description: "Feed your pet for the first time.",
    icon: "🍖"
  },
  {
    id: "level_5",
    title: "Level up!",
    description: "Reach Level 5.",
    icon: "⭐"
  },
  {
    id: "consistency_king",
    title: "Consistency King",
    description: "Reach a 7-day streak.",
    icon: "👑"
  },
  {
    id: "consistent_mover",
    title: "Consistent Mover",
    description: "Reach a 14-day streak.",
    icon: "💎"
  },
  {
    id: "calorie_crusader",
    title: "Calorie Crusader",
    description: "Burn 500 total calories.",
    icon: "⚔️"
  },
  {
    id: "master_burner",
    title: "Master Burner",
    description: "Burn 1000 total calories.",
    icon: "🌋"
  },
  {
    id: "well_rested",
    title: "Well-Rested",
    description: "Your pet has reached full energy!",
    icon: "⚡"
  },
  {
    id: "deep_sleep",
    title: "Deep Sleep",
    description: "Rest for 5 minutes continuously.",
    icon: "😴"
  },
  {
    id: "stay_hydrated",
    title: "Stay Hydrated",
    description: "Give your pet water for the first time.",
    icon: "💧"
  },
  {
    id: "new_friend",
    title: "New Friend",
    description: "Reach 'Buddy' bond level.",
    icon: "🤝"
  },
  {
    id: "best_friends",
    title: "Best Friends Forever",
    description: "Reach 'Best Friend' bond level.",
    icon: "💖"
  },
  {
    id: "soulmate",
    title: "Soulmate",
    description: "Reach 'Soulmate' bond level.",
    icon: "♾️"
  },
  {
    id: "care_taker",
    title: "Care Taker",
    description: "Maintain a 3-day care streak.",
    icon: "❤️"
  },
  {
    id: "devoted_guardian",
    title: "Devoted Guardian",
    description: "Maintain a 7-day care streak.",
    icon: "💖"
  },
  {
    id: "nurturing_spirit",
    title: "Nurturing Spirit",
    description: "Maintain a 15-day care streak.",
    icon: "🌸"
  },
  {
    id: "soul_nurturer",
    title: "Soul Nurturer",
    description: "Maintain a 30-day care streak.",
    icon: "✨"
  },
  {
    id: "master_caregiver",
    title: "Master Caregiver",
    description: "Maintain a 100-day care streak.",
    icon: "💎"
  },
  {
    id: "diary_keeper",
    title: "Diary Keeper",
    description: "Record your first pet memory.",
    icon: "📖"
  },
  {
    id: "pure_joy",
    title: "Pure Joy",
    description: "Reach 90% pet happiness.",
    icon: "🌈"
  },
  {
    id: "sunshine_soul",
    title: "Sunshine Soul",
    description: "Reach 100% pet happiness.",
    icon: "☀️"
  },
  {
    id: "balanced_life",
    title: "Balanced Life",
    description: "Reach a 70% daily care score.",
    icon: "⚖️"
  },
  {
    id: "peak_health",
    title: "Peak Health",
    description: "Reach a 90% daily care score.",
    icon: "🏥"
  },
  {
    id: "dream_weaver",
    title: "Dream Weaver",
    description: "Record 10 dreams in your pet's journal.",
    icon: "☁️"
  },
  {
    id: "birthday_bash",
    title: "Birthday Bash",
    description: "Celebrate your pet's adoption anniversary!",
    icon: "🎂"
  }
];
