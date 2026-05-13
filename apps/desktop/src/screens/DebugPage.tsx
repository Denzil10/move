/**
 * DebugPage — quick diagnostic view.
 * Access via Ctrl+Shift+D from the floating pet.
 */
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { AppData } from "../lib/types";
import { clearData } from "../lib/storage";
import "./DebugPage.css";

interface Props {
  data: AppData;
  onClose: () => void;
  onReset: () => void;
}

export default function DebugPage({ data, onClose, onReset }: Props) {
  const [idleMs, setIdleMs] = useState(0);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [focusedApp, setFocusedApp] = useState("");

  useEffect(() => {
    const tick = async () => {
      const [idle, pos, focused] = await Promise.all([
        invoke<number>("get_idle_time").catch(() => 0),
        invoke<[number, number]>("get_mouse_position").catch(() => [0, 0] as [number, number]),
        invoke<string>("get_focused_window_name").catch(() => ""),
      ]);
      setIdleMs(idle);
      setMousePos(pos);
      setFocusedApp(focused);
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  function handleReset() {
    if (window.confirm("Reset all pet data? This cannot be undone.")) {
      clearData();
      onReset();
    }
  }

  return (
    <div className="debug-root">
      <div className="debug-card">
        <div className="debug-header">
          <h2>Debug</h2>
          <button aria-label="Close" onClick={onClose}>×</button>
        </div>

        <section>
          <h3>System</h3>
          <dl>
            <dt>Idle time</dt><dd>{(idleMs / 1000).toFixed(1)}s</dd>
            <dt>Mouse</dt><dd>{mousePos[0]}, {mousePos[1]}</dd>
            <dt>Focused app</dt><dd>{focusedApp || "—"}</dd>
          </dl>
        </section>

        <section>
          <h3>Pet state</h3>
          <dl>
            <dt>Species</dt><dd>{data.petSpeciesId}</dd>
            <dt>XP / Level</dt><dd>{data.xp} / {data.level}</dd>
            <dt>Strict mode</dt><dd>{data.strictMode ? "on" : "off"}</dd>
            <dt>Overall streak</dt><dd>{data.overallStreak}</dd>
          </dl>
        </section>

        <section>
          <h3>Tasks today</h3>
          <table>
            <thead><tr><th>Task</th><th>Done</th><th>Target</th><th>Streak</th></tr></thead>
            <tbody>
              {data.tasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.emoji} {t.title}</td>
                  <td>{t.completedToday}</td>
                  <td>{t.dailyTarget}</td>
                  <td>{t.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <button className="debug-reset-btn" onClick={handleReset}>
          Reset all data
        </button>
      </div>
    </div>
  );
}
