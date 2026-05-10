import React from 'react';
import './HealthInsights.css';

interface WeeklyData {
  day: string;
  moves: number;
  calories: number;
}

interface HealthInsightsProps {
  weeklyData: WeeklyData[];
  dailyMovements: number;
  dailyStreakGoal: number;
}

const HealthInsights: React.FC<HealthInsightsProps> = ({ 
  weeklyData, 
  dailyMovements, 
  dailyStreakGoal 
}) => {
  // Calculate average intensity (calories per move)
  const totalMoves = weeklyData.reduce((acc, curr) => acc + curr.moves, 0);
  const totalCalories = weeklyData.reduce((acc, curr) => acc + curr.calories, 0);
  const avgIntensity = totalMoves > 0 ? (totalCalories / totalMoves).toFixed(1) : "0.0";
  
  // Dynamic health tips based on activity
  const getTip = () => {
    if (dailyMovements === 0) {
      return "It's a new day! Start with a quick stretch to wake up your muscles.";
    }
    if (dailyMovements < dailyStreakGoal) {
      return "You're on your way! A few more movements will hit your goal.";
    }
    if (dailyMovements >= dailyStreakGoal) {
      return "Goal reached! Consistency is key to long-term health.";
    }
    return "Keep it up! Every movement counts towards your well-being.";
  };

  const getIntensityFeedback = () => {
    const intensity = parseFloat(avgIntensity);
    if (intensity === 0) return "Start moving to see your intensity!";
    if (intensity < 0.5) return "Light activity. Great for staying limber!";
    if (intensity < 1.0) return "Moderate intensity. Good calorie burn!";
    return "High intensity! You're really working hard.";
  };

  return (
    <div className="health-insights">
      <h3>Health Insights</h3>
      <div className="insight-grid">
        <div className="insight-item">
          <span className="insight-label">Avg. Intensity</span>
          <span className="insight-value">{avgIntensity} <small>cal/move</small></span>
          <span className="insight-feedback">{getIntensityFeedback()}</span>
        </div>
        <div className="insight-item tip-item">
          <span className="insight-label">Today's Tip</span>
          <p className="insight-tip">{getTip()}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;
