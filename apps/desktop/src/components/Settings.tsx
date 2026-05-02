import { Camera, Shield, X, Settings as SettingsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsProps {
  show: boolean;
  onClose: () => void;
  strictMode: boolean;
  onToggleStrictMode: () => void;
  debugMode: boolean;
  onToggleDebugMode: () => void;
  motionScore: number;
}

export function Settings({
    show,
    onClose,
    strictMode,
    onToggleStrictMode,
    debugMode,
    onToggleDebugMode,
    motionScore
}: SettingsProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-8 right-8 bg-gray-900 text-white rounded-xl shadow-2xl p-6 w-80 pointer-events-auto border border-gray-700"
        >
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <SettingsIcon size={20} />
                Settings
            </h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white"
            >
                <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 font-medium">
                       <Shield size={16} className={strictMode ? "text-red-400" : "text-gray-400"} />
                       Strict Mode
                   </div>
                   <span className="text-xs text-gray-400">Blocks screen until you move</span>
               </div>
               <button
                  onClick={onToggleStrictMode}
                  className={`w-12 h-6 rounded-full transition-colors relative ${strictMode ? 'bg-red-500' : 'bg-gray-600'}`}
               >
                   <motion.div
                       className="w-4 h-4 bg-white rounded-full absolute top-1"
                       animate={{ left: strictMode ? "24px" : "4px" }}
                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
                   />
               </button>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 font-medium">
                       <Camera size={16} className={debugMode ? "text-blue-400" : "text-gray-400"} />
                       Debug Camera
                   </div>
                   <span className="text-xs text-gray-400">Show camera & motion score</span>
               </div>
               <button
                  onClick={onToggleDebugMode}
                  className={`w-12 h-6 rounded-full transition-colors relative ${debugMode ? 'bg-blue-500' : 'bg-gray-600'}`}
               >
                   <motion.div
                       className="w-4 h-4 bg-white rounded-full absolute top-1"
                       animate={{ left: debugMode ? "24px" : "4px" }}
                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
                   />
               </button>
            </div>

            {debugMode && (
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                   <div className="text-sm text-gray-300 mb-1">Motion Score</div>
                   <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden relative">
                       <motion.div
                           className="h-full bg-blue-500"
                           animate={{ width: `${Math.min(100, motionScore)}%` }}
                           transition={{ type: "tween", duration: 0.1 }}
                       />
                       <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white mix-blend-difference">
                           {motionScore.toFixed(0)} / 100
                       </span>
                   </div>
                </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
