import React from "react";
import "./PetDreams.css";

export interface PetDream {
  id: string;
  date: string;
  text: string;
  personality: string;
}

interface PetDreamsProps {
  dreams: PetDream[];
}

const PetDreams: React.FC<PetDreamsProps> = ({ dreams }) => {
  if (dreams.length === 0) {
    return (
      <div className="pet-dreams-empty">
        <p>No dreams recorded yet. Your pet needs to sleep to dream!</p>
        <span className="dream-icon">💤</span>
      </div>
    );
  }

  return (
    <div className="pet-dreams-container">
      <h3>Dream Journal</h3>
      <div className="dreams-list">
        {dreams.map((dream) => (
          <div key={dream.id} className="dream-entry">
            <div className="dream-header">
              <span className="dream-date">
                {new Date(dream.date).toLocaleDateString()} {new Date(dream.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="dream-personality">{dream.personality}</span>
            </div>
            <div className="dream-content">
              <span className="dream-cloud-icon">☁️</span>
              <p className="dream-text">{dream.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetDreams;
