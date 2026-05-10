import React from 'react';
import './TrainingDashboard.css';

interface TrainingLevels {
  energy: number;
  xp: number;
  coins: number;
  hunger?: number;
  strength?: number;
}

interface TrainingDashboardProps {
  trainingLevels: TrainingLevels;
  activeTraining: string | null;
  onCancelTraining: () => void;
}

const TrainingDashboard: React.FC<TrainingDashboardProps> = ({
  trainingLevels,
  activeTraining,
  onCancelTraining
}) => {
  const getTrainingDetails = (type: string) => {
    switch (type) {
      case 'xp':
        return {
          label: 'XP Training',
          description: 'Focus on learning efficiency. Improves XP multiplier.',
          currentBoost: `${((trainingLevels.xp || 0) * 5).toFixed(0)}%`,
          nextBoost: `${(((trainingLevels.xp || 0) + 1) * 5).toFixed(0)}%`,
          icon: '✨'
        };
      case 'coins':
        return {
          label: 'Coin Training',
          description: 'Learn to spot valuable treasures. Improves Coin multiplier.',
          currentBoost: `${((trainingLevels.coins || 0) * 5).toFixed(0)}%`,
          nextBoost: `${(((trainingLevels.coins || 0) + 1) * 5).toFixed(0)}%`,
          icon: '🪙'
        };
      case 'energy':
        return {
          label: 'Energy Training',
          description: 'Improve physical endurance. Reduces energy consumption.',
          currentBoost: `${((trainingLevels.energy || 0) * 5).toFixed(0)}%`,
          nextBoost: `${(((trainingLevels.energy || 0) + 1) * 5).toFixed(0)}%`,
          icon: '⚡'
        };
      case 'hunger':
        return {
          label: 'Hunger Training',
          description: 'Master digestive efficiency. Reduces hunger depletion.',
          currentBoost: `${((trainingLevels.hunger || 0) * 5).toFixed(0)}%`,
          nextBoost: `${(((trainingLevels.hunger || 0) + 1) * 5).toFixed(0)}%`,
          icon: '🍖'
        };
      case 'strength':
        return {
          label: 'Strength Training',
          description: 'Work those muscles! Improves calorie burn efficiency.',
          currentBoost: `${((trainingLevels.strength || 0) * 5).toFixed(0)}%`,
          nextBoost: `${(((trainingLevels.strength || 0) + 1) * 5).toFixed(0)}%`,
          icon: '🏋️'
        };
      default:
        return {
          label: 'Unknown Training',
          description: '',
          currentBoost: '0%',
          nextBoost: '0%',
          icon: '❓'
        };
    }
  };

  const details = activeTraining ? getTrainingDetails(activeTraining) : null;

  return (
    <div className="training-dashboard">
      <div className="training-header">
        <h4>Pet Training 🎓</h4>
      </div>

      {activeTraining ? (
        <div className="active-training-box">
          <div className="active-training-info">
            <span className="training-icon-large">{details?.icon}</span>
            <div className="training-text">
              <strong>{details?.label} in Progress</strong>
              <p>{details?.description}</p>
              <div className="training-boost-preview">
                <span>Current: {details?.currentBoost}</span>
                <span className="arrow">➡️</span>
                <span>Next: {details?.nextBoost}</span>
              </div>
            </div>
          </div>
          <div className="training-requirement-notice">
            <p><strong>Requirement:</strong> Complete a movement session to finish training.</p>
            <p className="small">Movement duration is doubled during training.</p>
          </div>
          <button className="cancel-training-btn" onClick={onCancelTraining}>
            Cancel Training
          </button>
        </div>
      ) : (
        <div className="training-stats-grid">
          <div className="training-stat-item" title="Reduces energy consumption per movement.">
            <span className="stat-icon">⚡</span>
            <div className="stat-info">
              <span className="stat-label">Stamina</span>
              <span className="stat-level">Lvl {trainingLevels.energy}</span>
            </div>
            <div className="stat-boost">-{((trainingLevels.energy || 0) * 5).toFixed(0)}% drain</div>
          </div>
          <div className="training-stat-item" title="Increases XP gained from movement.">
            <span className="stat-icon">✨</span>
            <div className="stat-info">
              <span className="stat-label">Learning</span>
              <span className="stat-level">Lvl {trainingLevels.xp}</span>
            </div>
            <div className="stat-boost">+{((trainingLevels.xp || 0) * 5).toFixed(0)}% XP</div>
          </div>
          <div className="training-stat-item" title="Increases coins found during movement.">
            <span className="stat-icon">🪙</span>
            <div className="stat-info">
              <span className="stat-label">Luck</span>
              <span className="stat-level">Lvl {trainingLevels.coins}</span>
            </div>
            <div className="stat-boost">+{((trainingLevels.coins || 0) * 5).toFixed(0)}% Coins</div>
          </div>
          <div className="training-stat-item" title="Reduces hunger depletion rate.">
            <span className="stat-icon">🍖</span>
            <div className="stat-info">
              <span className="stat-label">Metabolism</span>
              <span className="stat-level">Lvl {trainingLevels.hunger || 0}</span>
            </div>
            <div className="stat-boost">-{((trainingLevels.hunger || 0) * 5).toFixed(0)}% hunger</div>
          </div>
          <div className="training-stat-item" title="Increases calorie burn efficiency.">
            <span className="stat-icon">🏋️</span>
            <div className="stat-info">
              <span className="stat-label">Strength</span>
              <span className="stat-level">Lvl {trainingLevels.strength || 0}</span>
            </div>
            <div className="stat-boost">+{((trainingLevels.strength || 0) * 5).toFixed(0)}% Cal</div>
          </div>
        </div>
      )}
      
      {!activeTraining && (
        <p className="training-hint">
          Use <strong>Training Manuals</strong> from your inventory to start a session!
        </p>
      )}
    </div>
  );
};

export default TrainingDashboard;
