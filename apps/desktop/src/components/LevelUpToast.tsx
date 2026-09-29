import React, { useEffect, useState } from "react";
import { LEVEL_REWARDS } from "../rewards";
import "./LevelUpToast.css";

interface LevelUpToastProps {
  level: number;
  onClose: () => void;
  displayTimeout?: number;
}

const LevelUpToast: React.FC<LevelUpToastProps> = ({ 
  level, 
  onClose, 
  displayTimeout = 7000 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const reward = LEVEL_REWARDS.find(r => r.level === level);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, displayTimeout);

    return () => clearTimeout(timer);
  }, [displayTimeout, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className={`level-up-toast ${isVisible ? "visible" : "hidden"}`}>
      <div className="toast-icon">✨</div>
      <div className="toast-content">
        <h3>Level Up!</h3>
        <p>Your pet reached <strong>Level {level}</strong>!</p>
        {reward ? (
          <div className="reward-unlocked">
            <span className="reward-label">Unlocked:</span>
            <span className="reward-text">{reward.reward}</span>
          </div>
        ) : (
          <p className="congrats">Keep moving to grow together.</p>
        )}
      </div>
      <button aria-label="Close" className="close-btn" onClick={handleClose}>×</button>
    </div>
  );
};

export default LevelUpToast;
