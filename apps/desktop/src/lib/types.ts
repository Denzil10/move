export type PetState = "idle" | "disturbed" | "happy" | "floating" | "thinking" | "sleeping" | "training";

export interface TaskSchedule {
  type: "interval_hours" | "daily_at" | "daily_count";
  intervalHours?: number;
  time?: string; // "HH:MM" for daily_at
}

export interface Task {
  id: string;
  title: string;
  emoji: string;
  enabled: boolean;
  schedule: TaskSchedule;
  /** How many times this task must be completed per day */
  dailyTarget: number;
  completedToday: number;
  streak: number;
  lastCompletedDate?: string; // "YYYY-MM-DD"
  /** For interval tasks: when the next reminder fires (ms timestamp) */
  nextReminderAt?: number;
}

export interface AppData {
  setupDone: boolean;
  petSpeciesId: string;
  tasks: Task[];
  strictMode: boolean;
  xp: number;
  level: number;
  overallStreak: number;
  lastActiveDate?: string;
}
