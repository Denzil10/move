import React, { useState, useEffect } from 'react';
import PetNeedsDashboard from './PetNeedsDashboard';
import TrainingDashboard from './TrainingDashboard';
import { MoodCategory } from '../hooks/usePetMood';
import { EnergyCategory } from '../hooks/usePetEnergy';
import { Buff, BuffType } from '../hooks/usePetBuffs';
import { Personality } from '../personalities';
import { WeatherCondition } from '../hooks/useWeather';
import { Season } from '../hooks/useSeasons';
import { FriendshipData } from '../hooks/usePetFriendship';
import './StatsSummary.css';

interface WeeklyData {
  day: string;
  moves: number;
  calories: number;
}

const BUFF_DETAILS: Record<BuffType, { icon: string; description: string }> = {
  xp_boost: { icon: "🧪", description: "XP Elixir: Increases XP gained from movement." },
  coin_magnet: { icon: "🧲", description: "Coin Magnet: Increases coins earned from movement." },
  mood_shield: { icon: "🛡️", description: "Mood Shield: Prevents mood from decreasing." },
  treasure_hunt: { icon: "🏴‍☠️", description: "Treasure Hunt: Increases chance of finding gifts." },
  energy_surge: { icon: "⚡", description: "Energy Surge: Reduces energy consumption." },
  mood_boost: { icon: "🌈", description: "Mood Boost: Keeps your pet joyful." },
  coin_rain: { icon: "🌧️", description: "Coin Rain: Double coins from all sources." },
  focus_zen: { icon: "🧘‍♂️", description: "Focus Zen: Increased rewards from deep focus." },
  rested_bonus: { icon: "💤", description: "Well Rested: 1.2x multiplier for waking up with full energy." }
};

interface StatsSummaryProps {
  petName: string;
  petLevel: number;
  totalCalories: number;
  petCoins: number;
  dailyMovements: number;
  dailyStreakGoal: number;
  careStreak: number;
  dailyCalories: number;
  totalMovements: number;
  weeklyData: WeeklyData[];
  hunger: number;
  hydration: number;
  moodCategory: MoodCategory;
  energy: number;
  energyCategory: EnergyCategory;
  personalityData: Personality;
  friendshipData: FriendshipData;
  happiness: number;
  activeBuffs?: Buff[];
  weather?: {
    condition: WeatherCondition;
    temp: number;
    location: string;
  } | null;
  season?: Season;
  trainingLevels: Record<string, number>;
  activeTraining: string | null;
  feedPet: () => void;
  drinkWater: () => void;
  toggleRest: () => void;
  cancelTraining: () => void;
  isResting: boolean;
  sleepScheduleEnabled: boolean;
  bedtime: string;
  wakeTime: string;
  openJournal: () => void;
  openQuests: () => void;
  openSkillTree: () => void;
  openBreathing: () => void; openAppUsageReport: () => void;
  shareProgress: () => void;
  isPaused: boolean;
  togglePause: () => void;
  quietHoursActive: boolean;
  focusedApp?: string;
  focusDuration?: number;
  smartFocusInterval?: number;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({
  petName,
  petLevel,
  totalCalories,
  petCoins,
  dailyMovements,
  dailyStreakGoal,
  careStreak,
  dailyCalories,
  totalMovements,
  weeklyData,
  hunger,
  hydration,
  moodCategory,
  energy,
  energyCategory,
  personalityData,
  friendshipData,
  happiness,
  activeBuffs = [],
  weather,
  season,
  trainingLevels,
  activeTraining,
  feedPet,
  drinkWater,
  toggleRest,
  cancelTraining,
  isResting,
  sleepScheduleEnabled,
  bedtime,
  wakeTime,
  openJournal,
  openQuests,
  openSkillTree,
  openBreathing, openAppUsageReport,
  shareProgress,
  isPaused,
  togglePause,
  quietHoursActive,
  focusedApp,
  focusDuration = 0,
  smartFocusInterval = 60
  }) => {  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const xpProgress = (totalCalories % 50) / 50 * 100;
  const dailyGoalProgress = Math.min((dailyMovements / dailyStreakGoal) * 100, 100);

  // Focus Zen progress (every 25m)
  const zenProgress = ((focusDuration % 25) / 25) * 100;
  // Smart Focus break progress
  const breakProgress = (focusDuration / smartFocusInterval) * 100;

  const weatherIcons: Record<WeatherCondition, string> = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
    unknown: "❓"
  };

  const seasonIcons: Record<Season, string> = {
    spring: "🌸",
    summer: "☀️",
    autumn: "🍂",
    winter: "❄️"
  };

  // Calculate total multipliers
  const xpBuff = activeBuffs.find(b => b.type === 'xp_boost')?.multiplier || 1;
  const coinBuff = activeBuffs.find(b => b.type === 'coin_magnet')?.multiplier || 1;
  const happinessMultiplier = 1 + (happiness / 100) * 0.25;
  
  const totalXpMult = (personalityData.xpModifier * personalityData.rarityModifier * xpBuff * friendshipData.multiplier * happinessMultiplier).toFixed(2);
  const totalCoinMult = (personalityData.coinModifier * personalityData.rarityModifier * coinBuff * friendshipData.multiplier * happinessMultiplier).toFixed(2);

  const careScore = (hunger + hydration + energy) / 3;

  return (
    <div className="stats-summary">
      {quietHoursActive && (
        <div className="quiet-hours-banner">
          🌙 Quiet Hours Active - Inactivity Timer Paused
        </div>
      )}
      {focusedApp && (
        <div className="productivity-mode-container">
          <div className="productivity-mode-banner" title={`Currently focused on ${focusedApp}`}>
            💻 Focused on {focusedApp.split(' ').slice(0, 2).join(' ')} - Inactivity Timer Paused
          </div>
          <div className="focus-progress-section">
            <div className="focus-progress-item" title={`${Math.floor(focusDuration)}m focused. Next Zen reward in ${Math.ceil(25 - (focusDuration % 25))}m`}>
              <div className="focus-progress-label">Zen 🧘‍♂️</div>
              <div className="focus-progress-bar">
                <div className="focus-progress-fill zen" style={{ width: `${zenProgress}%` }}></div>
              </div>
            </div>
            <div className="focus-progress-item" title={`Next break reminder in ${Math.ceil(smartFocusInterval - focusDuration)}m`}>
              <div className="focus-progress-label">Break 🚶‍♂️</div>
              <div className="focus-progress-bar">
                <div className="focus-progress-fill break" style={{ width: `${breakProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pet-coins-badge">
        💰 {petCoins}
      </div>
      <div className="care-score-badge" title="Care Score: Keep needs high to build your streak!">
        ❤️ {Math.round(careScore)}
      </div>
      <div className="stat-group pet-xp-group">
        <div className="pet-header-simple">
          <h3>{petName} (Level {petLevel})</h3>
          <div className="personality-tag" title={`${personalityData.description}`}>
            {personalityData.rarity.toUpperCase()} {personalityData.name}
          </div>
          <button 
            className={`pause-toggle-btn ${isPaused ? 'paused' : ''}`}
            onClick={togglePause}
            title={isPaused ? "Resume tracking inactivity" : "Pause inactivity tracking"}
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
        </div>
        <div className="environment-badges">
            {weather && weatherIcons[weather.condition] && (
              <span className="weather-badge" title={`${weather.temp}°C in ${weather.location}`}>
                {weatherIcons[weather.condition]} {weather.condition}
              </span>
            )}
            {season && seasonIcons[season] && (
              <span className="season-badge" title={`Current Season: ${season}`}>
                {seasonIcons[season]} {season}
              </span>
            )}
        </div>
        
        <div className="multiplier-breakdown">
          <div className="multiplier-item" title="XP Multiplier = Personality * Rarity * Buffs * Friendship * Happiness">
            <span>XP Mult</span>
            <strong>{totalXpMult}x</strong>
          </div>
          <div className="multiplier-item" title="Coin Multiplier = Personality * Rarity * Buffs * Friendship * Happiness">
            <span>Coin Mult</span>
            <strong>{totalCoinMult}x</strong>
          </div>
        </div>

        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }}></div>
        </div>
        <div className="xp-label">XP: {totalCalories % 50} / 50</div>
      </div>

      <div className="friendship-container">
        <div className="friendship-header">
          <span className="friendship-icon">
            {friendshipData.level === 5 ? '💖' : friendshipData.level >= 3 ? '💝' : '💗'}
          </span>
          <span className="friendship-title">Friendship Level {friendshipData.level}</span>
          <span className="friendship-value">{Math.round(friendshipData.value)} / 100</span>
        </div>
        <div className="friendship-bar-container">
          <div 
            className="friendship-bar-fill" 
            style={{ 
              width: `${(friendshipData.value / 100) * 100}%`,
              background: `linear-gradient(90deg, #ff4081, #ff80ab)` 
            }}
          ></div>
        </div>
        <div className="friendship-bonus">
          {(friendshipData.multiplier > 1) && `+${Math.round((friendshipData.multiplier - 1) * 100)}% Multiplier Bonus!`}
        </div>
      </div>

      <div className="happiness-container">
        <div className="happiness-header">
          <span className="happiness-icon">
            {happiness >= 80 ? '🌈' : happiness >= 50 ? '✨' : '⭐'}
          </span>
          <span className="happiness-title">Pet Happiness</span>
          <span className="happiness-value">{Math.round(happiness)}%</span>
        </div>
        <div className="happiness-bar-container">
          <div 
            className="happiness-bar-fill" 
            style={{ 
              width: `${happiness}%`,
              background: `linear-gradient(90deg, #f1c40f, #f39c12)` 
            }}
          ></div>
        </div>
        <div className="happiness-bonus">
          {happinessMultiplier > 1 && `+${Math.round((happinessMultiplier - 1) * 100)}% Happiness Multiplier!`}
        </div>
      </div>

      <div className="stat-group movement-group">
        <h4>Daily Goals</h4>
        <div className="goal-bar-container">
          <div className="goal-bar-fill" style={{ width: `${dailyGoalProgress}%` }}></div>
        </div>
        <div className="goal-label">Moves: {dailyMovements} / {dailyStreakGoal}</div>
        
        <div className="stat-grid">
          <div className="stat-box">
            <span className="stat-value">{dailyCalories}</span>
            <span className="stat-label">Daily Cal</span>
          </div>
            <div className="stat-box care-streak-box">
            <span className="stat-value">🔥 {careStreak} Days</span>
            <span className="stat-label">Care Streak</span>
            <div className="care-streak-note">Keep needs &gt; 50% to build streak!</div>
          </div>
          <div className="stat-box">
            <span className="stat-value">{totalMovements}</span>
            <span className="stat-label">Total Moves</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{totalCalories}</span>
            <span className="stat-label">Total Cal</span>
          </div>
        </div>

        {activeBuffs.length > 0 && (
          <div className="active-buffs-container">
            {activeBuffs.map((buff, i) => {
              const details = BUFF_DETAILS[buff.type];
              const remainingSec = Math.max(0, (buff.endTime - currentTime) / 1000);
              return (
                <div key={i} className={`active-buff buff-${buff.type}`} title={details.description}>
                  <span>{details.icon}</span>
                  {buff.multiplier && <span className="buff-multiplier">{buff.multiplier}x</span>}
                  <span className="buff-timer">{Math.ceil(remainingSec / 60)}m</span>
                </div>
              );
            })}
          </div>
        )}

        <PetNeedsDashboard
          hunger={hunger}
          hydration={hydration}
          energy={energy}
          energyCategory={energyCategory}
          moodCategory={moodCategory}
          happiness={happiness}
          isResting={isResting}
          sleepScheduleEnabled={sleepScheduleEnabled}
          bedtime={bedtime}
          wakeTime={wakeTime}
          onFeed={feedPet}
          onDrink={drinkWater}
          onRest={toggleRest}
        />

        <TrainingDashboard
          trainingLevels={trainingLevels as any}
          activeTraining={activeTraining}
          onCancelTraining={cancelTraining}
        />

        <div className="summary-actions">
          <button 
            onClick={openJournal} 
            className="journal-btn"
          >
            📖 Pet Journal
          </button>
          <button 
            onClick={openQuests} 
            className="quests-btn"
          >
            📜 Pet Quests
          </button>
          <button 
            onClick={openSkillTree} 
            className="quests-btn"
            style={{ background: '#e67e22', color: 'white' }}
          >
            🌳 Skill Tree
          </button>
          <button 
            onClick={openBreathing} 
            className="quests-btn"
            style={{ background: '#3498db', color: 'white' }}
          >
            🌬️ Breathe
          </button>
          <button 
            onClick={openAppUsageReport} 
            className="quests-btn"
            style={{ background: '#9b59b6', color: 'white' }}
          >
            📈 Focus Report
          </button>
        </div>

        <div className="daily-streak-tracker">
          <h4>Last 7 Days Streak</h4>
          <div className="streak-dots">
            {weeklyData.map((day, i) => (
              <div 
                key={i} 
                className={`streak-dot ${day.moves >= dailyStreakGoal ? 'active' : ''}`}
                title={`${day.day}: ${day.moves} moves`}
              />
            ))}
          </div>
        </div>

        <button 
          onClick={shareProgress} 
          className="share-btn"
        >
          📤 Share My Progress
        </button>
      </div>
    </div>
  );
};

export default StatsSummary;
