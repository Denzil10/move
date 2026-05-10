import React from "react";
import "./DailyRecap.css";

interface DailyRecapProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  petName: string;
  personalityName: string;
  stats: {
    movements: number;
    calories: number;
    goalReached: boolean;
    streak: number;
    careStreak: number;
    coinsEarned: number;
  };
  recapText: string;
}

const DailyRecap: React.FC<DailyRecapProps> = ({
  isOpen,
  onClose,
  onShare,
  petName,
  personalityName,
  stats,
  recapText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="daily-recap-overlay">
      <div className="daily-recap-modal">
        <div className="daily-recap-header">
          <h2>{petName}'s Daily Report 📊</h2>
          <span className="personality-tag">{personalityName} Perspective</span>
        </div>
        
        <div className="daily-recap-pet-section">
          <div className="pet-message">
            <span className="pet-avatar">🐉</span>
            <p>"{recapText}"</p>
          </div>
        </div>

        <div className="daily-recap-stats">
          <div className="recap-stat-card">
            <span className="stat-label">Movements</span>
            <span className="stat-value">{stats.movements}</span>
          </div>
          <div className="recap-stat-card">
            <span className="stat-label">Calories</span>
            <span className="stat-value">{stats.calories} kcal</span>
          </div>
          <div className="recap-stat-card">
            <span className="stat-label">Streak</span>
            <span className="stat-value">{stats.streak} days</span>
          </div>
          <div className="recap-stat-card">
            <span className="stat-label">Goal Met?</span>
            <span className="stat-value">{stats.goalReached ? "✅ YES!" : "❌ No"}</span>
          </div>
          <div className="recap-stat-card care-streak-card">
            <span className="stat-label">Care Streak</span>
            <span className="stat-value">❤️ {stats.careStreak} days</span>
          </div>
          <div className="recap-stat-card highlighted">
            <span className="stat-label">Coins Earned</span>
            <span className="stat-value">🪙 {stats.coinsEarned}</span>
          </div>
        </div>

        <div className="daily-recap-footer">
          <button className="recap-share-button" onClick={onShare}>
            📤 Share Report
          </button>
          <button className="recap-close-button" onClick={onClose}>
            Let's start today! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyRecap;
