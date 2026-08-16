import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import AchievementToast from "./components/AchievementToast";
import GoalReachedToast from "./components/GoalReachedToast";
import LevelUpToast from "./components/LevelUpToast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <AchievementToast title="Test" description="Test desc" icon="🏆" onClose={() => {}} />
      <GoalReachedToast goal={100} onClose={() => {}} />
      <LevelUpToast currentLevel={2} hasEvolved={false} onClose={() => {}} />
    </div>
  </React.StrictMode>
);
