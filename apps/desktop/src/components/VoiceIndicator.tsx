import React from "react";
import "./VoiceIndicator.css";

interface VoiceIndicatorProps {
  soundLevel: number;
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ soundLevel }) => {
  const isActive = soundLevel > 0.1;
  
  return (
    <div className="voice-indicator" style={{ opacity: soundLevel > 0.05 ? 1 : 0.5 }}>
      <div className={`voice-indicator-dot ${isActive ? "active" : ""}`}></div>
      <span>VOICE</span>
      <div className="voice-indicator-bars">
        <div className="voice-bar" style={{ height: `${Math.min(soundLevel * 100, 100)}%` }}></div>
        <div className="voice-bar" style={{ height: `${Math.min(soundLevel * 70, 70)}%` }}></div>
        <div className="voice-bar" style={{ height: `${Math.min(soundLevel * 40, 40)}%` }}></div>
      </div>
    </div>
  );
};

export default VoiceIndicator;
