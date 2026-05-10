import React from 'react';
import './PetNeedsDashboard.css';
import { MoodCategory } from '../hooks/usePetMood';
import { EnergyCategory } from '../hooks/usePetEnergy';

interface PetNeedsDashboardProps {
  hunger: number;
  hydration: number;
  energy: number;
  energyCategory: EnergyCategory;
  moodCategory: MoodCategory;
  happiness: number;
  isResting: boolean;
  sleepScheduleEnabled?: boolean;
  bedtime?: string;
  wakeTime?: string;
  onFeed: () => void;
  onDrink: () => void;
  onRest: () => void;
}

const PetNeedsDashboard: React.FC<PetNeedsDashboardProps> = ({
  hunger,
  hydration,
  energy,
  energyCategory,
  moodCategory,
  happiness,
  isResting,
  sleepScheduleEnabled = false,
  bedtime = "22:00",
  wakeTime = "07:00",
  onFeed,
  onDrink,
  onRest
}) => {
  const getMoodEmoji = (mood: MoodCategory) => {
    switch (mood) {
      case 'grumpy': return '😠';
      case 'neutral': return '😐';
      case 'content': return '😊';
      case 'joyful': return '🤩';
      default: return '😐';
    }
  };

  const getEnergyStatus = (category: EnergyCategory) => {
    switch (category) {
      case 'exhausted': return { label: 'Exhausted', color: '#f38ba8' };
      case 'tired': return { label: 'Tired', color: '#fab387' };
      case 'rested': return { label: 'Rested', color: '#89b4fa' };
      case 'full': return { label: 'Full', color: '#a6e3a1' };
      default: return { label: 'Normal', color: '#89b4fa' };
    }
  };

  const energyStatus = getEnergyStatus(energyCategory);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  const isWithinWindow = (time: string, start: string, end: string) => {
    if (start <= end) {
      return time >= start && time < end;
    } else {
      return time >= start || time < end;
    }
  };

  const isAutoSleepTime = sleepScheduleEnabled && isWithinWindow(currentTimeStr, bedtime, wakeTime);

  return (
    <div className="pet-needs-dashboard">
      <div className="dashboard-header">
        <h4>Pet Status</h4>
        <span className="mood-badge" title={`Mood: ${moodCategory}. Joyful pets are more patient. Current Happiness: ${Math.round(happiness)}% (+${((1 + (happiness / 100) * 0.25 - 1) * 100).toFixed(0)}% Bonus)`}>
          {getMoodEmoji(moodCategory)} {moodCategory.charAt(0).toUpperCase() + moodCategory.slice(1)}
        </span>
      </div>

      <div className="needs-grid">
        <div className="need-item" title="Hunger decreases over time. If critically low, it may affect your pet's mood and energy.">
          <div className="need-label">
            <span>🍖 Hunger</span>
            <span className="need-value">{hunger}%</span>
          </div>
          <div className="need-bar-container">
            <div 
              className="need-bar-fill hunger" 
              style={{ 
                width: `${hunger}%`,
                backgroundColor: hunger < 20 ? '#f38ba8' : hunger < 50 ? '#fab387' : '#a6e3a1'
              }}
            />
          </div>
          <button 
            className="need-action-btn feed" 
            onClick={onFeed}
            disabled={hunger >= 100}
          >
            🍖 Feed
          </button>
        </div>

        <div className="need-item" title="Hydration decreases over time. Give water to keep your pet fresh and boost its mood.">
          <div className="need-label">
            <span>💧 Hydration</span>
            <span className="need-value">{hydration}%</span>
          </div>
          <div className="need-bar-container">
            <div 
              className="need-bar-fill hydration" 
              style={{ 
                width: `${hydration}%`,
                backgroundColor: hydration < 20 ? '#f38ba8' : hydration < 50 ? '#fab387' : '#74c7ec'
              }}
            />
          </div>
          <button 
            className="need-action-btn drink" 
            onClick={onDrink}
            disabled={hydration >= 100}
          >
            💧 Water
          </button>
        </div>

        <div className="need-item" title="Energy is used during movement. Low energy makes your pet tired. Put it to bed to recover faster!">
          <div className="need-label">
            <span>⚡ Energy</span>
            <span className="need-value">{energy}%</span>
          </div>
          <div className="need-bar-container">
            <div 
              className="need-bar-fill energy" 
              style={{ 
                width: `${energy}%`,
                backgroundColor: energyStatus.color
              }}
            />
          </div>
          <button 
            className={`need-action-btn rest ${isResting ? 'active' : ''} ${isAutoSleepTime ? 'auto-sleep' : ''}`}
            onClick={onRest}
            disabled={(!isResting && energy >= 100) || isAutoSleepTime}
          >
            {isResting ? 'Wake Up' : 'Put to Bed'}
          </button>
        </div>
      </div>
      
      {isResting && (
        <div className="resting-indicator">
          <span className="zzz">Zzz...</span>
          <p>{isAutoSleepTime ? 'In Sleep Schedule' : 'Pet is sleeping'}</p>
        </div>
      )}

      {sleepScheduleEnabled && (
        <div className="sleep-schedule-status">
          <span className="schedule-icon">⏰</span>
          <span className="schedule-label">
            {isAutoSleepTime ? `Wake up at ${wakeTime}` : `Bedtime at ${bedtime}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default PetNeedsDashboard;
