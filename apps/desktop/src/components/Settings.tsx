import React from "react";

interface SettingsProps {
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  petName: string;
  setPetName: (val: string) => void;
  inactivityTimeout: number;
  setInactivityTimeout: (val: number) => void;
  targetDuration: number;
  setTargetDuration: (val: number) => void;
  motionThreshold: number;
  setMotionThreshold: (val: number) => void;
  dailyGoal: number;
  setDailyGoal: (val: number) => void;
  dailyStreakGoal: number;
  setDailyStreakGoal: (val: number) => void;
  deviceId: string;
  setDeviceId: (val: string) => void;
  devices: MediaDeviceInfo[];
  autoMode: boolean;
  setAutoMode: (val: boolean) => void;
  strictMode: boolean;
  setStrictMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  soundVolume: number;
  setSoundVolume: (val: number) => void;
  petOpacity: number;
  setPetOpacity: (val: number) => void;
  theme: "light" | "dark" | "system";
  setTheme: (val: "light" | "dark" | "system") => void;
  sleepScheduleEnabled: boolean;
  setSleepScheduleEnabled: (val: boolean) => void;
  bedtime: string;
  setBedtime: (val: string) => void;
  wakeTime: string;
  setWakeTime: (val: string) => void;
  quietHoursEnabled: boolean;
  setQuietHoursEnabled: (val: boolean) => void;
  quietHoursStart: string;
  setQuietHoursStart: (val: string) => void;
  quietHoursEnd: string;
  setQuietHoursEnd: (val: string) => void;
  quietHoursWeekendEnabled: boolean;
  setQuietHoursWeekendEnabled: (val: boolean) => void;
  quietHoursWeekendStart: string;
  setQuietHoursWeekendStart: (val: string) => void;
  quietHoursWeekendEnd: string;
  setQuietHoursWeekendEnd: (val: string) => void;
  productivityModeEnabled: boolean;
  setProductivityModeEnabled: (val: boolean) => void;
  smartFocusEnabled: boolean;
  setSmartFocusEnabled: (val: boolean) => void;
  smartFocusInterval: number;
  setSmartFocusInterval: (val: number) => void;
  focusApps: string[];
  setFocusApps: (val: string[]) => void;
  resetStreak: () => void;
  resetStats: () => void;
  onExportData?: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  isPaused,
  setIsPaused,
  petName,
  setPetName,
  inactivityTimeout,
  setInactivityTimeout,
  targetDuration,
  setTargetDuration,
  motionThreshold,
  setMotionThreshold,
  dailyGoal,
  setDailyGoal,
  dailyStreakGoal,
  setDailyStreakGoal,
  deviceId,
  setDeviceId,
  devices,
  autoMode,
  setAutoMode,
  strictMode,
  setStrictMode,
  soundEnabled,
  setSoundEnabled,
  soundVolume,
  setSoundVolume,
  petOpacity,
  setPetOpacity,
  theme,
  setTheme,
  sleepScheduleEnabled,
  setSleepScheduleEnabled,
  bedtime,
  setBedtime,
  wakeTime,
  setWakeTime,
  quietHoursEnabled,
  setQuietHoursEnabled,
  quietHoursStart,
  setQuietHoursStart,
  quietHoursEnd,
  setQuietHoursEnd,
  quietHoursWeekendEnabled,
  setQuietHoursWeekendEnabled,
  quietHoursWeekendStart,
  setQuietHoursWeekendStart,
  quietHoursWeekendEnd,
  setQuietHoursWeekendEnd,
  productivityModeEnabled,
  setProductivityModeEnabled,
  smartFocusEnabled,
  setSmartFocusEnabled,
  smartFocusInterval,
  setSmartFocusInterval,
  focusApps,
  setFocusApps,
  resetStreak,
  resetStats,
  onExportData
}) => {
  return (
    <div className="settings-section">
      <h3>Settings</h3>
      <div className="status-item">
        <strong>Pause Tracking:</strong>
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={isPaused} 
            onChange={(e) => setIsPaused(e.target.checked)} 
          />
          Disable Inactivity Timer
        </label>
      </div>
      <div className="status-item">
        Pet Name: 
        <input 
          type="text" 
          value={petName} 
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Buddy"
        />
      </div>
      <div className="status-item">
        Theme: 
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="status-item">
        Sound Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={soundVolume}
          onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
        />
        <span>{Math.round(soundVolume * 100)}%</span>
      </div>

      <div className="status-item">
        Pet Opacity:
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={petOpacity}
          onChange={(e) => setPetOpacity(parseFloat(e.target.value))}
        />
        <span>{Math.round(petOpacity * 100)}%</span>
      </div>
      <div className="status-item">
        <strong>Pet Sleep Schedule:</strong>
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={sleepScheduleEnabled} 
            onChange={(e) => setSleepScheduleEnabled(e.target.checked)}
          />
          Enable Auto-Sleep
        </label>
      </div>

      {sleepScheduleEnabled && (
        <div className="sleep-schedule-inputs">
          <div className="status-item">
            Bedtime: 
            <input 
              type="time" 
              value={bedtime} 
              onChange={(e) => setBedtime(e.target.value)}
            />
          </div>
          <div className="status-item">
            Wake Time: 
            <input 
              type="time" 
              value={wakeTime} 
              onChange={(e) => setWakeTime(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="status-item">
        <strong>Quiet Hours:</strong>
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={quietHoursEnabled} 
            onChange={(e) => setQuietHoursEnabled(e.target.checked)}
          />
          Enable Quiet Hours
        </label>
      </div>

      {quietHoursEnabled && (
        <div className="quiet-hours-inputs">
          <div className="status-item">
            Start Time: 
            <input 
              type="time" 
              value={quietHoursStart} 
              onChange={(e) => setQuietHoursStart(e.target.value)}
            />
          </div>
          <div className="status-item">
            End Time: 
            <input 
              type="time" 
              value={quietHoursEnd} 
              onChange={(e) => setQuietHoursEnd(e.target.value)}
            />
          </div>
          <div className="status-item">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={quietHoursWeekendEnabled} 
                onChange={(e) => setQuietHoursWeekendEnabled(e.target.checked)}
              />
              Weekend Specific Schedule
            </label>
          </div>

          {quietHoursWeekendEnabled && (
            <div className="weekend-hours-inputs" style={{ marginLeft: '10px', paddingLeft: '10px', borderLeft: '2px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="status-item">
                Weekend Start: 
                <input 
                  type="time" 
                  value={quietHoursWeekendStart} 
                  onChange={(e) => setQuietHoursWeekendStart(e.target.value)}
                />
              </div>
              <div className="status-item">
                Weekend End: 
                <input 
                  type="time" 
                  value={quietHoursWeekendEnd} 
                  onChange={(e) => setQuietHoursWeekendEnd(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="status-item">
        <strong>Productivity Mode:</strong>
        <label className="toggle-label">
          <input 
            type="checkbox" 
            checked={productivityModeEnabled} 
            onChange={(e) => setProductivityModeEnabled(e.target.checked)}
          />
          Pause when Focus Apps are active
        </label>
      </div>

      {productivityModeEnabled && (
        <div className="productivity-mode-inputs">
          <div className="status-item">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={smartFocusEnabled} 
                onChange={(e) => setSmartFocusEnabled(e.target.checked)}
              />
              Enable Smart Focus Suggestions
            </label>
          </div>
          {smartFocusEnabled && (
            <div className="status-item">
              Break Interval (mins):
              <input 
                type="number" 
                value={smartFocusInterval} 
                onChange={(e) => setSmartFocusInterval(Number(e.target.value))}
                min={5}
                max={240}
                step={5}
              />
            </div>
          )}
          <div className="status-item">
            Focus Apps (comma separated):
            <input 
              type="text" 
              value={focusApps.join(", ")} 
              onChange={(e) => setFocusApps(e.target.value.split(",").map(s => s.trim()).filter(s => s !== ""))}
              placeholder="Code, Visual Studio Code, Cursor"
            />
          </div>
          <small style={{ color: '#a6adc8', display: 'block', marginBottom: '10px' }}>
            Tracking will pause automatically when these applications have focus. Smart Focus will suggest breaks after {smartFocusInterval} minutes of continuous work.
          </small>
        </div>
      )}

      <div className="status-item">
        <strong>Timer Presets:</strong>
        <div className="button-group" style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <button onClick={() => {
            setInactivityTimeout(5000);
            setTargetDuration(5);
          }}>Testing (5s / 5s)</button>
          <button onClick={() => {
            setInactivityTimeout(25 * 60 * 1000);
            setTargetDuration(30);
          }}>Pomodoro (25m / 30s)</button>
          <button onClick={() => {
            setInactivityTimeout(50 * 60 * 1000);
            setTargetDuration(60);
          }}>Deep Work (50m / 60s)</button>
        </div>
      </div>

      <div className="status-item">
        Inactivity Trigger (ms): 
        <input 
          type="number" 
          value={inactivityTimeout} 
          onChange={(e) => setInactivityTimeout(Number(e.target.value))}
          step={1000}
          min={1000}
        />
      </div>
      <div className="status-item">
        Movement Goal (sec): 
        <input 
          type="number" 
          value={targetDuration} 
          onChange={(e) => setTargetDuration(Number(e.target.value))}
          step={1}
          min={1}
        />
      </div>
      <div className="status-item">
        Motion Sensitivity: 
        <input 
          type="number" 
          value={motionThreshold} 
          onChange={(e) => setMotionThreshold(Number(e.target.value))}
          step={0.1}
          min={0.1}
          max={10}
        />
        <small>(Lower = more sensitive)</small>
      </div>
      <div className="status-item">
        Daily Move Goal: 
        <input 
          type="number" 
          value={dailyStreakGoal} 
          onChange={(e) => setDailyStreakGoal(Number(e.target.value))}
          step={1}
          min={1}
        />
      </div>
      <div className="status-item">
        Daily Calorie Goal: 
        <input 
          type="number" 
          value={dailyGoal} 
          onChange={(e) => setDailyGoal(Number(e.target.value))}
          step={10}
          min={10}
        />
      </div>
      <div className="status-item">
        Camera: 
        <select 
          value={deviceId} 
          onChange={(e) => setDeviceId(e.target.value)}
        >
          <option value="">Default Camera</option>
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
            </option>
          ))}
        </select>
      </div>
      <div className="status-item">
        <strong>Data Sync:</strong>
        <div className="button-group" style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <button onClick={onExportData}>Export Pet Data</button>
          
          <label className="button-label" style={{ 
            cursor: 'pointer', 
            padding: '4px 8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            color: '#333',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center'
          }}>
            Import Save Data
            <input 
              type="file" 
              accept=".json" 
              style={{ display: 'none' }} 
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                  try {
                    const data = JSON.parse(e.target?.result as string);
                    let imported = 0;
                    for (const key in data) {
                      if (key.startsWith("move-pet-")) {
                        localStorage.setItem(key, data[key]);
                        imported++;
                      }
                    }
                    if (imported > 0) {
                      alert("Save data imported successfully! The app will now reload to apply changes.");
                      window.location.reload();
                    } else {
                      alert("No valid Move Pet save data found in this file.");
                    }
                  } catch (error) {
                    alert("Failed to parse save data file.");
                  }
                };
                reader.readAsText(file);
                // Reset value so the same file can be selected again if needed
                event.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      <div className="button-group">
        <button onClick={() => setAutoMode(!autoMode)}>
          {autoMode ? "Disable" : "Enable"} Auto Mode
        </button>
        <button 
          className={strictMode ? "btn-danger" : ""}
          onClick={() => setStrictMode(!strictMode)}
          title="Locks inputs until movement goal is met. Use with caution."
        >
          {strictMode ? "Disable" : "Enable"} Strict Mode (Experimental)
        </button>
        <button onClick={() => setSoundEnabled(!soundEnabled)}>
          {soundEnabled ? "Disable" : "Enable"} Sound Effects
        </button>
        <button onClick={resetStreak}>Reset Streak</button>
        <button onClick={resetStats}>Reset Stats</button>
      </div>
    </div>
  );
};

export default Settings;
