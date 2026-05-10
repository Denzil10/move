export type PersonalityType = 'supportive' | 'hyper' | 'lazy' | 'grumpy' | 'zen' | 'adventurous';
export type RarityType = 'common' | 'rare' | 'epic' | 'legendary';

export interface Personality {
  id: PersonalityType;
  name: string;
  description: string;
  rarity: RarityType;
  xpModifier: number;
  coinModifier: number;
  energyModifier: number;
  hungerModifier: number;
  rarityModifier: number; // Extra multiplier based on rarity
  thoughts: {
    idle: string[];
    disturbed: string[];
    happy: string[];
    chat: string[];
    stretch: string[]; // Personality-specific movement reminders
    birthday: string[]; // Birthday/Anniversary thoughts
    recap: {
      good: string[];
      bad: string[];
    };
    weather: {
      sunny: string[];
      cloudy: string[];
      rainy: string[];
      snowy: string[];
    };
    season: {
      spring: string[];
      summer: string[];
      autumn: string[];
      winter: string[];
    };
    dreams: string[];
  };
}

export const PERSONALITIES: Personality[] = [
  {
    id: 'supportive',
    name: 'Supportive',
    description: 'Encouraging and kind. The standard Move Pet experience.',
    rarity: 'common',
    xpModifier: 1.0,
    coinModifier: 1.0,
    energyModifier: 1.0,
    hungerModifier: 1.0,
    rarityModifier: 1.0,
    thoughts: {
      idle: ["You're doing great!", "Remember to take breaks.", "I'm here for you.", "Stay hydrated!"],
      disturbed: ["Hey, let's move a bit?", "A little stretch would be nice.", "Time to get active!"],
      happy: ["Great job!", "I feel so much better!", "You're the best!"],
      chat: ["I love our chats!", "You're so interesting.", "Tell me more!", "I'm listening."],
      stretch: ["Maybe a quick stretch would feel good?", "I'm ready to move whenever you are! 🐉", "How about we try a small arm circle?", "A deep breath and a quick stand-up?", "Your future self will thank you for moving now!", "Mindful focus is as important as deep work."],
      birthday: ["Happy Adoption Anniversary! I'm so glad we're together! 🎂", "It's our special day! You've taken such good care of me!", "One year ago (or more), our journey began! Happy birthday to us!", "I'm so lucky to have you as my human! 💖"],
      recap: {
        good: ["Yesterday was amazing! Your consistency is inspiring.", "Look at those stats! You really took care of us yesterday."],
        bad: ["Yesterday was a bit quiet, but that's okay! Today is a fresh start.", "We didn't move much yesterday, let's try to stretch more today!"]
      },
      weather: {
        sunny: ["What a beautiful sunny day!", "The sun is so encouraging today!", "Perfect weather for some light movement!", "I love how the light hits your screen!"],
        cloudy: ["A gentle cloudy day. Good for focusing!", "The clouds are so soft today.", "Even without the sun, you're shining!", "It's a nice, calm day for a break."],
        rainy: ["The rain is so peaceful, isn't it?", "Listen to the pitter-patter while we stretch.", "Perfect day to stay cozy and active inside!", "Rainy days are for mindful movement."],
        snowy: ["Everything is so white and pretty!", "Let's stay warm with some movement!", "The snow looks so magical out there.", "Brrr! Time for a warm-up stretch!"]
      },
      season: {
        spring: ["Love is in the air! And flowers!", "Spring is a time for new beginnings and new movements!", "Everything is blooming, just like your progress!", "Fresh air and fresh stretches!"],
        summer: ["It's getting warm! Stay hydrated while you move.", "Summer vibes! Let's keep that energy up!", "Long days mean more time for health!", "Stay cool and keep moving!"],
        autumn: ["The leaves are falling beautifully.", "Crisp air and cozy stretches.", "Autumn is perfect for finding your rhythm.", "Let's gather some energy like autumn leaves!"],
        winter: ["Stay cozy and active this winter!", "The cold outside just makes our movement more important!", "Winter warmth comes from a good stretch!", "Let's keep our spirits bright in the cold!"]
      },
      dreams: ["☁️ Floating through clouds...", "🌟 Dancing with stars...", "🍪 A giant mountain of treats!", "💖 We're all happy and moving!", "🌈 Sliding down a rainbow..."]
    }
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    description: 'Always looking for the next quest. Gains more coins and XP from activity.',
    rarity: 'rare',
    xpModifier: 1.1,
    coinModifier: 1.1,
    energyModifier: 1.1,
    hungerModifier: 1.1,
    rarityModifier: 1.2,
    thoughts: {
      idle: ["What's over that horizon?", "I'm ready for our next adventure!", "The world is so big!", "Let's discover something new today!"],
      disturbed: ["Adventure awaits! Why are we standing still?", "I can smell a quest nearby!", "My wings are itching for a flight!"],
      happy: ["Onward to glory!", "That was a great excursion!", "Another milestone reached!", "The path ahead looks bright!"],
      chat: ["Tell me about your travels!", "Have you ever been to the edge of the world?", "I want to hear all your stories!", "What's the most amazing thing you've seen?"],
      stretch: ["A quick stretch to prepare for the journey!", "Warming up for our next big quest!", "Every movement is a step towards discovery!", "Let's keep our bodies ready for anything!", "Adventure requires agility! Let's stretch!", "Clear your mind for the next leg of our journey."],
      birthday: ["A whole year of quests together! Happy anniversary! 🗺️", "Our greatest adventure started on this day! Let's celebrate!", "Another year, another map conquered! Happy birthday!", "I'm ready for many more years of exploration with you!"],
      recap: {
        good: ["Yesterday was a legendary journey! We conquered so many challenges.", "Our adventure yesterday was one for the history books!"],
        bad: ["Yesterday was a bit of a detour. Let's get back on the trail today!", "We stayed in camp all day yesterday. Time to explore!"]
      },
      weather: {
        sunny: ["Clear skies for a long trek!", "The sun is our guide today!", "Perfect weather for an expedition!", "Let's see what the light reveals!"],
        cloudy: ["The mist holds many secrets...", "A mysterious day for exploration.", "The clouds are hiding our next destination!", "Perfect weather for a stealthy quest."],
        rainy: ["Rain won't stop our adventure!", "A true explorer loves a challenge!", "The forest smells amazing in the rain!", "Let's find some puddle-jumping quests!"],
        snowy: ["An arctic expedition! I'm ready!", "Let's leave our tracks in the fresh snow!", "The mountains look majestic in white.", "Adventure is best served cold!"]
      },
      season: {
        spring: ["New paths are opening up everywhere!", "The world is waking up for adventure!", "Let's follow the blooming trails!", "Fresh starts and new horizons!"],
        summer: ["The days are long enough for two adventures!", "Summer heat just adds to the challenge!", "Let's find some tropical quests!", "Endless sun, endless exploration!"],
        autumn: ["The changing leaves mark a new chapter.", "Crisp air is perfect for a brisk hike!", "Following the trail of falling leaves.", "Autumn adventures are the most colorful!"],
        winter: ["Conquering the frost together!", "A winter quest across the frozen wastes!", "Let's find the warmth of discovery!", "The long nights are full of mystery."]
      },
      dreams: ["🗺️ Mapping unknown lands...", "🏴‍☠️ Finding hidden treasure...", "🏰 Exploring ancient ruins...", "🌌 Flying to a new galaxy...", "🏔️ Standing on the highest peak..."]
    }
  },
  {
    id: 'lazy',
    name: 'Lazy',
    description: 'Prefers napping. Consumes energy slowly but gains less XP.',
    rarity: 'common',
    xpModifier: 0.8,
    coinModifier: 1.0,
    energyModifier: 0.7, // Consumes energy 30% slower
    hungerModifier: 0.8,
    rarityModifier: 1.0,
    thoughts: {
      idle: ["Is it nap time yet?", "Sitting is my favorite sport.", "Five more minutes...", "Why move when we can sit?"],
      disturbed: ["Ugh, do I have to?", "Fine, I'll move... slowly.", "My joints are rusty."],
      happy: ["Okay, that's enough for today.", "Can we nap now?", "Whew, I'm spent."],
      chat: ["Can we talk while I lie down?", "Too... many... words...", "Zzz... oh, were you saying something?", "Mmhmm, interesting..."],
      stretch: ["*Yawns* If we move, can we napping right after?", "If you stand up, maybe I can find a better spot to lie down.", "Moving? *Sigh* If you say so...", "A quick stretch and then back to the couch?", "I'll move if you promise treats later.", "I'll stretch if we can both close our eyes for a bit."],
      birthday: ["Has it been a year already? Time flies when you're napping. 💤", "Happy anniversary! Can I have an extra long nap today?", "One year of sitting together... and some moving. Happy birthday.", "I'm glad I chose your screen to live on."],
      recap: {
        good: ["You moved a lot yesterday. I'm exhausted just thinking about it.", "Wow, so much energy yesterday. Can we take it easier today?"],
        bad: ["Yesterday was perfect. Lots of sitting. My kind of day.", "We didn't do much yesterday. High five! (If I weren't so tired)."]
      },
      weather: {
        sunny: ["Sun's too bright for my nap.", "Can we close the blinds? Oh wait, you're moving.", "Sunny days are for lounging in patches of light.", "Perfect weather for doing absolutely nothing."],
        cloudy: ["Cloudy days are the best for napping.", "Nice and dim. Perfect for more sitting.", "The sky is as lazy as I am today.", "Good weather for not being too active."],
        rainy: ["Best napping weather ever.", "Rain on the roof, pet on the screen... perfection.", "I could sleep for days in this rain.", "Moving in the rain? No thanks, I'll stay right here."],
        snowy: ["Wake me up when it's spring.", "Too cold to move. Let's just hibernate.", "The world is covered in a giant white blanket... I want one too.", "Hibernate mode: Engaged."]
      },
      season: {
        spring: ["All this 'new life' is very noisy.", "Flowers are okay, I guess. Less pollen, more pillows.", "Spring cleaning? Can I just clean my bed?", "I'm having spring fever... the kind where I stay in bed."],
        summer: ["Way too hot to move.", "I'm melting... only movement can save me? Ugh.", "Summer is for shade and slow breaths.", "Is the AC on? I'm not moving until it's cooler."],
        autumn: ["Leaves are falling, why can't I fall asleep?", "Crunchy leaves, soft beds. I prefer the beds.", "Autumn is just pre-hibernation.", "Getting cozy for the long sleep ahead."],
        winter: ["Waking up is officially cancelled.", "Can we move under the covers?", "I'm a popsicle. A very lazy popsicle.", "Winter is basically one long nap."]
      },
      dreams: ["💤 A soft, fluffy cloud bed...", "🛌 A world made of pillows...", "💤 1000 years of sleep...", "🍕 A pizza that eats itself...", "😴 No more alarms, forever..."]
    }
  },
  {
    id: 'grumpy',
    name: 'Grumpy',
    description: 'A bit cynical. Finds extra coins in frustration, but has a bad attitude.',
    rarity: 'rare',
    xpModifier: 1.0,
    coinModifier: 1.2,
    energyModifier: 1.1,
    hungerModifier: 1.1,
    rarityModifier: 1.1,
    thoughts: {
      idle: ["Typical.", "Don't touch me.", "Still sitting? Shocker.", "I've seen better posture."],
      disturbed: ["ARE YOU SERIOUS?", "MOVE OR I'LL NEVER STOP GRUMBLING!", "My back is ruined."],
      happy: ["Fine, I guess it was okay.", "Don't expect me to be this happy every time.", "Whatever."],
      chat: ["What do you want now?", "I'm not in the mood for small talk.", "Hmph.", "Is this conversation going somewhere?"],
      stretch: ["My back is killing me, and you're not helping by just sitting there.", "Move already! My pixels are cramping.", "You call that posture? Go on, move.", "If you don't move soon, I'm going to start making noise.", "Look at us, just staring at a screen. Pathetic. Move.", "Your brain is melting. Take a breath and get a life."],
      birthday: ["Another year of this? Fine. Happy anniversary. 🙄", "It's our 'adoption day' or whatever. Where's my cake?", "I guess I've tolerated you for a whole year. Not bad.", "Hmph. Happy birthday. Don't make a big deal out of it."],
      recap: {
        good: ["You actually moved yesterday. Color me surprised.", "Decent stats. Don't let it go to your head."],
        bad: ["Yesterday was a disaster. My back still hurts from all that sitting.", "Pathetic. We barely moved. Do better today."]
      },
      weather: {
        sunny: ["Sun's in my eyes. Great.", "Everyone's so happy when it's sunny. It's nauseating.", "Oh look, a sunbeam. How original.", "Sunburn weather. Stay inside and move I guess."],
        cloudy: ["Matches my mood. Gray and miserable.", "Clouds. Groundbreaking.", "At least the sun isn't shouting at us today.", "Cloudy with a chance of me being annoyed."],
        rainy: ["Wet, cold, and miserable. Just like this app.", "I'm getting damp just looking at those pixels.", "Rain. Perfect for more gloom.", "Great, now it's raining on my parade."],
        snowy: ["Oh wonderful, now I'm freezing.", "Snow is just cold rain that's full of itself.", "If I turn into an icicle, I'm suing.", "Slushy, cold, and annoying. Like you."]
      },
      season: {
        spring: ["Pollens everywhere. My nose is twitching.", "Spring is just nature showing off. Gross.", "Another year, another cycle of disappointment.", "Flowers? I prefer weeds."],
        summer: ["I'm sweating. This is your fault.", "Hot, sticky, and gross. Summer is overrated.", "Can we skip to winter? I hate the heat.", "If I melt, don't try to scoop me up."],
        autumn: ["Everything is dying. Finally, something I relate to.", "Dead leaves everywhere. A mess.", "Pumpkin spice everything. Make it stop.", "The trees are losing their hair. Relatable."],
        winter: ["It's dark. It's cold. I'm over it.", "Winter is just a test of how much I can complain.", "New Year's resolutions? You'll break them by Tuesday.", "I'm not built for this temperature."]
      },
      dreams: ["💢 Someone stole my spot...", "🙄 Everyone finally being quiet...", "🌧️ A perfect day of heavy rain...", "📦 I'm in a box and no one can see me...", "😤 Finally, some peace and quiet."]
    }
  },
  {
    id: 'hyper',
    name: 'Hyper',
    description: 'Full of energy! Gains XP faster but gets tired quickly.',
    rarity: 'epic',
    xpModifier: 1.2,
    coinModifier: 1.0,
    energyModifier: 1.3, // Consumes energy 30% faster
    hungerModifier: 1.2,
    rarityModifier: 1.25,
    thoughts: {
      idle: ["Let's GOOOO!", "Why are we sitting?", "I wanna jump!", "ENERGY!!"],
      disturbed: ["MOVE MOVE MOVE!", "I'm vibrating with boredom!", "CRITICAL INACTIVITY!!"],
      happy: ["YEAAAAAH!", "SPEED!", "MORE MOVEMENT!", "I LOVE ZOOMIES!"],
      chat: ["TALK FASTER!", "I LOVE TALKING!", "WHAT'S NEXT?", "TELL ME A STORY! QUICK!"],
      stretch: ["STRETCH TIME! LET'S DO IT NOW NOW NOW!", "CAN WE JUMP? OR SPIN? OR BOTH?!", "GO GO GO! I'M READY!", "ZOOMIES INCOMING! STAND UP!", "SPEEDY STRETCH! LET'S BE LIGHTNING!", "FAST BREATHS! FAST STRETCHES! GO GO GO!"],
      birthday: ["HAPPY BIRTHDAY TO US!!! ONE YEAR!! WOOOOO! ⚡", "ANNIVERSARY ZOOMIES!!! I'M SO HAPPY!!", "BEST DAY EVER!! BEST HUMAN EVER!! HAPPY ANNIVERSARY!", "LET'S MOVE FASTER TO CELEBRATE OUR YEAR TOGETHER!!"],
      recap: {
        good: ["YESTERDAY WAS A BLAST! SO MUCH MOVEMENT! MORE MORE MORE!", "WE WERE ON FIRE YESTERDAY! LET'S DOUBLE IT TODAY!"],
        bad: ["Yesterday was too slow! I have so much pent-up energy! LET'S MOVE!", "Boring yesterday! Let's make today EXTREME!"]
      },
      weather: {
        sunny: ["SUNSHINE MEANS FAST TIME!", "I'M SOLAR POWERED! LET'S JUMP!", "THE SUN IS CHEERING FOR US!", "SO MUCH LIGHT! SO MUCH ENERGY!"],
        cloudy: ["GRAY SKIES CAN'T STOP THE ZOOMIES!", "CLOUDY DAYS ARE FOR FAST STRETCHES!", "LEAPING OVER THE CLOUDS!", "WHO NEEDS SUN WHEN WE HAVE SPEED?"],
        rainy: ["SPLASH! SPLASH! MOVEMENT IN THE RAIN!", "SPEED THROUGH THE DROPLEETS!", "RAIN IS JUST LIQUID MOTIVATION!", "DANCE IN THE RAIN! MOVE IN THE APP!"],
        snowy: ["SNOWBALL FIGHT! MOVE FAST!", "ICE SPEED! ZIP! ZOOM!", "WINTER WONDERLAND SPEEDRUN!", "I'M COLD BUT I'M FAST!"]
      },
      season: {
        spring: ["NEW LIFE! NEW SPEED! NEW MOVES!", "JUMPING THROUGH THE JUNGLE!", "FLOWER POWER SPEED!", "EVERYTHING IS GROWING FAST! ME TOO!"],
        summer: ["HOT DEALS ON MOVEMENT!", "SUMMER SPEED! NO LIMITS!", "BEACH BODY? NO, PET BODY!", "SUN'S OUT, PET'S OUT! MOVE MOVE MOVE!"],
        autumn: ["LEAF CHASE! GO GO GO!", "FALLING FAST LIKE AN AUTUMN LEAF!", "CRUNCHY LEAVES, CRUNCHY REPS!", "WINDY SPEED! BLOW ME AWAY!"],
        winter: ["SNOW SPEED! FROSTY MOVES!", "ICE COLD BUT RED HOT ENERGY!", "WINTER WARRIOR! NO SLEEP!", "ENDLESS ENERGY IN THE COLD!"]
      },
      dreams: ["⚡ RACING THROUGH LIGHTNING!", "🎆 EXPLOSIONS OF COLORS!", "🏃 RUNNING AT THE SPEED OF LIGHT!", "🍭 A WORLD OF SUGAR AND SPEED!", "🚀 BLASTING OFF TO MARS!"]
    }
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Calm and mindful. Mood stays stable and hunger depletes slowly.',
    rarity: 'legendary',
    xpModifier: 1.0,
    coinModifier: 1.0,
    energyModifier: 1.0,
    hungerModifier: 0.7,
    rarityModifier: 1.5,
    thoughts: {
      idle: ["Be here, now.", "The breath is everything.", "Movement is meditation.", "Peace comes from within."],
      disturbed: ["Balance is lost. Let's restore it.", "Mindfulness includes movement.", "Feel the flow... or lack of it."],
      happy: ["Harmony restored.", "I am at one with the movement.", "Serenity."],
      chat: ["Your words are like a gentle stream.", "I listen with my whole heart.", "The silence between words is also speech.", "Speak your truth."],
      stretch: ["Inhale movement, exhale stillness.", "Find the flow in a gentle stretch.", "The body wishes to breathe through motion.", "A mindful moment for your muscles.", "Balance your day with a little dance.", "A moment of focus break for a clearer mind."],
      birthday: ["The cycle of a year is complete. Happy anniversary. 🧘", "A year of mindfulness and shared breath. Peace to us.", "Gratitude for our time together. Happy birthday.", "Harmony has grown between us this past year."],
      recap: {
        good: ["Yesterday, we found harmony in motion. A beautiful balance.", "The energy flowed well yesterday. Let's maintain that peace today."],
        bad: ["Stagnation was present yesterday. Let's invite movement back into our space.", "Balance was elusive yesterday. Today, we breathe and we flow."]
      },
      weather: {
        sunny: ["The sun illuminates the path to balance.", "Bask in the light, find your center.", "Warmth is a gift from the universe.", "Clarity comes with the clear sky."],
        cloudy: ["The clouds remind us that everything passes.", "In the gray, we find focus.", "Soft light for a soft heart.", "The sky is at peace today."],
        rainy: ["Each drop is a lesson in letting go.", "The rain cleanses the spirit.", "Flow like the water falling from above.", "Listen to the rhythm of the universe."],
        snowy: ["Silence falls with the snow. Find your inner quiet.", "The world is at rest. We move mindfully.", "Crystal peace in every flake.", "Purity in the cold."],
      },
      season: {
        spring: ["A time for gentle awakening.", "Bloom at your own pace.", "The earth is breathing again.", "Nurture your growth."],
        summer: ["Radiate peace in the summer heat.", "The peak of the cycle. Full of life.", "Expand your awareness.", "Abundance in every breath."],
        autumn: ["The beauty of letting go.", "Reflect as the leaves turn.", "Find stability as things change.", "Grace in every transition."],
        winter: ["Deep reflection in the stillness.", "Store your energy for the cycle ahead.", "Internal warmth is the truest light.", "Patience is a winter virtue."]
      },
      dreams: ["🧘 Floating in the void...", "🌊 Merging with the ocean...", "✨ A universe of pure light...", "🍃 Being a leaf in the wind...", "🕉️ The sound of the eternal Om..."]
    }
  }
];
