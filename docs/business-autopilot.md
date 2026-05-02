# Move Pet Business Autopilot

## Product

Move Pet is a lightweight desktop companion for people who sit too long during gaming, coding, work, or scrolling. After a long inactive session, a small dragon appears disturbed. When the user moves, it gets happy, floats with them, disappears after 3 seconds, and shows a victory toast with estimated calories burned.

## Wedge

Existing break apps optimize reminders. Desktop pet apps optimize charm. Move Pet should win by combining:

- Cute, visible emotional feedback instead of generic alerts.
- Local movement verification instead of "click to dismiss".
- Optional strict mode for people who want hard accountability.
- Privacy-first webcam processing with no frames leaving the device.

## MVP

- Cross-platform desktop shell: Tauri first, Electron only if needed for speed.
- Overlay dragon widget: idle, disturbed, happy, floating, victory states.
- Inactivity trigger: default 3 hours, configurable.
- Local motion detector: start with webcam frame-diff and MediaPipe Pose fallback.
- Strict mode: lock keyboard/mouse until movement target is met; require explicit opt-in and emergency exits.
- Victory toast: minutes moved, estimated calories, streak.
- Settings: inactivity window, strict mode, camera device, privacy indicator.

## Autopilot System

The business loop runs every 5 minutes:

1. Research current market, competitors, technical shortcuts, and free-tier tools.
2. Execute the highest-value next action in product, marketing, docs, or growth.
3. Review outputs against profitability, shipping speed, and privacy constraints.
4. Improve the backlog, prompts, product assets, and implementation.

Ask the user only for important business decisions:

- Pricing or monetization changes.
- Public launch or account-posting actions.
- Use of paid services.
- Anything requiring new sensitive credentials.
- Distribution choices with legal or platform risk.

## Free-Tier Policy

- Prefer local models, browser-controlled free tools, and existing free API keys.
- Use NVIDIA NIM through the local Claude proxy for agent work when reliable enough.
- Use the user browser profile only when an account flow or free web tool is necessary.
- Do not introduce paid SaaS dependencies unless the user approves.

## Initial Go-To-Market

- Target niche: gamers and deep-work builders who ignore normal reminders.
- Positioning: "a tiny dragon that gets upset when you forget to move."
- Launch surfaces: Reddit productivity/gaming/dev communities, X/Twitter clips, TikTok/Reels demo, itch.io, Product Hunt later.
- Proof loop: post short clips, collect waitlist, ship macOS alpha, then Windows.

## Key Risks

- Strict input locking must be safe, reversible, and opt-in.
- Webcam privacy must be obvious and local-only.
- Motion detection must avoid punishing users with camera/lighting issues.
- Desktop overlay permissions differ by OS; prototype macOS first, then Windows.
- Strict mode permissions can complicate app-store review and user trust; keep it experimental until proven safe.
