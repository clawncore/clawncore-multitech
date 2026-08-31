import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FlaskConical, Network, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InnovationLabScene } from "../scenes/InnovationLabScene";
import { ResearchPanel } from "../components/ui/ResearchPanel";
import { PrototypeControls } from "../components/ui/PrototypeControls";
import { LoadingScreen } from "../components/ui/LoadingScreen";

export default function InnovationLabPage() {
  const [, navigate] = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Active prototype state
  const [activePrototype, setActivePrototype] = useState<'neural' | 'swarm' | 'quantum'>('neural');
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans selection:bg-sky-100">
      
      {/* Initialization Sequence */}
      <AnimatePresence>
        {isInitializing && (
          <LoadingScreen title="INITIALIZING FUTURE INNOVATION LAB" />
        )}
      </AnimatePresence>

      {/* Main 3D Environment */}
      {!isInitializing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <InnovationLabScene 
            activePrototype={activePrototype}
            isSimulating={isSimulating}
          />
        </motion.div>
      )}

      {/* Subtle Lab Overlay Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,250,252,0.6)_100%)]" />

      {/* UI Overlay */}
      {!isInitializing && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
          
          {/* Header Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-between items-start pointer-events-auto"
          >
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="rounded-full bg-white/80 backdrop-blur-md hover:bg-slate-100 text-slate-900 border border-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <FlaskConical className="w-4 h-4 text-indigo-500" />
                <h1 className="text-sm font-semibold tracking-widest text-slate-900 uppercase">
                  Future Innovation Lab
                </h1>
                <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] font-mono border border-red-100">RESTRICTED R&D</span>
              </div>
            </div>

            <div className="hidden md:flex gap-2">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm text-slate-500">
                <Network className="w-4 h-4" />
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm text-slate-500">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-end justify-between gap-6 pb-4">
            
            {/* Left Panel: Research Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pointer-events-auto"
            >
              <ResearchPanel activePrototype={activePrototype} isSimulating={isSimulating} />
            </motion.div>

            {/* Right Panel: Prototype Controls */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="pointer-events-auto flex flex-col gap-4"
            >
              <PrototypeControls 
                activePrototype={activePrototype}
                setActivePrototype={setActivePrototype}
                isSimulating={isSimulating}
                setIsSimulating={setIsSimulating}
              />
            </motion.div>
          </div>
          
        </div>
      )}
    </div>
  );
}
