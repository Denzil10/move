# Technical Research

## Desktop Shell

Use Tauri first.

Reasons:

- Smaller footprint than Electron for a lightweight widget.
- Supports always-on-top windows through window APIs.
- Has global shortcut support through the Tauri global shortcut plugin.
- Existing Tauri overlay apps demonstrate transparent, click-through, always-on-top windows.

Fallback:

- Electron if Tauri blocks overlay behavior or fast iteration becomes more important than bundle size.

## Overlay

Prototype requirements:

- Transparent frameless window.
- Always on top.
- Click-through while passive.
- Can appear on all workspaces when supported.
- Small animated dragon anchored near a screen edge.

Known risk:

- Fullscreen games can reject or obscure overlays depending on exclusive fullscreen mode and OS compositor behavior. Market around borderless/windowed fullscreen first.

## Motion Detection

MVP path:

1. Start with webcam frame-difference motion scoring.
2. Add MediaPipe Pose Landmarker for body movement verification.
3. Keep all frames local and discard immediately.
4. Store only aggregate movement metrics: active seconds, confidence, estimated calories.

Why MediaPipe:

- Google AI Edge documents web JavaScript pose landmark detection.
- MediaPipe has browser/WebAssembly support, which fits Tauri frontend prototypes.
- It avoids sending camera frames to cloud services.

## Strict Mode

Strict mode is useful but high risk.

Mac path:

- Requires Accessibility permission for global input interception.
- CGEventTap-style blocking is technically possible, as shown by keyboard-cleaning utilities.
- Must include emergency exits: hold Esc, timer, menu-bar unlock, and possibly Touch ID/system lock escape.

Windows path:

- Topmost overlays are straightforward with OS window styles.
- Input locking needs a separate native module and careful failsafe handling.

Product rule:

- Strict mode should be opt-in, clearly labeled experimental, and disabled by default in MVP.

## First Prototype Stack

- Tauri + React/TypeScript.
- CSS or Rive/Lottie dragon animation for fastest iteration.
- Browser `getUserMedia` for webcam.
- Frame-diff motion score first.
- MediaPipe Pose Landmarker second.
- Rust sidecar/native module only when needed for strict mode.

## Sources

- Tauri global shortcut docs: https://v1.tauri.app/v1/api/js/globalShortcut
- Tauri window docs: https://v1.tauri.app/v1/api/js/window
- Google MediaPipe Pose Landmarker for web: https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js
- Wipey macOS input-locking reference: https://wipey.app/
- Microsoft PowerToys Always On Top reference: https://microsoft-powertoys-3.mintlify.app/utilities/always-on-top

## Inactivity Detection

MVP path:

1. Web-based idle tracking using event listeners (`mousemove`, `keydown`, `click`, `scroll`).
2. OS-level idle time retrieval via Tauri native APIs if global detection (outside the app window) is required.
3. Configurable inactivity thresholds (default 3 hours, testable at 5-10s).

Why web-based first:

- Easiest to prototype in React.
- Covers basic usage while the app or overlay has focus.
- Can be extended to global tracking via Tauri's native plugins later.
