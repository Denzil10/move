# Move Pet Production Handoff

## Goal

Ship **Move Pet**: a lightweight desktop pet that appears when users sit too long, verifies local movement, celebrates success, and can optionally enforce movement with strict mode.

Jules' goal is to turn this repo into a full production app that a real user can install, run, enjoy, and use to complete the full movement loop without developer help.

This is not a proof of concept, alpha, or demo shell. Build a store-ready product: maintainable code, real packaging, clear settings, safe failure behavior, launch-ready UX, and enough polish to publish without another major review cycle.

Technical goal: make the product and the autopilot system work together. The app should ship, and the repo should keep improving itself through a planner -> executor -> reviewer loop that can research, implement, verify, and update its own backlog.

Growth goal: keep testing, polishing, and iterating until the app is not merely functional, but genuinely appealing. The first public build should feel cute, useful, trustworthy, easy to understand, and strong enough for users to post, clip, recommend, and keep installed.

This is now a generic pet product, not dragon-specific.

## Core Product

- Inactivity triggers the pet.
- Pet appears upset with a fun movement prompt.
- Webcam motion detection runs locally only.
- After 3 seconds of walking-like motion, pet becomes happy.
- User must keep moving for 3 minutes.
- On completion, pet hides and shows a victory toast with time, streak, and estimated calories.
- Strict mode is opt-in. Start with a safe blocking overlay; native keyboard/mouse locking can come later.
- Keep the system simple for this phase: fixed bundled pets only, no user-generated pets, no pet editor, no custom generation flow.

## Business Direction

Target users:

- gamers
- developers
- remote workers
- students
- productivity/ADHD users who ignore normal reminders

Positioning:

> A desktop pet that makes you move before you keep gaming, coding, or scrolling.

Monetization path:

- free core app
- paid pet packs/themes
- paid strict-mode profiles
- streak/history features later
- team/workplace version later

Launch path:

1. Store-ready desktop release
2. demo clips + launch page
3. Windows build if not included from day one
4. app store / marketplace / itch / Product Hunt / Reddit launch

## Jules Autonomy

Jules can explore this repo on its own, read any local docs/code/tests/backlog, and make routine product or engineering decisions without asking.

Copy/adapt aggressively. Do not over-plan. Ship the complete app.

Operating loop:

```text
research -> execute -> review -> improve
```

Default behavior:

- Keep researching online before inventing.
- Prefer proven open-source patterns and free-tier tools.
- Ask only for important business decisions, paid services, credentials, public posting, launch choices, or risky distribution decisions.
- Route work by complexity: fast model for routine tasks, smarter model for complex/product decisions, retries/fallbacks for provider failures.
- Keep memory/backlog/docs updated so the system gets better over time.
- Maintain the 5-minute Docker/local autopilot loop as the business engine.
- Keep testing UX, visuals, motion detection, onboarding, and demo flow until the product is polished enough for a viral launch attempt.

Primary things to copy/adapt:

- OpenAI `hatch-pet`: pet package model, `pet.json`, `spritesheet.webp`, atlas workflow, validation mindset.
- Use the richest and most popular open Hatch/Codex-compatible pet library available when bundling default pets. Licensing is handled separately from the build.
- `siegerts/tama96`: Tauri + React pet app structure and state-driven rendering.
- OpenGameArt/generated/team-cleared assets for the default pet.
- `wayland-vpets`: animation state naming and fallback ideas.

## Build Direction

Create `apps/desktop` with Tauri + React + TypeScript + Vite.

Support pet packs:

```text
public/pets/default/
  pet.json
  spritesheet.webp
```

Phase constraint: package a curated built-in library only. Users can select bundled pets, but cannot generate, import, upload, or edit pets.

Minimum animation states:

- `idle`
- `upset`
- `walking`
- `happy`
- `victory`
- `failed`

Prompt loop:

- Each interval chooses one short movement prompt.
- Prompt examples: stand up, shoulder rolls, march in place, squats, wrist stretch, neck stretch, water walk.
- The pet animation should make the prompt feel playful, but the product win is still regular movement compliance.

Motion MVP:

- use browser webcam access
- keep frames local
- do simple frame-diff scoring first
- add MediaPipe later only if needed

Strict mode MVP:

- safe blocking overlay first
- native input lock only after failsafes exist

## Production Checklist

- Rename user-facing Move Dragon language to Move Pet.
- Scaffold and run the desktop app.
- Load a default pet pack.
- Show transparent always-on-top pet overlay.
- Implement inactivity timer.
- Implement local motion score.
- Wire upset -> walking -> happy -> victory.
- Require 3 seconds walking for happy.
- Require 3 minutes movement for victory.
- Add victory toast.
- Add settings.
- Add strict mode toggle with safe overlay behavior.
- Verify install, dev run, build, tests, and manual full loop.
- Package a store-ready release build.
- Polish onboarding, pet personality, visuals, copy, defaults, and demo flow until it has clear user appeal.

## Done Means

The app is ready to publish and the loop is proven:

```text
inactive -> upset pet -> webcam motion -> 3s happy -> 3min movement -> victory toast
```

If something is blocked by permissions, packaging, or camera access, document the blocker and keep the rest shippable.
