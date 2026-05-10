import React from "react";
import { PersonalityType, PERSONALITIES } from "../personalities";
import { PetSpecies, PET_SPECIES } from "../collection";
import { Background, BACKGROUNDS } from "../backgrounds";
import "./Customization.css";

interface ShopItem {
  id: string;
  name: string;
  type: "color" | "accessory" | "personality" | "species" | "background";
  value: string;
  price: number;
  requirement?: number; // level requirement
}

const COSMETIC_ITEMS: ShopItem[] = [
  // Colors
  { id: "color-green", name: "Original Green", type: "color", value: "#4caf50", price: 0 },
  { id: "color-blue", name: "Ocean Blue", type: "color", value: "#2196f3", price: 50 },
  { id: "color-purple", name: "Royal Purple", type: "color", value: "#9b59b6", price: 100 },
  { id: "color-pink", name: "Bubblegum Pink", type: "color", value: "#e91e63", price: 150 },
  { id: "color-orange", name: "Sunset Orange", type: "color", value: "#ff9800", price: 200 },
  { id: "color-gold", name: "Golden Glow", type: "color", value: "#f1c40f", price: 500, requirement: 10 },
  
  // Accessories
  { id: "collar", name: "Spiky Collar", type: "accessory", value: "collar", price: 0, requirement: 3 },
  { id: "wings", name: "Dragon Wings", type: "accessory", value: "wings", price: 0, requirement: 5 },
  { id: "hat", name: "Tiny Hat", type: "accessory", value: "hat", price: 0, requirement: 7 },
  { id: "bowtie", name: "Fancy Bowtie", type: "accessory", value: "bowtie", price: 100 },
  { id: "glasses", name: "Cool Shades", type: "accessory", value: "glasses", price: 250, requirement: 8 },
];

interface CustomizationProps {
  level: number;
  petCoins: number;
  setPetCoins: (coins: number) => void;
  unlockedCosmetics: string[];
  setUnlockedCosmetics: (cosmetics: string[]) => void;
  petColor: string;
  setPetColor: (color: string) => void;
  enabledAccessories: Record<string, boolean>;
  toggleAccessory: (id: string) => void;
  onCosmeticBought: () => void;
  personality: PersonalityType;
  setPersonality: (p: PersonalityType) => void;
  unlockedSpecies: PetSpecies[];
  selectedSpecies: string;
  setSelectedSpecies: (id: string) => void;
  selectedBackground: string;
  setSelectedBackground: (id: string) => void;
  unlockedBackgrounds: string[];
  setUnlockedBackgrounds: (ids: string[]) => void;
}

const Customization: React.FC<CustomizationProps> = ({ 
  level, 
  petCoins,
  setPetCoins,
  unlockedCosmetics,
  setUnlockedCosmetics,
  petColor,
  setPetColor,
  enabledAccessories, 
  toggleAccessory,
  onCosmeticBought,
  personality,
  setPersonality,
  unlockedSpecies,
  selectedSpecies,
  setSelectedSpecies,
  selectedBackground,
  setSelectedBackground,
  unlockedBackgrounds,
  setUnlockedBackgrounds
}) => {
  const [activeTab, setActiveTab] = React.useState<"color" | "accessory" | "personality" | "species" | "background">("color");

  const handleBuyCosmetic = (item: ShopItem) => {
    if (petCoins >= item.price) {
      setPetCoins(petCoins - item.price);
      setUnlockedCosmetics([...unlockedCosmetics, item.id]);
      onCosmeticBought();
    }
  };

  const handleBuyBackground = (bg: Background) => {
    if (petCoins >= bg.price) {
      setPetCoins(petCoins - bg.price);
      setUnlockedBackgrounds([...unlockedBackgrounds, bg.id]);
      onCosmeticBought();
    }
  };

  const getPersonalityRequirement = (id: PersonalityType) => {
    switch (id) {
      case 'adventurous': return 3;
      case 'hyper': return 5;
      case 'lazy': return 5;
      case 'grumpy': return 10;
      case 'zen': return 15;
      default: return 0;
    }
  };

  const getPersonalityIcon = (id: PersonalityType) => {
    switch (id) {
      case 'adventurous': return "🧭";
      case 'hyper': return "⚡";
      case 'lazy': return "💤";
      case 'grumpy': return "😠";
      case 'zen': return "🧘";
      default: return "😊";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rare': return "#3498db";
      case 'epic': return "#9b59b6";
      case 'legendary': return "#f1c40f";
      default: return "#95a5a6";
    }
  };

  return (
    <div className="customization-section">
      <h3>Appearance & Personality</h3>
      
      <div className="shop-tabs">
        <button 
          className={activeTab === "color" ? "active" : ""} 
          onClick={() => setActiveTab("color")}
        >
          Colors
        </button>
        <button 
          className={activeTab === "accessory" ? "active" : ""} 
          onClick={() => setActiveTab("accessory")}
        >
          Accessories
        </button>
        <button 
          className={activeTab === "personality" ? "active" : ""} 
          onClick={() => setActiveTab("personality")}
        >
          Personality
        </button>
        <button 
          className={activeTab === "species" ? "active" : ""} 
          onClick={() => setActiveTab("species")}
        >
          Species
        </button>
        <button 
          className={activeTab === "background" ? "active" : ""} 
          onClick={() => setActiveTab("background")}
        >
          Backgrounds
        </button>
      </div>

      <div className="shop-grid">
        {activeTab === "background" ? (
          BACKGROUNDS.map(bg => {
            const isUnlocked = unlockedBackgrounds.includes(bg.id) || bg.price === 0;
            const isSelected = selectedBackground === bg.id;
            const canAfford = petCoins >= bg.price;

            return (
              <div 
                key={bg.id} 
                className={`shop-item background ${isUnlocked ? "unlocked" : "locked"} ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedBackground(bg.id);
                  } else if (canAfford) {
                    handleBuyBackground(bg);
                  }
                }}
                title={bg.description}
              >
                <div className={`item-preview preview-${bg.className}`}>
                  <span className="item-icon">{bg.icon}</span>
                  {bg.buff && (
                    <div className="buff-badge" title={`${bg.buff.type} bonus`}>
                      {bg.buff.type === 'mood' && '✨'}
                      {bg.buff.type === 'xp' && '📚'}
                      {bg.buff.type === 'energy' && '⚡'}
                      {bg.buff.type === 'coins' && '🪙'}
                      {bg.buff.type === 'calories' && '🔥'}
                    </div>
                  )}
                </div>
                <div className="item-info">
                  <div className="item-name">{bg.name}</div>
                  {!isUnlocked ? (
                    <div className="item-price">💰 {bg.price}</div>
                  ) : (
                    <div className="item-status">{isSelected ? "ACTIVE" : "SELECT"}</div>
                  )}
                </div>
              </div>
            );
          })
        ) : activeTab === "species" ? (
          PET_SPECIES.map(species => {
            const isUnlocked = unlockedSpecies.some(s => s.id === species.id);
            const isSelected = selectedSpecies === species.id;

            return (
              <div 
                key={species.id} 
                className={`shop-item species ${isUnlocked ? "unlocked" : "locked"} ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (isUnlocked) setSelectedSpecies(species.id);
                }}
                title={isUnlocked ? species.description : `Hint: ${species.discoveryHint}`}
              >
                <div className="item-preview" style={isUnlocked ? { backgroundColor: species.color } : {}}>
                  <span className="item-icon">{isUnlocked ? species.icon : "🔒"}</span>
                  <div 
                    className="rarity-badge" 
                    style={{ backgroundColor: getRarityColor(species.rarity) }}
                  >
                    {species.rarity.toUpperCase()}
                  </div>
                </div>
                <div className="item-info">
                  <div className="item-name">{isUnlocked ? species.name : "???"}</div>
                  {!isUnlocked ? (
                    <div className="item-status hint">DISCOVER ME</div>
                  ) : (
                    <div className="item-status">{isSelected ? "ACTIVE" : "SELECT"}</div>
                  )}
                </div>
              </div>
            );
          })
        ) : activeTab === "personality" ? (
          PERSONALITIES.map(p => {
            const req = getPersonalityRequirement(p.id);
            const isUnlocked = level >= req;
            const isSelected = personality === p.id;

            return (
              <div 
                key={p.id} 
                className={`shop-item personality ${isUnlocked ? "unlocked" : "locked"} ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (isUnlocked) setPersonality(p.id);
                }}
                title={p.description}
              >
                <div className="item-preview">
                  <span className="item-icon">{getPersonalityIcon(p.id)}</span>
                  <div 
                    className="rarity-badge" 
                    style={{ backgroundColor: getRarityColor(p.rarity) }}
                  >
                    {p.rarity.toUpperCase()}
                  </div>
                </div>
                <div className="item-info">
                  <div className="item-name">{p.name}</div>
                  {!isUnlocked ? (
                    <div className="item-price">
                      <span className="level-locked">🔒 Lv. {req}</span>
                    </div>
                  ) : (
                    <div className="item-status">{isSelected ? "ACTIVE" : "SELECT"}</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          COSMETIC_ITEMS.filter(i => i.type === activeTab).map(item => {
            const isUnlocked = unlockedCosmetics.includes(item.id) || (item.price === 0 && (!item.requirement || level >= item.requirement));
            const canAfford = petCoins >= item.price;
            const meetsLevel = !item.requirement || level >= item.requirement;
            const isSelected = item.type === "color" ? petColor === item.value : enabledAccessories[item.value];

            return (
              <div 
                key={item.id} 
                className={`shop-item ${isUnlocked ? "unlocked" : "locked"} ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (isUnlocked) {
                    if (item.type === "color") {
                      setPetColor(item.value);
                    } else {
                      toggleAccessory(item.value);
                    }
                  } else if (canAfford && meetsLevel) {
                    handleBuyCosmetic(item);
                  }
                }}
              >
                <div className="item-preview" style={item.type === "color" ? { backgroundColor: item.value } : {}}>
                  {item.type === "accessory" && (
                    <span className="item-icon">
                      {item.id === "collar" && "📿"}
                      {item.id === "wings" && "👐"}
                      {item.id === "hat" && "🎩"}
                      {item.id === "bowtie" && "🎀"}
                      {item.id === "glasses" && "🕶️"}
                    </span>
                  )}
                </div>
                
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  {!isUnlocked ? (
                    <div className="item-price">
                      {meetsLevel ? (
                        <span className={canAfford ? "can-afford" : "too-expensive"}>
                          💰 {item.price}
                        </span>
                      ) : (
                        <span className="level-locked">🔒 Lv. {item.requirement}</span>
                      )}
                    </div>
                  ) : (
                    <div className="item-status">{isSelected ? "EQUIPPED" : "OWNED"}</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Customization;
