# Reddit Post Drafts - Move Pet

## Target Subreddits: /r/productivity, /r/getdisciplined, /r/selfimprovement

### Title: I built a desktop pet that gets upset if you sit for too long (and happy when you move)

**Body:**

Hi everyone,

Like many of you, I struggle with "tunnel vision" when I'm working or gaming. I'll look at the clock and realize I haven't stood up in 4 hours. 

I tried break reminder apps, but I just clicked "dismiss" without thinking. I needed something more... persistent.

So I built **Move Pet**. 

It’s a lightweight desktop companion (Tauri + React) that stays hidden while you're active. If you’ve been sedentary for too long (configurable, default 3h), it appears on your screen looking **disturbed** (complete with smoke effects).

The only way to make it happy is to actually move. It uses your webcam for **local motion detection** (no frames ever leave your device, 100% privacy-first) to verify you’re actually stretching/moving.

**Key Features:**
*   🐾 **Emotional Feedback**: The pet evolves and changes mood based on your activity.
*   🔒 **Privacy First**: Motion detection happens entirely on your machine.
*   🔥 **Gamified**: Earn XP, level up, unlock species, and track streaks.
*   ⚠️ **Strict Mode**: For the truly undisciplined, it can lock your mouse/keyboard until you move.
*   ☁️ **Weather & Seasons**: Your pet reacts to your local environment.

I'm currently in the alpha phase (Windows and Linux builds ready, macOS coming soon).

Would love to hear what you think! Does the "emotional guilt-trip" approach work better for you than standard notifications?

[Link to GitHub/Landing Page]

---

## Target Subreddits: /r/programming, /r/cscareerquestions

### Title: Show /r/programming: Move Pet - A privacy-first desktop companion to fight sedentary dev life

**Body:**

Hey fellow devs,

I spent the last few weeks building a tool to solve my own problem: forgetting to move during deep work sessions.

**Move Pet** is a desktop app (Tauri/Rust/TypeScript) that uses a virtual pet to guilt you into taking breaks.

**The Tech:**
*   **Tauri + React**: Keeps the footprint small.
*   **Local Motion Detection**: I used basic frame-differencing (and working on MediaPipe integration) to detect movement via webcam. **Crucially, all processing is local.** Privacy was my #1 priority.
*   **System Integration**: Custom Tauri commands for always-on-top overlays and optional input locking (Strict Mode).

**The Loop:**
1.  Dev for 3 hours.
2.  Pet appears, looking grumpy and emitting smoke.
3.  Stand up and stretch for 30 seconds.
4.  Pet gets happy, floats around, and grants XP/Coins.
5.  Pet disappears until the next interval.

It's been a fun project to combine Rust system level stuff with a cute React frontend. 

I've just released the first Linux and Windows alpha builds. 

**GitHub:** [Link]

Check it out if you're like me and need a tiny dragon to tell you to stand up!
