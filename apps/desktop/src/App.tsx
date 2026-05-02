import { useState, useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import './index.css';
import { useMotionDetection } from './hooks/useMotionDetection';
import { useGameState } from './hooks/useGameState';
import { PetViewer } from './components/PetViewer';
import { Toast } from './components/Toast';
import { Settings } from './components/Settings';
import { Settings as SettingsIcon, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // Core logic hooks
  const { videoRef, canvasRef, motionScore } = useMotionDetection(true);
  const {
      state,
      sessionMinutes,
      estimatedCalories,
      triggerUpset,
      resetGame
  } = useGameState(motionScore);

  const isBlocking = strictMode && (state === 'upset' || state === 'walking' || state === 'happy');

  // Handle Tauri fullscreen for strict mode
  useEffect(() => {
      const toggleFullscreen = async () => {
          try {
              const appWindow = getCurrentWindow();
              await appWindow.setFullscreen(isBlocking);
          } catch (e) {
              console.warn("Tauri window API not available (likely in browser)", e);
          }
      };
      toggleFullscreen();
  }, [isBlocking]);

  return (
    <div className="w-full h-screen bg-transparent overflow-hidden font-sans relative">

      {/* Hidden processing canvas/video to ensure motion tracking runs even when debug is off */}
      <div className="absolute top-0 left-0 w-1 h-1 overflow-hidden opacity-0 pointer-events-none">
          <video
             ref={videoRef}
             width={320}
             height={240}
             muted
             playsInline
          />
          <canvas
             ref={canvasRef}
             width={320}
             height={240}
          />
      </div>

      {/* Strict Mode Overlay */}
      <AnimatePresence>
          {isBlocking && (
             <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center justify-center pointer-events-auto backdrop-blur-sm"
             >
                 <h1 className="text-4xl font-bold text-white mb-4">Time to Move!</h1>
                 <p className="text-xl text-gray-300">Your pet needs you to stand up and walk.</p>
                 <p className="text-gray-400 mt-2">Motion score: {motionScore.toFixed(0)}</p>
             </motion.div>
          )}
      </AnimatePresence>

      {/* Main UI Container */}
      <div className="w-full h-full flex flex-col items-end justify-end p-8 relative z-50 pointer-events-none">

          {/* Controls Bar (Hover to reveal or always visible in debug) */}
          <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto group">

              {/* Debug Test Controls */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/80 p-2 rounded-lg backdrop-blur">
                  <button
                      onClick={triggerUpset}
                      className="p-2 text-white bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
                      title="Force Upset State"
                  >
                      <Play size={16} />
                  </button>
                  <button
                      onClick={resetGame}
                      className="p-2 text-white bg-gray-600 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
                      title="Reset State"
                  >
                      <Square size={16} />
                  </button>
              </div>

              <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full shadow-lg backdrop-blur transition-all"
              >
                  <SettingsIcon size={24} />
              </button>
          </div>

          <Settings
             show={showSettings}
             onClose={() => setShowSettings(false)}
             strictMode={strictMode}
             onToggleStrictMode={() => setStrictMode(!strictMode)}
             debugMode={debugMode}
             onToggleDebugMode={() => setDebugMode(!debugMode)}
             motionScore={motionScore}
          />

          <Toast
             show={state === 'victory'}
             title="Goal Reached!"
             message="Great job moving! You can go back to what you were doing now."
             calories={estimatedCalories}
             minutes={sessionMinutes}
          />

          {/* Pet Container */}
          <motion.div
             className="relative"
             animate={{
                 y: state === 'happy' ? [0, -20, 0] : 0,
             }}
             transition={{
                 y: {
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                 }
             }}
          >
              <PetViewer state={state} />
          </motion.div>

      </div>
    </div>
  );
}

export default App;
