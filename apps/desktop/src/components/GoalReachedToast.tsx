import React, { useEffect, useState } from "react";
import "./GoalReachedToast.css";

interface GoalReachedToastProps {
  goal: number;
  onClose: () => void;
  displayTimeout?: number;
}

const GoalReachedToast: React.FC<GoalReachedToastProps> = ({ 
  goal, 
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
    <div className={`goal-reached-toast ${isVisible ? "visible" : "hidden"}`}>
      <div className="toast-icon">🏆</div>
      <div className="toast-content">
        <h3>Daily Goal Reached!</h3>
        <p>You've burned <strong>{goal}</strong> calories today.</p>
        <p className="praise">Incredible consistency! Your pet is so proud of you.</p>
      </div>
      <button className="close-btn" aria-label="Close" onClick={handleClose}>×</button>
    </div>
  );
};

export default GoalReachedToast;
