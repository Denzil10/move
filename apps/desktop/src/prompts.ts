export interface MovementPrompt {
  id: string;
  text: string;
  description: string;
  category: 'stretch' | 'strength' | 'cardio' | 'fun' | 'focus';
  baseDuration: number; // Recommended duration in seconds
}

export const MOVEMENT_PROMPTS: MovementPrompt[] = [
  {
    id: 'reach_sky',
    text: 'Reach for the Sky!',
    description: 'Stand up and reach as high as you can with both arms.',
    category: 'stretch',
    baseDuration: 10
  },
  {
    id: 'touch_toes',
    text: 'Touch Your Toes',
    description: 'Bend over and try to touch your toes (or as far as you can go!).',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'neck_rolls',
    text: 'Neck Rolls',
    description: 'Gently roll your neck in a circular motion.',
    category: 'stretch',
    baseDuration: 10
  },
  {
    id: 'arm_circles',
    text: 'Arm Circles',
    description: 'Extend your arms and make small circles in the air.',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'jumping_jacks',
    text: 'Jumping Jacks',
    description: 'Classic jumping jacks to get the heart pumping!',
    category: 'cardio',
    baseDuration: 20
  },
  {
    id: 'squats',
    text: 'Chair Squats',
    description: 'Stand up and sit back down without fully touching the chair.',
    category: 'strength',
    baseDuration: 20
  },
  {
    id: 'wall_sit',
    text: 'Wall Sit',
    description: 'Lean against a wall and slide down into a sitting position.',
    category: 'strength',
    baseDuration: 30
  },
  {
    id: 'dance_party',
    text: 'Mini Dance Party',
    description: 'Dance like nobody is watching for a few seconds!',
    category: 'fun',
    baseDuration: 15
  },
  {
    id: 'shoulder_shrugs',
    text: 'Shoulder Shrugs',
    description: 'Lift your shoulders to your ears and release.',
    category: 'stretch',
    baseDuration: 10
  },
  {
    id: 'march_place',
    text: 'March in Place',
    description: 'Lift your knees high as you march on the spot.',
    category: 'cardio',
    baseDuration: 20
  },
  {
    id: 'wrist_stretch',
    text: 'Wrist Stretch',
    description: 'Extend one arm and gently pull back your fingers with the other hand.',
    category: 'stretch',
    baseDuration: 10
  },
  {
    id: 'leg_swings',
    text: 'Leg Swings',
    description: 'Hold onto something for balance and swing one leg back and forth.',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'eye_palming',
    text: 'Eye Palming',
    description: 'Rub your hands together to warm them, then gently cup them over your closed eyes.',
    category: 'focus',
    baseDuration: 20
  },
  {
    id: 'distance_stare',
    text: '20-20-20 Rule',
    description: 'Look at something 20 feet away for 20 seconds.',
    category: 'focus',
    baseDuration: 20
  },
  {
    id: 'side_lunges',
    text: 'Side Lunges',
    description: 'Step to the side and bend your knee, then return to center.',
    category: 'strength',
    baseDuration: 20
  },
  {
    id: 'calf_raises',
    text: 'Calf Raises',
    description: 'Stand on your tiptoes, hold, and lower slowly.',
    category: 'strength',
    baseDuration: 15
  },
  {
    id: 'air_punches',
    text: 'Air Punches',
    description: 'Lightly punch the air in front of you to release tension.',
    category: 'cardio',
    baseDuration: 15
  },
  {
    id: 'seated_twist',
    text: 'Seated Twist',
    description: 'Sit upright and twist your torso to look over your shoulder.',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'palming_eyes',
    text: 'Mindful Eye Rest',
    description: 'Close your eyes and breathe deeply for 30 seconds.',
    category: 'focus',
    baseDuration: 30
  },
  {
    id: 'shoulder_blades',
    text: 'Shoulder Blade Squeeze',
    description: 'Squeeze your shoulder blades together, hold for 5 seconds, and release.',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'ear_to_shoulder',
    text: 'Ear-to-Shoulder Stretch',
    description: 'Gently tilt your head towards your shoulder to stretch the side of your neck.',
    category: 'stretch',
    baseDuration: 15
  },
  {
    id: 'deep_breath_prompt',
    text: 'One Deep Breath',
    description: 'Take one very deep breath in, hold it, and exhale slowly.',
    category: 'focus',
    baseDuration: 10
  },
  {
    id: 'water_break',
    text: 'Hydration Check!',
    description: 'Take a sip of water to stay sharp.',
    category: 'focus',
    baseDuration: 15
  },
  {
    id: 'finger_stretches',
    text: 'Keyboard Hands Relief',
    description: 'Spread your fingers wide, then make a tight fist. Repeat 5 times.',
    category: 'stretch',
    baseDuration: 20
  }
];

export function getRandomPrompt(category?: 'stretch' | 'strength' | 'cardio' | 'fun' | 'focus'): MovementPrompt {
  if (category) {
    const filtered = MOVEMENT_PROMPTS.filter(p => p.category === category);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return MOVEMENT_PROMPTS[Math.floor(Math.random() * MOVEMENT_PROMPTS.length)];
}

export function getFocusPrompt(): MovementPrompt {
  const focusPrompts = MOVEMENT_PROMPTS.filter(p => p.category === 'focus' || p.category === 'stretch');
  return focusPrompts[Math.floor(Math.random() * focusPrompts.length)];
}
