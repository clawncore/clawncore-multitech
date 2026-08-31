import { Button } from "@/components/ui/button";
import { Layers, Zap, Hexagon, Radar } from "lucide-react";

interface Props {
  showWireframe: boolean;
  setShowWireframe: (v: boolean) => void;
  showDrones: boolean;
  setShowDrones: (v: boolean) => void;
  showCropData: boolean;
  setShowCropData: (v: boolean) => void;
  isScanning: boolean;
  setIsScanning: (v: boolean) => void;
}

export function OperationalControls({
  showWireframe, setShowWireframe,
  showDrones, setShowDrones,
  showCropData, setShowCropData,
  isScanning, setIsScanning
}: Props) {
  
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-4 flex flex-col gap-3 w-full md:w-[260px] pointer-events-auto">
      <h3 className="text-slate-900 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Operational Layers</h3>
      
      <Button 
        variant={showWireframe ? "default" : "outline"}
        className={`justify-start ${showWireframe ? 'bg-sky-600 hover:bg-sky-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => setShowWireframe(!showWireframe)}
      >
        <Hexagon className="w-4 h-4 mr-3" />
        Topography Mesh
      </Button>

      <Button 
        variant={showDrones ? "default" : "outline"}
        className={`justify-start ${showDrones ? 'bg-sky-600 hover:bg-sky-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => setShowDrones(!showDrones)}
      >
        <Radar className="w-4 h-4 mr-3" />
        Drone Fleet
      </Button>

      <Button 
        variant={showCropData ? "default" : "outline"}
        className={`justify-start ${showCropData ? 'bg-sky-600 hover:bg-sky-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => setShowCropData(!showCropData)}
      >
        <Layers className="w-4 h-4 mr-3" />
        Crop Intelligence
      </Button>

      <div className="h-px bg-slate-100 my-2" />

      <Button 
        className={`w-full ${isScanning ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'} text-white shadow-md`}
        onClick={() => setIsScanning(!isScanning)}
      >
        <Zap className="w-4 h-4 mr-2" />
        {isScanning ? 'Halt Scan Sweep' : 'Initiate Scan Sweep'}
      </Button>
    </div>
  );
}
