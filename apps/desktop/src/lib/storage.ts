import { AppData } from "./types";
import { DEFAULT_TASKS } from "./tasks";

const STORAGE_KEY = "move_pet_v2";

export const INITIAL_DATA: AppData = {
  setupDone: false,
  petSpeciesId: "tiny_dino",
  tasks: DEFAULT_TASKS,
  strictMode: false,
  xp: 0,
  level: 1,
  overallStreak: 0,
};

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(INITIAL_DATA);
    const parsed = JSON.parse(raw) as Partial<AppData>;
    // Always merge so new fields from INITIAL_DATA are present
    return { ...structuredClone(INITIAL_DATA), ...parsed };
  } catch {
    return structuredClone(INITIAL_DATA);
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
