import { useEffect, useState } from "react";
import { fetchTelemetry } from "../../services/terrainData";
import { Activity, ShieldCheck, MapPin, Signal } from "lucide-react";

export function AnalyticsPanel() {
  const [telemetry, setTelemetry] = useState(fetchTelemetry());

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(fetchTelemetry());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-6 w-full md:w-[320px] pointer-events-auto">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-sky-600" />
        <h2 className="text-slate-900 font-semibold tracking-wide">Live Telemetry</h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Area Scanned</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">{telemetry.totalAreaScanned.toLocaleString()}</span>
            <span className="text-slate-400 mb-1">Ha</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-2" />
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1">Active Drones</p>
            <p className="text-lg font-semibold text-slate-900">{telemetry.activeDrones}</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <MapPin className="w-4 h-4 text-amber-500 mb-2" />
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1">Anomalies</p>
            <p className="text-lg font-semibold text-slate-900">{telemetry.anomaliesDetected}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono">Uplink Status</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-medium">STABLE</span>
              <Signal className="w-3 h-3 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
