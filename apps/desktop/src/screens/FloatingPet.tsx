import { useState, useEffect, useCallback, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { PET_SPECIES } from "../collection";
import SpriteAnimation from "../components/SpriteAnimation";
import { AppData, PetState, Task } from "../lib/types";
import { getNextDueTask, markTaskDone } from "../lib/tasks";
import { calcXP, xpToLevel, makeParticles, RewardParticle } from "../lib/rewards";
import { saveData } from "../lib/storage";
import "./FloatingPet.css";

interface Props {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

const FLOAT_W = 160;
const FLOAT_H = 240;
const CHECK_INTERVAL_MS = 60_000;
const MOVE_TARGET_SECS = 300; // 5 minutes
const IDLE_THRESHOLD_MS = 5_000; // < 5s idle = actively moving

export default function FloatingPet({ data, onDataChange }: Props) {
  const [petState, setPetState] = useState<PetState>("floating");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [particles, setParticles] = useState<RewardParticle[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [snoozed, setSnoozed] = useState<Set<string>>(new Set());

  // Move session tracking
  const [moveSecsElapsed, setMoveSecsElapsed] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const moveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Idle animation cycling
  const [idleVariant, setIdleVariant] = useState<PetState>("floating");
  const idleCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Shrink window to floating size on mount ── */
  useEffect(() => {
    const win = getCurrentWindow();
    win.setSize(new LogicalSize(FLOAT_W, FLOAT_H));
    win.setAlwaysOnTop(true);
  }, []);

  /* ── Daily reset ── */
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (data.lastActiveDate && data.lastActiveDate !== todayStr) {
      const reset: AppData = {
        ...data,
        tasks: data.tasks.map((t) => ({
          ...t,
          completedToday: 0,
          nextReminderAt: undefined,
        })),
        lastActiveDate: todayStr,
      };
      onDataChange(reset);
    }
  }, []); // eslint-disable-line

  /* ── Idle pet animation cycling ── */
  useEffect(() => {
    if (activeTask) return; // don't cycle during reminder
    const variants: PetState[] = ["floating", "thinking", "floating", "floating", "sleeping"];
    let i = 0;
    idleCycleRef.current = setInterval(() => {
      i = (i + 1) % variants.length;
      setIdleVariant(variants[i]);
    }, 4000);
    return () => {
      if (idleCycleRef.current) clearInterval(idleCycleRef.current);
    };
  }, [activeTask]);

  /* ── Task reminder poller ── */
  const checkTasks = useCallback(() => {
    if (activeTask) return; // already showing one
    const due = getNextDueTask(data.tasks.filter((t) => !snoozed.has(t.id)));
    if (due) {
      setActiveTask(due);
      if (due.id === "move") {
        setPetState("training");
        startMoveSession();
      } else {
        setPetState("disturbed");
      }
    }
  }, [data.tasks, snoozed, activeTask]); // eslint-disable-line

  useEffect(() => {
    checkTasks();
    checkIntervalRef.current = setInterval(checkTasks, CHECK_INTERVAL_MS);
    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [checkTasks]);

  /* ── Move session: poll idle time every second ── */
  function startMoveSession() {
    setMoveSecsElapsed(0);
    setIsMoving(false);
    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);

    moveIntervalRef.current = setInterval(async () => {
      try {
        const idleMs = await invoke<number>("get_idle_time");
        const moving = idleMs < IDLE_THRESHOLD_MS;
        setIsMoving(moving);
        if (moving) {
          setMoveSecsElapsed((s) => {
            const next = s + 1;
            if (next >= MOVE_TARGET_SECS) {
              stopMoveSession();
              handleTaskComplete("move");
            }
            return next;
          });
        }
      } catch {
        // ignore
      }
    }, 1000);
  }

  function stopMoveSession() {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
  }

  /* ── Complete a task by id ── */
  function handleTaskComplete(taskId: string) {
    const task = data.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTasks = markTaskDone(data.tasks, taskId);
    const earnedXP = calcXP(task.streak);
    const newXP = data.xp + earnedXP;
    const newLevel = xpToLevel(newXP);
    const leveledUp = newLevel > data.level;

    const updated: AppData = {
      ...data,
      tasks: updatedTasks,
      xp: newXP,
      level: newLevel,
      lastActiveDate: new Date().toISOString().split("T")[0],
    };
    onDataChange(updated);
    saveData(updated);

    setActiveTask(null);
    setCelebrating(true);
    setParticles(makeParticles(leveledUp ? 16 : 10));
    setPetState("happy");

    setTimeout(() => {
      setCelebrating(false);
      setParticles([]);
      setPetState("floating");
      setMoveSecsElapsed(0);
    }, 2200);
  }

  /* ── Snooze ── */
  function handleSnooze() {
    if (!activeTask) return;
    const id = activeTask.id;
    stopMoveSession();
    setSnoozed((s) => new Set([...s, id]));
    setActiveTask(null);
    setPetState("floating");
    setMoveSecsElapsed(0);
    setTimeout(
      () => setSnoozed((s) => { const n = new Set(s); n.delete(id); return n; }),
      30 * 60 * 1000
    );
  }

  /* ── Pet click (idle tap) ── */
  function handlePetTap() {
    if (activeTask) return;
    setPetState("happy");
    setTimeout(() => setPetState("floating"), 1500);
  }

  const species = PET_SPECIES.find((s) => s.id === data.petSpeciesId) ?? PET_SPECIES[0];
  const sprite = species.spritesheet;

  // Determine which animation state to show
  const displayState: PetState = activeTask
    ? activeTask.id === "move" ? "training" : "disturbed"
    : celebrating ? "happy"
    : petState === "floating" ? idleVariant
    : petState;

  const stateRow = sprite?.stateRows[displayState] ?? sprite?.stateRows["idle"];
  const fps =
    displayState === "sleeping" ? 4 :
    displayState === "training" ? 12 :
    displayState === "happy" ? 14 : 8;

  const movePercent = Math.min((moveSecsElapsed / MOVE_TARGET_SECS) * 100, 100);
  const moveMinsLeft = Math.max(0, Math.ceil((MOVE_TARGET_SECS - moveSecsElapsed) / 60));

  return (
    <div className="float-root" data-tauri-drag-region>

      {/* ── Move progress bubble ── */}
      {activeTask?.id === "move" && (
        <div className="bubble move-bubble">
          <div className="move-header">
            <span className="move-emoji">{isMoving ? "🏃" : "🧍"}</span>
            <span className="move-label">
              {isMoving ? "Moving…" : "Start moving!"}
            </span>
            <button className="snooze-icon" onClick={handleSnooze} title="Later">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </button>
          </div>
          <div className="move-bar-track">
            <div
              className={`move-bar-fill ${isMoving ? "active" : ""}`}
              style={{ width: `${movePercent}%` }}
            />
          </div>
          <div className="move-time">
            {moveSecsElapsed > 0 ? `${moveMinsLeft} min left` : "5 min goal"}
          </div>
        </div>
      )}

      {/* ── Regular task reminder bubble ── */}
      {activeTask && activeTask.id !== "move" && (
        <div className="bubble">
          <span className="bubble-task">
            {activeTask.emoji} {activeTask.title}
          </span>
          <div className="bubble-actions">
            <button
              className="bubble-btn done"
              onClick={() => handleTaskComplete(activeTask.id)}
              title="Done"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
            <button
              className="bubble-btn later"
              onClick={handleSnooze}
              title="Later"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Reward particles ── */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `calc(50% + ${p.x}px)`,
            bottom: `${90 + Math.abs(p.y)}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* ── Pet sprite ── */}
      <div
        className={`float-pet ${celebrating ? "celebrating" : ""} ${activeTask?.id === "move" && isMoving ? "running" : ""}`}
        onClick={handlePetTap}
        data-tauri-drag-region
      >
        {sprite && stateRow ? (
          <SpriteAnimation
            src={sprite.src}
            cols={sprite.cols}
            cellWidth={sprite.cellWidth}
            cellHeight={sprite.cellHeight}
            row={stateRow.row}
            frameCount={stateRow.frames}
            fps={fps}
            scale={0.44}
          />
        ) : (
          <span style={{ fontSize: 56 }}>{species.icon}</span>
        )}
      </div>

      {/* ── Level badge ── */}
      <div className="level-badge" title={`${data.xp} XP`}>
        {data.level}
      </div>

    </div>
  );
}
