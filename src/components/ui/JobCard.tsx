import { MapPin, Clock, Banknote, ChevronRight, BrainCircuit, Cpu, ShieldAlert, Network, BarChart3 } from 'lucide-react';
import { CareerRole, DepartmentId } from '@/services/careersData';

interface Props {
  role: CareerRole;
  onSelect: (role: CareerRole) => void;
}

const DEPT_ICONS: Record<DepartmentId, typeof BrainCircuit> = {
  ai: BrainCircuit,
  drone: Cpu,
  cyber: ShieldAlert,
  cloud: Network,
  analytics: BarChart3,
};

const DEPT_COLORS: Record<DepartmentId, string> = {
  ai: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  drone: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20',
  cyber: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
  cloud: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
  analytics: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20',
};

export function JobCard({ role, onSelect }: Props) {
  const Icon = DEPT_ICONS[role.department];
  const colorClass = DEPT_COLORS[role.department];

  return (
    <div
      onClick={() => onSelect(role)}
      className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden hover:border-nvidia-500/30 hover:shadow-lg hover:shadow-nvidia-500/5 dark:hover:border-nvidia-500/20 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Role Image */}
      {role.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={role.image}
            alt={role.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Department Badge on image */}
          <div className="absolute top-3 left-3">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${colorClass}`}>
              <Icon className="w-3.5 h-3.5" />
              {role.departmentName}
            </div>
          </div>
          {/* Salary on image */}
          {role.salary && (
            <div className="absolute bottom-3 right-3">
              <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-bold text-white">
                {role.salary}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-nvidia-500 transition-colors mb-2">
          {role.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed mb-4 line-clamp-2 flex-1">
          {role.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500 dark:text-white/40">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {role.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {role.type}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {role.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-[10px] font-medium rounded-md border border-gray-200 dark:border-white/5">
              {skill}
            </span>
          ))}
          {role.skills.length > 3 && (
            <span className="px-2 py-0.5 text-gray-400 dark:text-white/30 text-[10px]">
              +{role.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Apply Button */}
        <button className="w-full h-10 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-semibold text-gray-700 dark:text-white/70 group-hover:bg-nvidia-500 group-hover:border-nvidia-500 group-hover:text-black dark:group-hover:text-black transition-all duration-300">
          View Role <ChevronRight className="w-4 h-4 ml-1 inline" />
        </button>
      </div>
    </div>
  );
}
