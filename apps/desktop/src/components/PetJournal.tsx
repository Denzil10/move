import { useState } from "react";
import { Achievement } from "../achievements";
import { FriendshipData } from "../hooks/usePetFriendship";
import PetDiary, { DiaryEntry } from "./PetDiary";
import PetDreams, { PetDream } from "./PetDreams";
import { LEVEL_REWARDS } from "../rewards";
import "./PetJournal.css";

interface Milestone {
  level: number;
  date: string;
  description: string;
  moment?: string; // Optional emoji or icon representing the moment
}

interface WeeklyData {
  day: string;
  moves: number;
  calories: number;
  avgMood?: number;
  moodSamples?: number;
}

interface PetJournalProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  adoptionDate: string;
  milestones: Milestone[];
  unlockedAchievements: Achievement[];
  friendshipData: FriendshipData;
  diaryEntries: DiaryEntry[];
  onAddDiaryEntry: (text: string, mood: string) => void;
  onDeleteDiaryEntry: (id: string) => void;
  petDreams: PetDream[];
  currentMood: string;
  dailyNeedsAvg: { hunger: number; hydration: number; energy: number; samples: number };
  weeklyData: WeeklyData[];
  appUsage: Record<string, number>;
  onOpenCollection: () => void;
  onClose: () => void;
}

const FRIENDSHIP_LEVELS = [
  { level: 1, title: "Acquaintance", reward: "No bonus" },
  { level: 2, title: "Buddy", reward: "5% XP/Coin Bonus" },
  { level: 3, title: "Close Friend", reward: "10% XP/Coin Bonus" },
  { level: 4, title: "Best Friend", reward: "15% XP/Coin Bonus & Heart Badge" },
  { level: 5, title: "Soulmate", reward: "25% XP/Coin Bonus & Pink Aura" },
];

const PetJournal: React.FC<PetJournalProps> = ({
  level,
  xp,
  nextLevelXp,
  adoptionDate,
  milestones,
  unlockedAchievements,
  friendshipData,
  diaryEntries,
  onAddDiaryEntry,
  onDeleteDiaryEntry,
  petDreams,
  currentMood,
  dailyNeedsAvg,
  weeklyData,
  appUsage,
  onOpenCollection,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements" | "milestones" | "roadmap" | "diary" | "wellness" | "dreams" | "usage">("stats");

  // Calculate days together
  const daysTogether = adoptionDate 
    ? Math.max(1, Math.ceil((new Date().getTime() - new Date(adoptionDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  // Calculate Care Score
  const careScore = dailyNeedsAvg.samples > 0
    ? (dailyNeedsAvg.hunger + dailyNeedsAvg.hydration + dailyNeedsAvg.energy) / 3
    : 0;

  const getCareScoreFeedback = (score: number) => {
    if (score === 0) return "No data yet today. Keep interacting with your pet!";
    if (score > 90) return "Exceptional care! Your pet is thriving under your watch.";
    if (score > 70) return "Great job! Your pet feels well-attended and happy.";
    if (score > 50) return "Good effort. Try to keep those needs above 50% for a care streak!";
    return "Your pet needs more attention. Check in more often to build your bond.";
  };

  const getMoodEmoji = (avgMood: number) => {
    if (avgMood > 80) return "✨ Joyful";
    if (avgMood > 60) return "😊 Content";
    if (avgMood > 40) return "😐 Neutral";
    return "😤 Grumpy";
  };

  return (
    <div className="journal-overlay">
      <div className="journal-container">
        <div className="journal-header">
          <h2>Pet Journal</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="journal-tabs">
          <button 
            className={`tab-btn ${activeTab === "stats" ? "active" : ""}`} 
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
          <button 
            className={`tab-btn ${activeTab === "wellness" ? "active" : ""}`} 
            onClick={() => setActiveTab("wellness")}
          >
            Wellness
          </button>
          <button 
            className={`tab-btn ${activeTab === "diary" ? "active" : ""}`} 
            onClick={() => setActiveTab("diary")}
          >
            Diary
          </button>
          <button 
            className={`tab-btn ${activeTab === "dreams" ? "active" : ""}`} 
            onClick={() => setActiveTab("dreams")}
          >
            Dreams
          </button>
          <button 
            className={`tab-btn ${activeTab === "achievements" ? "active" : ""}`} 
            onClick={() => setActiveTab("achievements")}
          >
            Awards
          </button>
          <button 
            className={`tab-btn ${activeTab === "milestones" ? "active" : ""}`} 
            onClick={() => setActiveTab("milestones")}
          >
            Memories
          </button>
          <button 
            className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`} 
            onClick={() => setActiveTab("roadmap")}
          >
            Roadmap
          </button>
          <button 
            className={`tab-btn ${activeTab === "usage" ? "active" : ""}`} 
            onClick={() => setActiveTab("usage")}
          >
            Usage
          </button>
        </div>
        
        <div className="journal-content">
          {activeTab === "diary" && (
            <div className="journal-section diary-section">
              <PetDiary
                entries={diaryEntries}
                onAddEntry={onAddDiaryEntry}
                onDeleteEntry={onDeleteDiaryEntry}
                currentMood={currentMood}
                currentLevel={level}
              />
            </div>
          )}
          {activeTab === "usage" && (
            <div className="journal-section usage-section">
              <h3>Focus App Usage (Today) 🖥️</h3>
              {Object.keys(appUsage).length === 0 ? (
                <p className="no-milestones">No focus app usage recorded today.</p>
              ) : (
                <div className="usage-list">
                  {Object.entries(appUsage)
                    .sort(([, a], [, b]) => b - a)
                    .map(([app, minutes], i) => (
                      <div key={i} className="usage-item">
                        <div className="usage-app-info">
                          <span className="usage-app-name">{app}</span>
                          <span className="usage-app-time">{Math.round(minutes)} min</span>
                        </div>
                        <div className="usage-bar-container">
                          <div 
                            className="usage-bar-fill" 
                            style={{ 
                              width: `${Math.min(100, (minutes / Math.max(...Object.values(appUsage))) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div className="usage-summary-card">
                <p>Total Focus Time: <strong>{Math.round(Object.values(appUsage).reduce((a, b) => a + b, 0))} minutes</strong></p>
                <p className="usage-tip">💡 {Math.round(Object.values(appUsage).reduce((a, b) => a + b, 0)) > 120 
                  ? "You've been very focused today! Don't forget to stretch." 
                  : "Great focus! Your pet loves when you work and move."}</p>
              </div>
            </div>
          )}
          {activeTab === "dreams" && (
            <div className="journal-section dreams-section">
              <PetDreams dreams={petDreams} />
            </div>
          )}
          {activeTab === "stats" && (
            <>
              <div className="journal-stats">
                <div className="stat-card">
                  <span className="stat-label">Days Together</span>
                  <span className="stat-value">{daysTogether}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Current Level</span>
                  <span className="stat-value">{level}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total XP</span>
                  <span className="stat-value">{(level - 1) * 50 + xp}</span>
                </div>
                <div className="stat-card collection-trigger" onClick={onOpenCollection}>
                  <span className="stat-label">Collection</span>
                  <span className="stat-value">View All 🐾</span>
                </div>
                <div className="xp-progress-section">
                  <div className="xp-text">
                    <span>XP Progress</span>
                    <span>{Math.floor((xp / nextLevelXp) * 100)}%</span>
                  </div>
                  <div className="xp-bar-container">
                    <div 
                      className="xp-bar-fill" 
                      style={{ width: `${Math.min(100, (xp / nextLevelXp) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="xp-subtext">
                    {xp} / {nextLevelXp} to Level {level + 1}
                  </div>
                </div>
              </div>

              <div className="journal-section bond-section">
                <h3>Friendship Bond</h3>
                <div className="bond-status">
                  <div className="bond-info">
                    <span className="bond-title">❤️ {friendshipData.title}</span>
                    <span className="bond-level">Level {friendshipData.level}/5</span>
                  </div>
                  <div className="bond-bar-container">
                    <div 
                      className="bond-bar-fill" 
                      style={{ 
                        width: `${friendshipData.value}%`,
                        background: friendshipData.level === 5 ? 'linear-gradient(90deg, #ff4081, #ff80ab)' : '#ff4081'
                      }}
                    ></div>
                  </div>
                  <p className="bond-multiplier">
                    {friendshipData.multiplier > 1 
                      ? `Active Bonus: +${((friendshipData.multiplier - 1) * 100).toFixed(0)}% XP & Coins`
                      : "No active bonus yet. Keep interacting!"}
                  </p>
                </div>
                <div className="roadmap-list">
                  {FRIENDSHIP_LEVELS.map((f, i) => (
                    <div key={i} className={`roadmap-item ${friendshipData.level >= f.level ? "unlocked" : "locked"}`}>
                      <span className="roadmap-level">{f.title}</span>
                      <span className="roadmap-reward">{f.reward}</span>
                      {friendshipData.level >= f.level && <span className="roadmap-check">❤️</span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "wellness" && (
            <div className="journal-section wellness-section">
              <h3>Pet Wellness Report 📈</h3>
              
              <div className="wellness-header-card">
                <div className="care-score-circle">
                  <span className="score-value">{Math.round(careScore)}</span>
                  <span className="score-label">Care Score</span>
                </div>
                <div className="care-score-feedback">
                  <h4>Daily Care Summary</h4>
                  <p>{getCareScoreFeedback(careScore)}</p>
                </div>
              </div>

              <div className="wellness-grid">
                <div className="wellness-item">
                  <span className="wellness-label">Avg. Hunger</span>
                  <div className="wellness-bar">
                    <div className="wellness-fill" style={{ width: `${dailyNeedsAvg.hunger}%`, background: '#e67e22' }} />
                  </div>
                  <span className="wellness-value">{Math.round(dailyNeedsAvg.hunger)}%</span>
                </div>
                <div className="wellness-item">
                  <span className="wellness-label">Avg. Hydration</span>
                  <div className="wellness-bar">
                    <div className="wellness-fill" style={{ width: `${dailyNeedsAvg.hydration}%`, background: '#3498db' }} />
                  </div>
                  <span className="wellness-value">{Math.round(dailyNeedsAvg.hydration)}%</span>
                </div>
                <div className="wellness-item">
                  <span className="wellness-label">Avg. Energy</span>
                  <div className="wellness-bar">
                    <div className="wellness-fill" style={{ width: `${dailyNeedsAvg.energy}%`, background: '#f1c40f' }} />
                  </div>
                  <span className="wellness-value">{Math.round(dailyNeedsAvg.energy)}%</span>
                </div>
              </div>

              <div className="mood-trends">
                <h4>Weekly Mood Trends</h4>
                <div className="mood-list">
                  {weeklyData.map((day, i) => (
                    <div key={i} className="mood-day">
                      <span className="day-name">{day.day}</span>
                      <div className="mood-indicator">
                        {day.moodSamples && day.moodSamples > 0 ? (
                          <>
                            <span className="mood-emoji">{getMoodEmoji(day.avgMood || 0)}</span>
                            <div className="mood-sparkline">
                              <div className="mood-sparkline-fill" style={{ height: `${day.avgMood}%` }} />
                            </div>
                          </>
                        ) : (
                          <span className="no-data">No data</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="health-tips">
                <h4>Health Advice from {currentMood} Pet</h4>
                <div className="tip-card">
                  <span className="tip-icon">💡</span>
                  <p>
                    {careScore > 80 
                      ? "You're doing amazing! Your consistency is helping both you and your pet stay in peak condition."
                      : careScore > 50
                        ? "A few more check-ins today would really boost your pet's mood. Remember to drink some water too!"
                        : "Your pet is feeling a bit neglected. Small movements throughout the day can make a big difference!"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="journal-section roadmap-section">
              <h3>Evolution Roadmap</h3>
              <div className="roadmap-list">
                {LEVEL_REWARDS.map((r, i) => (
                  <div key={i} className={`roadmap-item ${level >= r.level ? "unlocked" : "locked"}`}>
                    <span className="roadmap-level">Lv. {r.level}</span>
                    <span className="roadmap-reward">{r.reward}</span>
                    {level >= r.level && <span className="roadmap-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="journal-section achievements-section">
              <h3>Achievements ({unlockedAchievements.length})</h3>
              {unlockedAchievements.length === 0 ? (
                <p className="no-milestones">No achievements unlocked yet. Keep moving!</p>
              ) : (
                <div className="achievement-grid">
                  {unlockedAchievements.map((a, i) => (
                    <div key={i} className="achievement-badge" title={a.description}>
                      <div className="badge-icon">{a.icon}</div>
                      <div className="badge-info">
                        <span className="badge-title">{a.title}</span>
                        <span className="badge-date">{new Date(a.unlockedAt!).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="journal-section milestones-section">
              <h3>Pet Memories</h3>
              {milestones.length === 0 ? (
                <p className="no-milestones">Your journey is just beginning. Level up to record milestones!</p>
              ) : (
                <div className="milestone-gallery">
                  {[...milestones].reverse().map((m, i) => (
                    <div key={i} className="milestone-card">
                      <div className="milestone-moment">{m.moment || "📸"}</div>
                      <div className="milestone-card-info">
                        <div className="milestone-card-header">
                          <span className="milestone-card-level">Level {m.level}</span>
                          <span className="milestone-card-date">{new Date(m.date).toLocaleDateString()}</span>
                        </div>
                        <p className="milestone-card-desc">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetJournal;
