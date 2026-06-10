import { useState } from "react";
import { AppData } from "../lib/types";
import { DEFAULT_TASKS } from "../lib/tasks";
import { PET_SPECIES } from "../collection";
import SpriteAnimation from "../components/SpriteAnimation";
import "./SetupScreen.css";

interface Props {
  onDone: (data: Partial<AppData>) => void;
}

const SELECTABLE_SPECIES = PET_SPECIES.filter((s) =>
  ["tiny_dino", "emerald_dragon"].includes(s.id)
);

export default function SetupScreen({ onDone }: Props) {
  const [selectedPet, setSelectedPet] = useState("tiny_dino");
  const [tasks, setTasks] = useState(DEFAULT_TASKS.map((t) => ({ ...t })));
  const [strictMode, setStrictMode] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  }

  function addCustomTask() {
    const title = newTask.trim();
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      {
        id: `custom_${Date.now()}`,
        title,
        emoji: "📌",
        enabled: true,
        schedule: { type: "daily_count" },
        dailyTarget: 1,
        completedToday: 0,
        streak: 0,
      },
    ]);
    setNewTask("");
    setAddingTask(false);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleStart() {
    onDone({ petSpeciesId: selectedPet, tasks, strictMode });
  }

  return (
    <div className="setup-root">
      <div className="setup-card">
        {/* Header */}
        <div className="setup-header">
          <span className="setup-logo">🐾</span>
          <div>
            <h1 className="setup-title">Move Pet</h1>
            <p className="setup-sub">Your productivity companion</p>
          </div>
        </div>

        {/* Pet selector */}
        <section className="setup-section">
          <h2 className="setup-label">Choose your pet</h2>
          <div className="pet-selector">
            {SELECTABLE_SPECIES.map((sp) => (
              <button
                key={sp.id}
                className={`pet-option ${selectedPet === sp.id ? "selected" : ""}`}
                onClick={() => setSelectedPet(sp.id)}
              >
                {sp.spritesheet ? (
                  <SpriteAnimation
                    src={sp.spritesheet.src}
                    cols={sp.spritesheet.cols}
                    cellWidth={sp.spritesheet.cellWidth}
                    cellHeight={sp.spritesheet.cellHeight}
                    row={sp.spritesheet.stateRows["idle"].row}
                    frameCount={sp.spritesheet.stateRows["idle"].frames}
                    fps={6}
                    scale={0.22}
                  />
                ) : (
                  <span className="pet-emoji">{sp.icon}</span>
                )}
                <span className="pet-name">{sp.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tasks */}
        <section className="setup-section">
          <h2 className="setup-label">Daily tasks</h2>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.enabled ? "" : "disabled"}`}>
                <button
                  className={`task-toggle ${task.enabled ? "on" : "off"}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label="toggle"
                />
                <span className="task-emoji">{task.emoji}</span>
                <span className="task-title">{task.title}</span>
                {task.id.startsWith("custom_") && (
                  <button
                    className="task-remove"
                    onClick={() => removeTask(task.id)}
                    aria-label="remove"
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>

          {addingTask ? (
            <div className="add-task-row">
              <input
                className="add-task-input"
                autoFocus
                placeholder="Task name…"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addCustomTask();
                  if (e.key === "Escape") setAddingTask(false);
                }}
              />
              <button className="add-task-confirm" onClick={addCustomTask}>Add</button>
              <button className="add-task-cancel" onClick={() => setAddingTask(false)} aria-label="Cancel task creation">×</button>
            </div>
          ) : (
            <button className="add-task-btn" onClick={() => setAddingTask(true)}>
              + Add task
            </button>
          )}
        </section>

        {/* Strict mode */}
        <section className="setup-section setup-strict">
          <div className="strict-info">
            <span className="strict-icon">⚡</span>
            <div>
              <span className="strict-label">Strict mode</span>
              <span className="strict-desc">Pet nags until tasks are done</span>
            </div>
          </div>
          <button
            className={`toggle-switch ${strictMode ? "on" : ""}`}
            onClick={() => setStrictMode((s) => !s)}
            aria-label="strict mode"
          />
        </section>

        {/* CTA */}
        <button className="start-btn" onClick={handleStart}>
          Let's go →
        </button>
      </div>
    </div>
  );
}
