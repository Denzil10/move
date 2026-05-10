import { useState, useEffect, useCallback } from "react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { AppData } from "./lib/types";
import { loadData, saveData, INITIAL_DATA } from "./lib/storage";
import SetupScreen from "./screens/SetupScreen";
import FloatingPet from "./screens/FloatingPet";
import DebugPage from "./screens/DebugPage";
import "./App.css";

type Screen = "setup" | "float" | "debug";

export default function App() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [screen, setScreen] = useState<Screen>(() =>
    loadData().setupDone ? "float" : "setup"
  );

  /* Setup window sizing */
  useEffect(() => {
    const win = getCurrentWindow();
    if (screen === "setup") {
      win.setSize(new LogicalSize(420, 600));
      win.setAlwaysOnTop(true);
      win.center();
    }
  }, [screen]);

  /* Ctrl+Shift+D → debug */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setScreen((s) => (s === "debug" ? (data.setupDone ? "float" : "setup") : "debug"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data.setupDone]);

  function handleSetupDone(partial: Partial<AppData>) {
    const next: AppData = { ...data, ...partial, setupDone: true };
    setData(next);
    saveData(next);
    setScreen("float");
  }

  const handleDataChange = useCallback((next: AppData) => {
    setData(next);
    saveData(next);
  }, []);

  function handleReset() {
    const fresh = { ...INITIAL_DATA };
    setData(fresh);
    saveData(fresh);
    setScreen("setup");
  }

  if (screen === "debug") {
    return (
      <DebugPage
        data={data}
        onClose={() => setScreen(data.setupDone ? "float" : "setup")}
        onReset={handleReset}
      />
    );
  }

  if (screen === "setup") {
    return <SetupScreen onDone={handleSetupDone} />;
  }

  return <FloatingPet data={data} onDataChange={handleDataChange} />;
}
