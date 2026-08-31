import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, BrainCircuit, ShieldAlert, Cpu, Network, Map } from "lucide-react";
import { CAREER_ROLES, DepartmentId, CareerRole } from "../../services/careersData";

interface Props {
  onHover: (dept: DepartmentId | null) => void;
  onApply: (role: CareerRole) => void;
}

export function OpportunityPanel({ onHover, onApply }: Props) {
  
  const getIcon = (dept: DepartmentId) => {
    switch (dept) {
      case 'ai': return <BrainCircuit className="w-5 h-5 text-blue-500" />;
      case 'drone': return <Cpu className="w-5 h-5 text-sky-500" />;
      case 'cyber': return <ShieldAlert className="w-5 h-5 text-emerald-500" />;
      case 'cloud': return <Network className="w-5 h-5 text-indigo-500" />;
      case 'analytics': return <Map className="w-5 h-5 text-violet-500" />;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl w-full md:w-[400px] h-[70vh] flex flex-col overflow-hidden pointer-events-auto">
      
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Open Opportunities</h2>
        <p className="text-sm text-slate-500">Join the ecosystem building the future.</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {CAREER_ROLES.map((role) => (
            <div 
              key={role.id}
              className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              onMouseEnter={() => onHover(role.department)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onApply(role)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    {getIcon(role.department)}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">{role.title}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">{role.departmentName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-medium tracking-wide uppercase">
                  {role.location}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-medium tracking-wide uppercase">
                  {role.type}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                <div className="flex gap-1">
                  {role.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                  {role.skills.length > 3 && <span className="text-[10px] text-slate-400">...</span>}
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 pr-2">
                  View Role <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
