import React, { useEffect, useState } from "react";
import "./AchievementToast.css";

interface AchievementToastProps {
  title: string;
  description: string;
  icon: string;
  onClose: () => void;
  displayTimeout?: number;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ 
  title, 
  description, 
  icon, 
  onClose, 
  displayTimeout = 6000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for fade out animation
    }, displayTimeout);

    return () => clearTimeout(timer);
  }, [displayTimeout, onClose]);

  return (
    <div className={`achievement-toast ${isVisible ? "visible" : "hidden"}`}>
      <div className="toast-icon">{icon}</div>
      <div className="toast-content">
        <span className="toast-label">ACHIEVEMENT UNLOCKED</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button className="close-btn" onClick={() => setIsVisible(false)} aria-label="Close">×</button>
    </div>
  );
};

export default AchievementToast;
