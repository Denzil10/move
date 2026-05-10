export interface SpritesheetMeta {
  src: string;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  stateRows: Record<string, { row: number; frames: number }>;
}

export interface PetSpecies {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  discoveryHint: string;
  color: string;
  spritesheet?: SpritesheetMeta;
  unlockedAt?: string;
}

export const TINY_DINO_SPRITE: SpritesheetMeta = {
  src: "/tiny-dino.png",
  cols: 8,
  cellWidth: 192,
  cellHeight: 208,
  stateRows: {
    idle:      { row: 0, frames: 6 },
    floating:  { row: 1, frames: 8 },
    thinking:  { row: 2, frames: 8 },
    training:  { row: 3, frames: 4 },
    sleeping:  { row: 4, frames: 5 },
    happy:     { row: 5, frames: 8 },
    chatting:  { row: 5, frames: 8 },
    disturbed: { row: 6, frames: 6 },
  },
};

export const PET_SPECIES: PetSpecies[] = [
  {
    id: "emerald_dragon",
    name: "Emerald Dragon",
    description: "The classic companion, known for its loyalty and love for green pastures.",
    icon: "🐉",
    rarity: "common",
    discoveryHint: "Already your best friend.",
    color: "#4caf50"
  },
  {
    id: "tiny_dino",
    name: "Tiny Dino",
    description: "A compact pixelated dinosaur with expressive workday poses. Always ready to roar!",
    icon: "🦕",
    rarity: "common",
    discoveryHint: "Available from the start — try something different!",
    color: "#7cb87a",
    spritesheet: TINY_DINO_SPRITE,
  },
  {
    id: "ruby_drake",
    name: "Ruby Drake",
    description: "A fiery little friend that thrives on high-intensity movement.",
    icon: "🔥",
    rarity: "common",
    discoveryHint: "Burn 10 calories in a single session.",
    color: "#f44336"
  },
  {
    id: "sapphire_serpent",
    name: "Sapphire Serpent",
    description: "A calm and cool companion that prefers steady, consistent activity.",
    icon: "💧",
    rarity: "uncommon",
    discoveryHint: "Reach a 3-day streak.",
    color: "#2196f3"
  },
  {
    id: "golden_gryphon",
    name: "Golden Gryphon",
    description: "A majestic creature that only appears to those who have shown true dedication.",
    icon: "✨",
    rarity: "rare",
    discoveryHint: "Reach Level 10.",
    color: "#ffc107"
  },
  {
    id: "shadow_stalker",
    name: "Shadow Stalker",
    description: "A mysterious pet that loves the quiet of the night.",
    icon: "🌑",
    rarity: "rare",
    discoveryHint: "Move during late night hours (10 PM - 4 AM).",
    color: "#607d8b"
  },
  {
    id: "frost_wyrm",
    name: "Frost Wyrm",
    description: "An icy companion that appears during the coldest winters.",
    icon: "❄️",
    rarity: "rare",
    discoveryHint: "Discover during Winter season.",
    color: "#00bcd4"
  },
  {
    id: "solar_phoenix",
    name: "Solar Phoenix",
    description: "A bird of pure energy that basks in the summer sun.",
    icon: "☀️",
    rarity: "epic",
    discoveryHint: "Discover during Summer season.",
    color: "#ff9800"
  },
  {
    id: "cosmic_nebula",
    name: "Cosmic Nebula",
    description: "A pet made of star-stuff, reaching far beyond our world.",
    icon: "🌌",
    rarity: "legendary",
    discoveryHint: "Rare chance when reaching a Daily Goal.",
    color: "#9c27b0"
  },
  {
    id: "titan_dragon",
    name: "Titan Dragon",
    description: "An incredibly strong and sturdy dragon that admires physical prowess.",
    icon: "🌋",
    rarity: "epic",
    discoveryHint: "Reach Strength Level 5.",
    color: "#795548"
  },
  {
    id: "calico_cat",
    name: "Calico Cat",
    description: "A playful feline that loves to stretch and pounce on move prompts.",
    icon: "🐈",
    rarity: "common",
    discoveryHint: "Perform 10 movements in a single day.",
    color: "#ffab40"
  },
  {
    id: "loyal_labrador",
    name: "Loyal Labrador",
    description: "A happy pup that's always excited to see you move.",
    icon: "🐕",
    rarity: "common",
    discoveryHint: "Reach a 5-day care streak.",
    color: "#8d6e63"
  },
  {
    id: "quantum_bot",
    name: "Quantum Bot",
    description: "A highly efficient robot designed to optimize your movement routine.",
    icon: "🤖",
    rarity: "uncommon",
    discoveryHint: "Reach Level 15.",
    color: "#607d8b"
  }
];
