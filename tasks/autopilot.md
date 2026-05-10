# Autopilot Backlog

Last updated: 2026-05-10

## Completed

- [x] Stabilization cycle: removed duplicate `handleExportPetData`, confirmed tests pass
- [x] Fixed 18 App.tsx syntax corruption sites (3 functions with empty if(soundEnabled) leaving function bodies unclosed: unlockAchievement, unlockSpecies, checkSpeciesUnlocks)
- [x] Fixed Milestone/WeeklyData type errors, buff API call, removed broken export function
- [x] Integrated tiny-dino spritesheet (SpriteAnimation component, collection entry, auto-unlock)
- [x] Rewrote autopilot system.md with real context and prioritized backlog

## Active / In Progress

(none — agent picking up from Next queue)

## P0 — Ship blockers

- [ ] **Verify motion detection** on macOS: `useMotionDetection` hook → does `hasPermission`/`isMoving` fire correctly? Check Tauri permissions in `src-tauri/capabilities/`.
- [ ] **Tauri build**: Run `cargo tauri build` in `apps/desktop/src-tauri/`. Fix any Rust compile errors. Target: `.app` bundle works.
- [ ] **Always-on-top default**: First launch should set always-on-top = true automatically.

## P1 — Core UX

- [ ] **Strict mode testing**: When `strictMode` active, does the overlay actually block? Test the `StrictModeOverlay` component wiring.
- [ ] **Onboarding flow**: First launch → pet name prompt → motion permission request → then main UI.
- [ ] **Species quick-switch**: Add a small species toggle button on the main overlay (don't force users into Collection modal).

## P2 — Polish

- [ ] **Extract useDailyReset hook**: Lines ~750-790 of App.tsx (the daily reset useEffect) — move to `src/hooks/useDailyReset.ts`. This is the most autopilot-corrupted area.
- [ ] **Remove dead features**: Delete PetDreams, AppUsageReport, PetDiary, WeeklyReport + their imports. Reduces App.tsx by ~300 lines.
- [ ] **Tiny-dino scale**: Increase from 0.35 to 0.45 in Pet.tsx SpriteAnimation call.

## P3 — Growth

- [ ] **Share card trigger**: On 3-day streak, auto-show ShareImageGenerator with a "Share your streak!" message.
- [ ] **Data export**: Re-implement with correct Tauri fs plugin API (previous version deleted for bad API usage).
- [ ] **Motion calibration**: Let user set threshold from the overlay without opening Settings modal.
