import { Activity, Cpu, ShieldAlert, Network, BarChart3, ChevronRight } from 'lucide-react';
import { DepartmentId, DEPARTMENTS, CAREER_ROLES } from '@/services/careersData';

interface Props {
  department: typeof DEPARTMENTS[number];
  onSelect: (dept: DepartmentId) => void;
}

const DEPT_ICON_MAP: Record<DepartmentId, typeof Activity> = {
  ai: Activity,
  drone: Cpu,
  cyber: ShieldAlert,
  cloud: Network,
  analytics: BarChart3,
};

export function DepartmentCard({ department, onSelect }: Props) {
  const Icon = DEPT_ICON_MAP[department.id];
  const roleCount = CAREER_ROLES.filter((r) => r.department === department.id).length;

  return (
    <div
      onClick={() => onSelect(department.id)}
      className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden hover:border-nvidia-500/30 hover:shadow-lg hover:shadow-nvidia-500/5 dark:hover:border-nvidia-500/20 transition-all duration-300 cursor-pointer"
    >
      {/* Department Image */}
      {department.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Role count badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-nvidia-500/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-black">
              {roleCount} open roles
            </span>
          </div>
          {/* Department name on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold text-white drop-shadow-lg">
                {department.name}
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed line-clamp-2 mb-3">
          {department.description}
        </p>
        <div className="flex items-center gap-1 text-xs font-semibold text-nvidia-500 group-hover:gap-2 transition-all">
          Explore roles <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
