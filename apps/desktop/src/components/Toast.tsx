import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  show: boolean;
  title: string;
  message: string;
  calories?: number;
  minutes?: number;
}

export function Toast({ show, title, message, calories, minutes }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 right-8 bg-gray-900 text-white rounded-xl shadow-2xl p-6 w-80 pointer-events-auto border border-gray-700"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-green-400">{title}</h3>
            <p className="text-gray-300">{message}</p>

            {(calories !== undefined || minutes !== undefined) && (
                <div className="flex gap-4 mt-2 pt-2 border-t border-gray-700">
                   {minutes !== undefined && (
                       <div className="flex flex-col">
                           <span className="text-xs text-gray-400">Time</span>
                           <span className="text-lg font-semibold">{minutes}m</span>
                       </div>
                   )}
                   {calories !== undefined && (
                       <div className="flex flex-col">
                           <span className="text-xs text-gray-400">Est. Calories</span>
                           <span className="text-lg font-semibold">{calories} kcal</span>
                       </div>
                   )}
                </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
