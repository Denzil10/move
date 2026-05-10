# Move Pet Distribution Plan

This document outlines the strategy for distributing Move Pet to users, starting with a macOS alpha and expanding to Windows and Linux.

## Phase 1: macOS Alpha (Closed/Public Preview)

**Goal**: Validate the core loop and collect feedback from early adopters (gamers, builders).

- **Build**: Use `tauri build` to generate a `.app` and `.dmg`.
- **Notarization**: Required for a smooth macOS install experience. Use Apple Developer Program credentials.
- **Hosting**: 
  - GitHub Releases for version tracking.
  - itch.io for community discovery and "pay what you want" support.
- **Feedback Loop**:
  - Simple "Send Feedback" button in settings linking to a Google Form or Tally.so.
  - Discord community for real-time interaction.

## Phase 2: Windows Alpha

**Goal**: Expand reach to the largest segment of the target market.

- **Build**: Use `tauri build` on a Windows runner (GitHub Actions) to generate `.msi` and `.exe`.
- **Signing**: Highly recommended to avoid "SmartScreen" warnings. Use a standard code signing certificate.
- **Hosting**: Same as macOS (GitHub + itch.io).

## Phase 3: Public Beta & Launch

**Goal**: Broad public release and community growth.

- **Surfaces**:
  - **Product Hunt**: Major launch event.
  - **Reddit**: Targeted subreddits (r/productivity, r/gaming, r/selfimprovement).
  - **Twitter/X**: Demo clips and streak highlights.
- **Auto-Updates**: Use Tauri's built-in updater with a static JSON host (e.g., GitHub Gist or Vercel).

## Future Considerations

- **Mac App Store**: Strict mode might require special entitlements or sandboxing exceptions.
- **Windows Store**: Good for visibility but requires compliance with Microsoft's policies.
- **Linux Support**: Provide `AppImage` or `.deb` for the dev community.

## Key Metrics to Track

- **DAU/MAU**: Daily/Monthly active users.
- **Streak Retention**: How many users maintain a 7+ day streak.
- **Inactivity Conversion**: Percentage of users who actually move when the pet is disturbed.
