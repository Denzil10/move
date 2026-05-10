import { Task } from "./types";

const FIRST_REMINDER_DELAY_MS = 20 * 60 * 1000; // 20 min grace on first launch

export const DEFAULT_TASKS: Task[] = [
  {
    id: "move",
    title: "Move for 5 min",
    emoji: "🏃",
    enabled: true,
    schedule: { type: "interval_hours", intervalHours: 2 },
    dailyTarget: 6,
    completedToday: 0,
    streak: 0,
  },
  {
    id: "water",
    title: "Drink water",
    emoji: "💧",
    enabled: true,
    schedule: { type: "interval_hours", intervalHours: 2 },
    dailyTarget: 7,
    completedToday: 0,
    streak: 0,
  },
  {
    id: "read",
    title: "Read 3 pages",
    emoji: "📖",
    enabled: true,
    schedule: { type: "daily_at", time: "20:00" },
    dailyTarget: 1,
    completedToday: 0,
    streak: 0,
  },
  {
    id: "lunch",
    title: "Eat lunch",
    emoji: "🥗",
    enabled: true,
    schedule: { type: "daily_at", time: "13:00" },
    dailyTarget: 1,
    completedToday: 0,
    streak: 0,
  },
];

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Returns the first task that should be reminded about right now, or null. */
export function getNextDueTask(tasks: Task[]): Task | null {
  const now = Date.now();
  const currentHHMM = new Date().toTimeString().slice(0, 5);

  for (const task of tasks) {
    if (!task.enabled) continue;
    if (task.completedToday >= task.dailyTarget) continue;

    switch (task.schedule.type) {
      case "interval_hours": {
        // If never scheduled, give 20-min grace on first launch
        const due = task.nextReminderAt ?? now + FIRST_REMINDER_DELAY_MS;
        if (now >= due) return task;
        break;
      }
      case "daily_at": {
        const time = task.schedule.time ?? "09:00";
        // Due within 30-min window
        if (currentHHMM >= time && currentHHMM <= addMinutes(time, 30)) return task;
        break;
      }
      case "daily_count":
        break;
    }
  }
  return null;
}

/** Mark a task completed and compute its next reminder time. */
export function markTaskDone(tasks: Task[], taskId: string): Task[] {
  const now = Date.now();
  const t = today();

  return tasks.map((task) => {
    if (task.id !== taskId) return task;

    const wasYesterday = task.lastCompletedDate === yesterday();
    const wasToday = task.lastCompletedDate === t;
    const newStreak = wasYesterday || wasToday ? task.streak + 1 : 1;

    const intervalMs = (task.schedule.intervalHours ?? 2) * 60 * 60 * 1000;
    const nextReminderAt =
      task.schedule.type === "interval_hours" ? now + intervalMs : task.nextReminderAt;

    return {
      ...task,
      completedToday: task.completedToday + 1,
      streak: newStreak,
      lastCompletedDate: t,
      nextReminderAt,
    };
  });
}

/** Reset daily counters — call when a new calendar day starts. */
export function resetDailyTasks(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    completedToday: 0,
    nextReminderAt: undefined,
  }));
}
