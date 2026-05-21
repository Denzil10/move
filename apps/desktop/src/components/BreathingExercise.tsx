import { useState, useEffect, useCallback } from 'react';
import './BreathingExercise.css';

interface BreathingExerciseProps {
  onClose: () => void;
  onComplete: (cyclesCompleted: number) => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export default function BreathingExercise({ onClose, onComplete }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // 4-7-8 Breathing technique
  const INHALE_TIME = 4;
  const HOLD_TIME = 7;
  const EXHALE_TIME = 8;

  const nextPhase = useCallback(() => {
    if (phase === 'inhale') {
      setPhase('hold');
      setTimeLeft(HOLD_TIME);
    } else if (phase === 'hold') {
      setPhase('exhale');
      setTimeLeft(EXHALE_TIME);
    } else if (phase === 'exhale') {
      setCycles(prev => prev + 1);
      setPhase('inhale');
      setTimeLeft(INHALE_TIME);
    } else {
      setPhase('inhale');
      setTimeLeft(INHALE_TIME);
    }
  }, [phase]);

  useEffect(() => {
    let timer: number;
    
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      nextPhase();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft, nextPhase]);

  const toggleExercise = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('idle');
      setTimeLeft(0);
    } else {
      setIsActive(true);
      setPhase('inhale');
      setTimeLeft(INHALE_TIME);
    }
  };

  const handleClose = () => {
    if (cycles > 0) {
      onComplete(cycles);
    }
    onClose();
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      default: return 'Ready?';
    }
  };

  return (
    <div className="breathing-exercise-overlay">
      <h2>4-7-8 Breathing Exercise</h2>
      <p style={{ opacity: 0.8, marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
        A simple technique to reduce anxiety and help you focus. Inhale for 4s, hold for 7s, exhale for 8s.
      </p>

      <div className="breathing-circle-container">
        <div 
          className={`breathing-circle ${phase}`} 
          style={{ 
            transitionDuration: phase === 'inhale' ? `${INHALE_TIME}s` : 
                               phase === 'hold' ? '1s' : 
                               phase === 'exhale' ? `${EXHALE_TIME}s` : '1s' 
          }}
        />
        <div className="breathing-instruction">
          <div>{getInstruction()}</div>
          {isActive && <div className="breathing-timer">{timeLeft}s</div>}
        </div>
      </div>

      <div className="breathing-stats">
        <div className="breathing-stat">
          <div className="breathing-stat-value">{cycles}</div>
          <div className="breathing-stat-label">Cycles</div>
        </div>
        <div className="breathing-stat">
          <div className="breathing-stat-value">{Math.floor(cycles * (INHALE_TIME + HOLD_TIME + EXHALE_TIME) / 60)}m {cycles * (INHALE_TIME + HOLD_TIME + EXHALE_TIME) % 60}s</div>
          <div className="breathing-stat-label">Duration</div>
        </div>
      </div>

      <div className="breathing-controls">
        <button 
          className={`breathing-btn ${isActive ? 'stop' : 'start'}`}
          onClick={toggleExercise}
        >
          {isActive ? 'Stop' : 'Start Breathing'}
        </button>
        <button className="breathing-btn close" onClick={handleClose} aria-label="Close">
          {cycles > 0 ? 'Finish & Close' : 'Close'}
        </button>
      </div>
    </div>
  );
}
