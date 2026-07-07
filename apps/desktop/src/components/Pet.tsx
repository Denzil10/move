import React from "react";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { MoodCategory } from "../hooks/usePetMood";
import { EnergyCategory } from "../hooks/usePetEnergy";
import { WeatherCondition } from "../hooks/useWeather";
import { Season } from "../hooks/useSeasons";
import { PetFriend } from "../hooks/usePetFriends";
import { PersonalityType, PERSONALITIES } from "../personalities";
import { PET_SPECIES } from "../collection";
import SpriteAnimation from "./SpriteAnimation";
import "./Pet.css";

export type PetState = "idle" | "disturbed" | "happy" | "floating" | "thinking" | "sleeping" | "chatting" | "training";

interface PetProps {
  state: PetState;
  name: string;
  speciesId?: string;
  personality?: PersonalityType;
  level?: number;
  friendshipLevel?: number;
  hunger?: number;
  hydration?: number;
  energy?: number;
  energyCategory?: EnergyCategory;
  color?: string;
  moodCategory?: MoodCategory;
  happiness?: number;
  weatherCondition?: WeatherCondition;
  season?: Season;
  enabledAccessories?: Record<string, boolean>;
  mousePosition?: { x: number, y: number };
  windowPosition?: { x: number, y: number };
  soundLevel?: number;
  soundEnabled?: boolean;
  thoughtOverride?: string | null;
  movementProgress?: number;
  activeFriend?: PetFriend | null;
  isFocusZen?: boolean;
  adoptionDate?: string;
  onPet?: () => void;
  onPoke?: () => void;
  onChat?: () => void;
  onDreamRecorded?: (dream: string) => void;
  onThoughtClick?: () => void;
}

const Pet: React.FC<PetProps> = ({ 
  state, 
  name, 
  speciesId = "emerald_dragon",
  personality = "supportive",
  level = 1, 
  friendshipLevel = 1,
  hunger = 100,
  hydration = 100,
  energy = 100,
  energyCategory = "full",
  color = "#4caf50",
  moodCategory = "neutral",
  happiness = 50,
  weatherCondition = "unknown",
  season = "spring",
  enabledAccessories = { collar: true, wings: true, hat: true },
  mousePosition,
  windowPosition = { x: 0, y: 0 },
  soundLevel = 0,
  soundEnabled = true,
  thoughtOverride = null,
  movementProgress = 0,
  activeFriend = null,
  isFocusZen = false,
  adoptionDate,
  onPet,
  onPoke,
  onChat,
  onDreamRecorded,
  onThoughtClick
}) => {
  const { playGrumble, playChirp } = useSoundEffects();
  const personalityData = PERSONALITIES.find(p => p.id === personality) || PERSONALITIES[0];
  const speciesData = PET_SPECIES.find(s => s.id === speciesId) || PET_SPECIES[0];
  const petColor = speciesId === "emerald_dragon" ? color : speciesData.color;
  const levelHue = (level - 1) * 20 % 360; // 20 degrees per level
  const evolutionStage = level >= 40 ? "Ancient" : level >= 20 ? "Elder" : level >= 10 ? "Great" : level >= 5 ? "Teen" : "Baby";
  
  // Growth effect: scale body slightly with level, capped at level 40
  const growthScale = 1 + (Math.min(level, 40) - 1) * 0.04;

  // Level-based particle effects
  const showSparkles = level >= 15 && moodCategory === "joyful";
  const showFire = level >= 30 && state === "disturbed";
  const showGlow = level >= 10;
  const showGlowMax = level >= 40;

  // Evolution-specific features
  const isAncient = level >= 40;

  const isBirthday = adoptionDate ? (() => {
    const adoption = new Date(adoptionDate);
    const today = new Date();
    return adoption.getMonth() === today.getMonth() && 
           adoption.getDate() === today.getDate() &&
           adoption.getFullYear() < today.getFullYear();
  })() : false;

  // sound intensity effect
  const soundScale = 1 + (soundLevel * 0.5); // Max 1.5 scale

  // Tired effect: slow down animations if exhausted
  const animationSpeed = energy < 20 ? 2 : energy < 50 ? 1.5 : 1;

  // Eye tracking logic
  const [eyeOffset, setEyeOffset] = React.useState({ x: 0, y: 0 });
  const [petRotation, setPetRotation] = React.useState(0);
  const petRef = React.useRef<HTMLDivElement>(null);

  // Interaction states
  const [isPoked, setIsPoked] = React.useState(false);
  const [isBeingPetted, setIsBeingPetted] = React.useState(false);
  const pettingTimerRef = React.useRef<number | null>(null);

  // Random thoughts logic
  const [thought, setThought] = React.useState<string | null>(null);
  const [dream, setDream] = React.useState<string | null>(null);

  // Sound triggers
  React.useEffect(() => {
    if (!soundEnabled) return;
    if (state === "disturbed") {
      playGrumble();
    } else if (state === "happy" || state === "floating" || state === "chatting") {
      playChirp();
    }
  }, [state, soundEnabled, playGrumble, playChirp]);

  const moodThoughts: Record<MoodCategory, string[]> = {
    grumpy: [
      "Not in the mood.",
      "Hmph.",
      "Could be better...",
      "Feeling a bit neglected.",
      "Is it just me, or is it boring here?",
    ],
    neutral: [
      "Doing okay.",
      "Just hanging out.",
      "Fine, I guess.",
    ],
    content: [
      "I like it here.",
      "Feeling good today!",
      "Life is sweet.",
      "I'm glad we're hanging out.",
    ],
    joyful: [
      "I LOVE YOU!",
      "Everything is AMAZING!",
      "Best day ever!",
      "Let's move together!",
      "I'm so happy I could fly!",
    ]
  };

  const thoughts: Record<string, string[]> = {
    idle: [
      "Zzz...",
      "Doing okay?",
      "Nice work today.",
      "Stay focused!",
      "Hydration is key!",
      ...personalityData.thoughts.idle
    ],
    thinking: [
      "Hmm...",
      "What's next?",
      "Thinking deep...",
      "Wondering if you've had enough water today...",
    ],
    chatting: [
      ...personalityData.thoughts.chat
    ],
    disturbed: [
      "MOVE PLEASE!",
      "It's been too long!",
      "Let's do some stretches!",
      "Time for a break?",
      ...personalityData.thoughts.disturbed
    ],
    happy: [
      "Wooo!",
      "That feels great!",
      "Keep it up!",
      "You're a star!",
      ...personalityData.thoughts.happy
    ],
    floating: [
      "Wheee!",
      "Flying high!",
      "So light!",
      "I love moving!",
    ],
    sleeping: [
      ...personalityData.thoughts.dreams
    ],
    training: [
      "Training hard!",
      "Focusing!",
      "Let's get stronger!",
    ]
  };

  React.useEffect(() => {
    const showThought = () => {
      // Use thoughtOverride if provided
      if (thoughtOverride) {
        setThought(thoughtOverride);
        return;
      }

      // Handle sleeping state dreams separately
      if (state === "sleeping") {
        if (Math.random() > 0.85) {
          const dreamPool = personalityData.thoughts.dreams || thoughts.sleeping;
          const pickedDream = dreamPool[Math.floor(Math.random() * dreamPool.length)];
          setDream(pickedDream);
          if (onDreamRecorded) onDreamRecorded(pickedDream);
          setTimeout(() => setDream(null), 5000);
        }

        return;
      }

      // Priority for hunger thoughts if critically low
      if (hunger < 15 && Math.random() > 0.3) {
        const hungryThoughts = [
          "I'm starving...",
          "Need... food...",
          "Please feed me!",
        ];
        setThought(hungryThoughts[Math.floor(Math.random() * hungryThoughts.length)]);
        setTimeout(() => setThought(null), 4000);
        return;
      }

      // Priority for thirst thoughts if critically low
      if (hydration < 15 && Math.random() > 0.3) {
        const thirstyThoughts = [
          "So thirsty...",
          "Need water!",
          "I could use a drink...",
        ];
        setThought(thirstyThoughts[Math.floor(Math.random() * thirstyThoughts.length)]);
        setTimeout(() => setThought(null), 4000);
        return;
      }

      // Check for birthday (Adoption Anniversary)
      const isBirthday = () => {
        if (!adoptionDate) return false;
        const adoption = new Date(adoptionDate);
        const today = new Date();
        return adoption.getMonth() === today.getMonth() && 
               adoption.getDate() === today.getDate() &&
               adoption.getFullYear() < today.getFullYear();
      };

      // High chance for birthday thoughts if it's the anniversary
      if (isBirthday() && Math.random() > 0.4) {
        const pool = personalityData.thoughts.birthday;
        if (pool && pool.length > 0) {
          setThought(pool[Math.floor(Math.random() * pool.length)]);
          setTimeout(() => setThought(null), 5000);
          return;
        }
      }

      // High chance for mood, weather, or seasonal thoughts
      if (Math.random() > 0.6) {
        let pool = [...(moodThoughts[moodCategory] || moodThoughts.neutral)];

        // 30% chance to show a personality-specific movement reminder if idle
        if (state === "idle" && Math.random() > 0.7) {
          pool = [...pool, ...personalityData.thoughts.stretch];
        }

        // Add personality-specific weather thoughts if applicable
        if (weatherCondition !== "unknown" && Math.random() > 0.5) {
          const personalityWeather = personalityData.thoughts.weather[weatherCondition as keyof typeof personalityData.thoughts.weather];
          if (personalityWeather) {
            pool = [...pool, ...personalityWeather];
          }
        }
        
        // Add personality-specific seasonal thoughts if applicable
        if (season && Math.random() > 0.5) {
          const personalitySeason = personalityData.thoughts.season[season as keyof typeof personalityData.thoughts.season];
          if (personalitySeason) {
            pool = [...pool, ...personalitySeason];
          }
        }

        setThought(pool[Math.floor(Math.random() * pool.length)]);
        setTimeout(() => setThought(null), 3500);
        return;
      }

      // 30% chance to show a regular thought, or 100% if state is 'thinking' or 'chatting'
      const activeState = state as string;
      if (activeState === "thinking" || activeState === "chatting" || Math.random() > 0.7) {
        const stateThoughts = thoughts[activeState] || thoughts.idle;
        const randomThought = stateThoughts[Math.floor(Math.random() * stateThoughts.length)];
        setThought(randomThought);
        
        const duration = (activeState === "thinking" || activeState === "chatting") ? 5000 : 3000;
        setTimeout(() => setThought(null), duration);
      }
    };

    const intervalTime = (state === "thinking" || state === "chatting" || state === "sleeping") ? 6000 : 8000;
    const interval = setInterval(showThought, intervalTime);
    if (state === "thinking" || state === "chatting" || state === "sleeping") showThought();
    
    return () => {
      clearInterval(interval);
      setDream(null);
    };
  }, [state, hunger, hydration, moodCategory, thoughtOverride, personalityData, weatherCondition, season, adoptionDate]);

  React.useEffect(() => {
    if (!mousePosition || !petRef.current) return;

    const rect = petRef.current.getBoundingClientRect();
    const petCenterX = windowPosition.x + rect.left + rect.width / 2;
    const petCenterY = windowPosition.y + rect.top + rect.height / 2;

    const dx = mousePosition.x - petCenterX;
    const dy = mousePosition.y - petCenterY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 20, 8);

    setEyeOffset({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    });

    setPetRotation(Math.max(Math.min(dx / 50, 15), -15));
  }, [mousePosition, windowPosition]);

  const handlePoke = () => {
    setIsPoked(true);
    if (onPoke) onPoke();
    if (soundEnabled) {
      if (moodCategory === "grumpy") playGrumble();
      else playChirp();
    }
    setTimeout(() => setIsPoked(false), 500);
  };

  const handleMouseMove = () => {
    if (pettingTimerRef.current) clearTimeout(pettingTimerRef.current);
    if (!isBeingPetted) {
      setIsBeingPetted(true);
      if (onPet) onPet();
    }
    pettingTimerRef.current = window.setTimeout(() => {
      setIsBeingPetted(false);
    }, 1000);
  };

  return (
    <div 
      ref={petRef}
      className={`pet pet-${state} pet-mood-${moodCategory} pet-season-${season} pet-weather-${weatherCondition} pet-energy-${energyCategory} pet-level-${level >= 40 ? "40" : level >= 20 ? "20" : level >= 10 ? "10" : level >= 5 ? "5" : "1"} ${hunger < 20 ? "pet-hungry" : ""} ${energy < 20 ? "pet-exhausted" : ""} ${isPoked ? "pet-poked" : ""} ${isBeingPetted ? "pet-petted" : ""}`} 
      onClick={handlePoke}
      onMouseMove={handleMouseMove}
      style={{ 
        filter: level > 1 ? `hue-rotate(${levelHue}deg)` : "none",
        transform: `scale(${soundScale * growthScale}) rotate(${petRotation}deg)`,
        transition: state === "floating" ? "filter 0.3s ease" : "transform 0.1s ease, filter 0.3s ease",
        cursor: "pointer",
        animationDuration: `${animationSpeed}s`
      } as React.CSSProperties}
    >
      <div className="pet-body" style={speciesData.spritesheet ? { background: "none", boxShadow: "none" } : { backgroundColor: petColor }}>
        {speciesData.spritesheet ? (
          <SpriteAnimation
            src={speciesData.spritesheet.src}
            cols={speciesData.spritesheet.cols}
            cellWidth={speciesData.spritesheet.cellWidth}
            cellHeight={speciesData.spritesheet.cellHeight}
            row={speciesData.spritesheet.stateRows[state]?.row ?? speciesData.spritesheet.stateRows.idle.row}
            frameCount={speciesData.spritesheet.stateRows[state]?.frames ?? speciesData.spritesheet.stateRows.idle.frames}
            fps={state === "sleeping" ? 4 : state === "floating" ? 12 : 8}
            scale={0.35}
            className="sprite-pet"
          />
        ) : speciesId !== "emerald_dragon" ? (
          <div className="pet-variant-icon">{speciesData.icon}</div>
        ) : null}
        <div className="pet-mood-aura"></div>
        {showGlow && <div className="pet-glow-aura"></div>}
        {showGlowMax && <div className="pet-glow-max-aura"></div>}
        {isFocusZen && <div className="pet-focus-zen-aura"></div>}
        {friendshipLevel >= 4 && <div className="pet-friendship-aura"></div>}
        {showSparkles && <div className="sparkle-particle"></div>}
        {isBirthday && <div className="pet-accessory party-hat">🥳</div>}
        {showFire && <div className="fire-particle"></div>}
        {energy < 20 && <div className="tired-eyes-effect"></div>}
        {isAncient && <div className="pet-accessory horns"></div>}
        {level >= 3 && enabledAccessories.collar && <div className="pet-accessory collar"></div>}
        {level >= 7 && enabledAccessories.hat && <div className="pet-accessory hat"></div>}
        {enabledAccessories.bowtie && <div className="pet-accessory bowtie"></div>}
        {enabledAccessories.glasses && <div className="pet-accessory glasses"></div>}
        {level >= 5 && enabledAccessories.wings && <div className="pet-wings"></div>}
        <div className={`pet-eyes ${state === "sleeping" ? "eyes-closed" : ""}`}>
          <div className="eye" style={{ transform: state === "sleeping" ? "none" : `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
            {state === "sleeping" && <div className="closed-eye-line"></div>}
          </div>
          <div className="eye" style={{ transform: state === "sleeping" ? "none" : `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
            {state === "sleeping" && <div className="closed-eye-line"></div>}
          </div>
        </div>
        {happiness >= 80 && <div className="pet-aura happiness-high"></div>}
        {happiness >= 50 && happiness < 80 && <div className="pet-aura happiness-mid"></div>}
        {happiness < 25 && <div className="pet-aura happiness-low"></div>}
        
        {state === "disturbed" && <div className="smoke-particle"></div>}
        {(state === "happy" || isBeingPetted) && <div className="heart-particle"></div>}
        
        {/* Seasonal Particles */}
        {season === "spring" && moodCategory === "joyful" && (
          <div className="seasonal-particles spring">
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
          </div>
        )}
        {season === "autumn" && (
          <div className="seasonal-particles autumn">
            <div className="falling-leaf"></div>
            <div className="falling-leaf"></div>
            <div className="falling-leaf"></div>
          </div>
        )}
        {season === "winter" && (
          <div className="seasonal-particles winter">
            <div className="snow-flake-large"></div>
            <div className="snow-flake-large"></div>
          </div>
        )}

        {/* Weather Particles */}
        {weatherCondition === "rainy" && (
          <div className="weather-particles rain">
            <div className="rain-drop"></div>
            <div className="rain-drop"></div>
            <div className="rain-drop"></div>
          </div>
        )}
        {weatherCondition === "snowy" && (
          <div className="weather-particles snow">
            <div className="snow-flake"></div>
            <div className="snow-flake"></div>
            <div className="snow-flake"></div>
          </div>
        )}
        {weatherCondition === "sunny" && moodCategory === "joyful" && (
          <div className="weather-particles sun">
            <div className="sun-ray"></div>
            <div className="sun-ray"></div>
            <div className="sun-ray"></div>
          </div>
        )}

        {(thoughtOverride || thought) && (
          <div 
            className={`pet-speech-bubble ${onThoughtClick ? "pet-speech-bubble-actionable" : ""}`}
            onClick={(e) => {
              if (onThoughtClick) {
                e.stopPropagation();
                onThoughtClick();
              }
            }}
          >
            {thoughtOverride || thought}
          </div>
        )}
        {state === "sleeping" && dream && (
          <div className="pet-dream-cloud">
            <div className="pet-dream-bubble">
              {dream}
            </div>
          </div>
        )}
        {activeFriend && (
          <div className="pet-friend-container" style={{ borderColor: activeFriend.color }}>
            <div className="pet-friend-icon">{activeFriend.icon}</div>
            <div className="pet-friend-name">{activeFriend.name}</div>
          </div>
        )}
        <div className="pet-interaction-overlay">
          <button className="chat-btn" onClick={(e) => { e.stopPropagation(); if (onChat) onChat(); }} title="Chat with Pet" aria-label="Chat with Pet">💬</button>
        </div>
      </div>
      {state === "disturbed" && movementProgress > 0 && (
        <svg className="pet-progress-ring-container" viewBox="0 0 120 120">
          <circle
            className="pet-progress-ring-track"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="4"
          />
          <circle
            className="pet-progress-ring-fill"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#3498db"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="339.292"
            strokeDashoffset={339.292 - (Math.min(1, movementProgress) * 339.292)}
            transform="rotate(-90 60 60)"
          />
        </svg>
      )}
      <div className="pet-hunger-container">
        <div className="pet-hunger-bar" style={{ width: `${hunger}%`, backgroundColor: hunger < 20 ? "#e74c3c" : hunger < 50 ? "#f39c12" : "#2ecc71" }}></div>
      </div>
      <div className="pet-hydration-container">
        <div className="pet-hydration-bar" style={{ width: `${hydration}%`, backgroundColor: hydration < 20 ? "#e74c3c" : hydration < 50 ? "#f39c12" : "#3498db" }}></div>
      </div>
      <div className="pet-energy-container">
        <div className="pet-energy-bar" style={{ width: `${energy}%`, backgroundColor: energy < 20 ? "#9b59b6" : energy < 50 ? "#8e44ad" : "#3498db" }}></div>
      </div>
      <div className="pet-label">
        <span className="pet-level">Lv.{level}</span> {name} {friendshipLevel >= 4 && <span className="friendship-badge" title="High Friendship! ❤️">❤️</span>}
        <span className="pet-stage-tag">[{evolutionStage}]</span>
        <span className="pet-state-tag">({state})</span>
        <span className="pet-mood-tag">[{moodCategory}]</span>
        <span className="pet-energy-tag">({energyCategory})</span>
        <span className="pet-happiness-tag">[{happiness >= 80 ? "Joyful" : happiness >= 50 ? "Happy" : happiness >= 25 ? "Content" : "Grumpy"}]</span>
        <span className="pet-season-tag">[{season}]</span>
      </div>
    </div>
  );
};

export default Pet;
