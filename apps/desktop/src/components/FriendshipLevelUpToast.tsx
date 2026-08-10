import React, { useEffect, useState } from "react";
import "./FriendshipLevelUpToast.css";

interface FriendshipLevelUpToastProps {
  title: string;
  multiplier: number;
  onClose: () => void;
  displayTimeout?: number;
}

const FriendshipLevelUpToast: React.FC<FriendshipLevelUpToastProps> = ({ 
  title, 
  multiplier,
  onClose, 
  displayTimeout = 7000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

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
    <div className={`friendship-level-up-toast ${isVisible ? "visible" : "hidden"}`}>
      <div className="toast-icon">❤️</div>
      <div className="toast-content">
        <h3>Bond Deepened!</h3>
        <p>Your bond is now: <strong>{title}</strong></p>
        <div className="friendship-bonus">
          <span className="bonus-label">Reward:</span>
          <span className="bonus-text">+{Math.round((multiplier - 1) * 100)}% Coins & XP Multiplier</span>
        </div>
      </div>
      <button className="close-btn" aria-label="Close notification" onClick={handleClose}>×</button>
    </div>
  );
};

export default FriendshipLevelUpToast;
