import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DroneAnalyticsScene } from "../scenes/DroneAnalyticsScene";
import { AnalyticsPanel } from "../components/ui/AnalyticsPanel";
import { OperationalControls } from "../components/ui/OperationalControls";
import { LoadingScreen } from "../components/ui/LoadingScreen";

export default function DroneAnalyticsPage() {
  const [, navigate] = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Scene state controls
  const [showWireframe, setShowWireframe] = useState(false);
  const [showDrones, setShowDrones] = useState(true);
  const [showCropData, setShowCropData] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Simulate complex system initialization
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Initialization Sequence */}
      <AnimatePresence>
        {isInitializing && (
          <LoadingScreen title="INITIALIZING DRONE ANALYTICS LAB" />
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
          <DroneAnalyticsScene 
            showWireframe={showWireframe}
            showDrones={showDrones}
            showCropData={showCropData}
            isScanning={isScanning}
          />
        </motion.div>
      )}

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
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <h1 className="text-sm font-semibold tracking-widest text-slate-900 uppercase">
                  Drone Analytics Lab
                </h1>
                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] text-slate-500 font-mono">SYS.ONLINE</span>
              </div>
            </div>

            <div className="hidden md:flex gap-2">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm text-slate-500">
                <Database className="w-4 h-4" />
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm text-sky-600">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-end justify-between gap-6 pb-4">
            
            {/* Left Panel: Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pointer-events-auto"
            >
              <AnalyticsPanel />
            </motion.div>

            {/* Right Panel: Controls */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="pointer-events-auto flex flex-col gap-4"
            >
              <OperationalControls 
                showWireframe={showWireframe}
                setShowWireframe={setShowWireframe}
                showDrones={showDrones}
                setShowDrones={setShowDrones}
                showCropData={showCropData}
                setShowCropData={setShowCropData}
                isScanning={isScanning}
                setIsScanning={setIsScanning}
              />
            </motion.div>
          </div>
          
        </div>
      )}
    </div>
  );
}
