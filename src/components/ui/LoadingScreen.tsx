import { motion } from "framer-motion";

export function LoadingScreen({ title = "INITIALIZING SYSTEM" }: { title?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center font-mono pointer-events-none"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-6" />
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
          <h2 className="text-slate-900 tracking-[0.3em] text-sm uppercase">
            {title}
          </h2>
        </div>
        <p className="mt-4 text-slate-400 text-[10px] tracking-widest">ESTABLISHING UPLINK...</p>
      </div>
    </motion.div>
  );
}
