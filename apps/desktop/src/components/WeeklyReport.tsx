import React from 'react';
import './WeeklyReport.css';

interface WeeklyData {
  day: string;
  moves: number;
  calories: number;
  avgMood?: number;
  moodSamples?: number;
}

interface WeeklyReportProps {
  data: WeeklyData[];
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ data }) => {
  const maxMoves = Math.max(...data.map(d => d.moves), 1);
  
  // Mood chart calculations
  const chartHeight = 60;
  const chartWidth = 240;
  const points = data.map((d, i) => {
    const x = (i * (chartWidth / (data.length - 1)));
    const moodValue = d.avgMood || 0;
    const y = chartHeight - (moodValue / 100 * chartHeight);
    return { x, y, value: moodValue };
  });

  const linePath = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  return (
    <div className="weekly-report">
      <h3>Weekly Activity</h3>
      <div className="bar-chart">
        {data.map((dayData, index) => (
          <div key={index} className="bar-group">
            <div className="bar-container">
              <div 
                className="bar-fill" 
                style={{ height: `${(dayData.moves / maxMoves) * 100}%` }}
                title={`${dayData.moves} moves, ${dayData.calories} calories`}
              >
                <span className="bar-tooltip">{dayData.moves}</span>
              </div>
            </div>
            <span className="bar-label">{dayData.day}</span>
          </div>
        ))}
      </div>

      <div className="mood-history-section">
        <h4>Mood Trend</h4>
        <div className="mood-chart-container">
          <svg width={chartWidth} height={chartHeight} className="mood-svg">
            {/* Background grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} className="grid-line" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} className="grid-line" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} className="grid-line" />
            
            {/* The trend line */}
            <path d={linePath} fill="none" className="mood-line" />
            
            {/* Points */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3" className="mood-point" />
            ))}
          </svg>
        </div>
      </div>

      <div className="weekly-totals">
        <div className="weekly-total-item">
          <span className="label">Total Moves</span>
          <span className="value">{data.reduce((acc, curr) => acc + curr.moves, 0)}</span>
        </div>
        <div className="weekly-total-item">
          <span className="label">Total Calories</span>
          <span className="value">{data.reduce((acc, curr) => acc + curr.calories, 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
