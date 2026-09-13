import React, { useEffect, useState } from "react";
import "./VictoryToast.css";

interface VictoryToastProps {
  calories: number;
  durationSeconds?: number;
  intensity?: number;
  onClose: () => void;
  displayTimeout?: number;
}

const MESSAGES = [
  "Great job!",
  "Keep it up!",
  "You're doing great!",
  "Feeling better?",
  "Stay active!",
  "Leveling up soon!",
  "You're a movement pro!"
];

const VictoryToast: React.FC<VictoryToastProps> = ({ 
  calories, 
  durationSeconds, 
  intensity,
  onClose, 
  displayTimeout = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [message] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for fade out animation
    }, displayTimeout);

    return () => clearTimeout(timer);
  }, [displayTimeout, onClose]);

  return (
    <div className={`victory-toast ${isVisible ? "visible" : "hidden"}`}>
      <div className="toast-icon">🔥</div>
      <div className="toast-content">
        <h3>{message}</h3>
        <p>You moved{durationSeconds ? ` for ${Math.round(durationSeconds)}s` : ""}!</p>
        {intensity !== undefined && (
          <p>Movement Intensity: <strong>{Math.round(intensity)}%</strong></p>
        )}
        <p>Estimated <strong>{calories}</strong> calories burned.</p>
      </div>
      <button className="close-btn" onClick={() => setIsVisible(false)}>×</button>
    </div>
  );
};

export default VictoryToast;
