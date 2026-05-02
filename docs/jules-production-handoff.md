# Move Pet Production Handoff

## Mission

Ship **Move Pet**: a lightweight desktop companion that appears when users sit too long, verifies real movement locally, celebrates success, and optionally enforces movement with strict mode.

This is no longer dragon-specific. Build a generic pet platform with a cute default pet and support for swappable pet packs.

## Product

Move Pet is for gamers, coders, office workers, students, and doomscrollers who ignore normal break reminders.

Core loop:

1. User is inactive too long.
2. Pet appears upset on the desktop.
3. Webcam checks local motion only.
4. User must keep walking or moving for the target duration.
5. After the first 3 seconds of confirmed walking, pet becomes happy.
6. Pet stays visible while the user keeps moving.
7. If strict mode is on and the user stops before the target, keyboard/mouse remain locked or re-lock.
8. After the full movement goal, unlock, hide pet, show victory toast with time moved, streak, and estimated calories.

Default settings:

- Inactivity trigger: 60 minutes for MVP testing, configurable to 15/30/60/120/180.
- Movement target: 3 minutes.
- Happy threshold: 3 continuous seconds of walking-like motion.
- Strict mode: off by default, explicit opt-in.
- Privacy: webcam frames never leave the device and are not saved.

## Business Plan

Positioning:

> A desktop pet that makes you move before you keep gaming, coding, or scrolling.

Wedge:

- Normal break apps are easy to dismiss.
- Fitness apps do not live inside desktop workflows.
- Desktop pets are cute but usually decorative.
- Move Pet combines emotional feedback, local movement verification, and optional accountability.

Target launch audience:

- Developers using AI coding tools.
- PC gamers who play long sessions.
- Remote workers who sit too long.
- Productivity and ADHD communities that need external accountability.

MVP monetization hypothesis:

- Free core app.
- Paid pet packs/themes.
- Paid strict-mode profiles.
- Paid streaks/history/export later.
- Team/workplace wellness version later.

Launch order:

1. Local macOS alpha.
2. Public demo clips.
3. Waitlist/landing page.
4. Windows build.
5. Product Hunt/Reddit/itch launch.

Do not wait for perfect brand, perfect art, or perfect motion ML. Ship a useful loop first.

## What To Copy First

Copy/adapt proven implementation patterns aggressively.

Priority references:

- `siegerts/tama96`: Tauri + React pet architecture, canvas state rendering, tray/background app shape.
- OpenAI `hatch-pet`: pet pack format idea, `pet.json` + `spritesheet.webp`, animation atlas workflow.
- OpenGameArt CC0 pets/creatures: quick default art if generated pet assets are blocked.
- `wayland-vpets`: animation state names and sprite-sheet fallback ideas.

Avoid spending product time debating licenses. Use permissive, generated, or team-cleared assets for release builds. If a copied asset is only useful for prototyping, mark it as temporary and replace before public distribution.

## Architecture

Create:

```text
apps/desktop/
  package.json
  src/
    app/
    pet/
    motion/
    strict-mode/
    settings/
    telemetry/
  src-tauri/
  public/pets/default/
    pet.json
    spritesheet.webp
```

Use:

- Tauri v2.
- React + TypeScript.
- Vite.
- Canvas or CSS sprite animation.
- Browser `getUserMedia` for webcam.
- Local frame-diff motion scoring first.
- MediaPipe Pose Landmarker only after frame-diff MVP works.
- Rust/native strict-mode module only after the app loop is proven.

Do not build a landing page as the first screen. The app first screen is the actual pet overlay/settings experience.

## Pet Pack Contract

Support this minimum contract:

```json
{
  "id": "default",
  "name": "Hatchling",
  "sprite": "spritesheet.webp",
  "cellWidth": 192,
  "cellHeight": 208,
  "columns": 8,
  "rows": 9,
  "animations": {
    "idle": { "row": 0, "frames": 8, "fps": 6, "loop": true },
    "upset": { "row": 1, "frames": 8, "fps": 6, "loop": true },
    "happy": { "row": 2, "frames": 8, "fps": 8, "loop": true },
    "walking": { "row": 3, "frames": 8, "fps": 10, "loop": true },
    "victory": { "row": 4, "frames": 8, "fps": 10, "loop": false },
    "failed": { "row": 5, "frames": 8, "fps": 6, "loop": true }
  }
}
```

If `hatch-pet` is available, generate the default pet through it. If not, use a placeholder sprite pack and keep the contract stable.

## Motion Detection MVP

Implement `motionScore` locally:

1. Request webcam permission only when movement check starts.
2. Downscale frames to small grayscale buffers.
3. Compare frame differences.
4. Smooth score over 1 second.
5. Detect walking candidate when score crosses threshold with periodic body-scale movement.
6. Require 3 continuous seconds for `walkingConfirmed`.
7. Require 180 total confirmed seconds for `movementGoalComplete`.

Expose debug values in development:

- current score
- smoothed score
- walking seconds
- target seconds
- camera status
- confidence label

Never store frames. Never upload frames. Do not log images.

## Strict Mode

Strict mode is opt-in and must be safe.

MVP strict mode can start as a blocking overlay before native input locking:

- Fullscreen transparent/topmost app overlay.
- Blocks app interaction visually.
- Shows progress, emergency unlock, and camera status.

Native input lock comes later:

- macOS: Accessibility permission and event tap.
- Windows: native input hook/module.

Failsafes required before shipping native lock:

- Hold Esc for 5 seconds unlock.
- Max lock duration.
- Menu/tray emergency unlock.
- Auto-unlock on camera failure.
- Auto-unlock on app crash/restart.

## Victory Toast

Show after movement goal:

- “Nice. You moved for 3:00.”
- calories estimate
- streak count
- next reminder time

Calorie estimate MVP:

```text
calories = minutes * userWeightKg * 0.058
```

If weight is unknown, use 70 kg and label as estimated.

## Production Checklist

MVP must include:

- Tauri app starts locally.
- Transparent always-on-top pet overlay.
- Pet appears after inactivity timer.
- Pet has idle/upset/happy/walking/victory states.
- Webcam permission flow.
- Local motion score.
- 3-second walking confirmation.
- 3-minute movement goal.
- Victory toast.
- Settings screen.
- Strict mode UI flag, disabled by default.
- Privacy copy in settings.
- macOS build artifact.

Production polish:

- App icon.
- Tray/menu controls.
- Start on login option.
- Update reminder timer without restart.
- Camera selection.
- Permission recovery screens.
- Crash-safe strict-mode unlock.
- Signed macOS build.
- Signed Windows build.
- Landing page and waitlist.

## Jules Execution Order

1. Rename product language from Move Dragon to Move Pet where user-facing.
2. Scaffold `apps/desktop` with Tauri + React + TypeScript.
3. Add pet pack loader using the contract above.
4. Add placeholder/default pet animation.
5. Build transparent overlay window.
6. Add inactivity timer.
7. Add webcam frame-diff motion scoring.
8. Wire app states: hidden, upset, walking, happy, victory.
9. Add 3-minute movement session logic.
10. Add victory toast.
11. Add settings.
12. Add strict-mode blocking overlay only.
13. Verify on macOS with local run.
14. Package macOS build.
15. Prepare launch assets and README.

## Verification

Before saying done, prove:

- `npm install` works in `apps/desktop`.
- `npm run dev` starts the Tauri app.
- `npm run build` builds frontend.
- Tauri build reaches the furthest possible local stage.
- Motion scoring works with a live webcam or a deterministic test adapter.
- Unit tests cover motion state transitions.
- Manual test proves: idle trigger -> upset pet -> 3s walking happy -> 3min victory.

If camera or native packaging is blocked by local permissions, document exact blocker and keep all other checks green.

## Shipping Rule

Do the smallest thing that makes the product real. A cute generic pet that reliably makes someone stand up and move is better than a perfect pet engine with no shipped loop.
