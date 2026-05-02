1. Set up desktop environment:
   - Configure Tauri app for Move Pet with clear, borderless overlay window.
   - Setup React app.
   - Configure `pet.json` parsing.
2. Motion detection:
   - Use simple webcam API + frame differencing to generate a movement score.
   - Integrate simple timer/state machine (Idle -> Upset (inactivity threshold) -> Walking (needs movement) -> Happy (3s of walking) -> Victory (3m total)).
3. Pet rendering:
   - Render spritesheet animations matching states.
   - Add overlay toast for Victory / Status updates.
4. Settings / UI:
   - Add basic settings UI: strict mode toggle, debug visualizer.
   - Strict mode toggle overlays whole screen to block interaction, unless user moves.
5. Pre-commit & Build check:
   - Make sure all components build and start.
