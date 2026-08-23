import React from "react";
import "./AppUsageReport.css";

interface AppUsageReportProps {
  appUsage: Record<string, number>;
  onClose: () => void;
}

const AppUsageReport: React.FC<AppUsageReportProps> = ({ appUsage, onClose }) => {
  const sortedApps = Object.entries(appUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalTime = Object.values(appUsage).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="app-usage-report-overlay">
      <div className="app-usage-report">
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        <h3>Productivity Focus Report 📈</h3>
        
        {totalTime === 0 ? (
          <div className="empty-state">
            <p>No productivity focus time recorded yet. Try using some focus apps!</p>
          </div>
        ) : (
          <>
            <div className="usage-stats-summary">
              <div className="total-focus-time">
                <span className="label">Total Focus Time</span>
                <span className="value">{Math.round(totalTime)} minutes</span>
              </div>
            </div>
            <div className="app-usage-list">
              {sortedApps.map(([app, minutes]) => (
                <div key={app} className="app-usage-item">
                  <div className="app-info">
                    <span className="app-name">{app}</span>
                    <span className="app-minutes">{Math.round(minutes)}m</span>
                  </div>
                  <div className="usage-bar-container">
                    <div 
                      className="usage-bar" 
                      style={{ width: `${(minutes / totalTime) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppUsageReport;
