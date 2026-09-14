import React from "react";
import { PetSpecies, PET_SPECIES } from "../collection";
import "./Collection.css";

interface CollectionProps {
  unlockedSpecies: PetSpecies[];
  recentlyDiscovered?: PetSpecies | null;
  onClose: () => void;
}

const Collection: React.FC<CollectionProps> = ({ unlockedSpecies, recentlyDiscovered, onClose }) => {
  return (
    <div className="collection-overlay">
      <div className="collection-modal">
        <div className="collection-header">
          <h2>Pet Collection</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        
        {recentlyDiscovered && (
          <div className="new-discovery-banner">
            <h3>New Discovery! 🌟</h3>
            <div className="discovery-item">
              <span className="discovery-icon">{recentlyDiscovered.icon}</span>
              <span className="discovery-name">{recentlyDiscovered.name}</span>
            </div>
          </div>
        )}
        
        <div className="collection-stats">
          <div className="stat-card">
            <span className="stat-label">Discovered</span>
            <span className="stat-value">{unlockedSpecies.length} / {PET_SPECIES.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Completion</span>
            <span className="stat-value">{Math.round((unlockedSpecies.length / PET_SPECIES.length) * 100)}%</span>
          </div>
        </div>

        <div className="species-grid">
          {PET_SPECIES.map(species => {
            const isUnlocked = unlockedSpecies.some(s => s.id === species.id);
            
            return (
              <div key={species.id} className={`species-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${species.rarity}`}>
                <div className="species-icon">
                  {isUnlocked ? species.icon : "?"}
                </div>
                <div className="species-info">
                  <div className="species-name-row">
                    <span className="species-name">{isUnlocked ? species.name : "???"}</span>
                    <span className="species-rarity">{species.rarity}</span>
                  </div>
                  <p className="species-description">
                    {isUnlocked ? species.description : `Hint: ${species.discoveryHint}`}
                  </p>
                  {isUnlocked && species.unlockedAt && (
                    <span className="unlocked-date">
                      Discovered: {new Date(species.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
